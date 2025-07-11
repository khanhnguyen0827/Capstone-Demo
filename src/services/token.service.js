import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default {
  verifyAccessToken,
};
