import bcrypt from 'bcryptjs';
import prisma from '../common/prisma/init.prisma.js';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const refreshSecretKey = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const accessTokenExpiry = '15m';
const refreshTokenExpiry = '7d';

export async function registerUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email };
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: accessTokenExpiry });
  const refreshToken = jwt.sign({ userId: user.id, email: user.email }, refreshSecretKey, { expiresIn: refreshTokenExpiry });

  // Optionally, save refreshToken in database or cache for invalidation

  return { accessToken, refreshToken };
}

export async function refreshTokenUser({ refreshToken }) {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const newAccessToken = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: accessTokenExpiry });
    const newRefreshToken = jwt.sign({ userId: user.id, email: user.email }, refreshSecretKey, { expiresIn: refreshTokenExpiry });

    // Optionally, update refreshToken in database or cache

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}
