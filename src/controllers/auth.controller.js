import { registerUser, loginUser, refreshTokenUser } from '../services/auth.service.js';

export async function register(req, res) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function refreshToken(req, res) {
  try {
    const newToken = await refreshTokenUser(req.body);
    res.status(200).json({ message: 'Token refreshed successfully', token: newToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
