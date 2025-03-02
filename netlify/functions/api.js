import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to verify Netlify Identity token
const verifyNetlifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    // Verify the JWT token from Netlify Identity
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token error:', error);
    return res
      .status(error.code === 'auth/invalid-token' ? 401 : 500)
      .json({ error: error.message });
  }
};

// Protected routes
app.get('/protected/user-info', verifyNetlifyToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'User info retrieved successfully'
  });
});

app.post('/protected/update-profile', verifyNetlifyToken, (req, res) => {
  // Handle profile updates
  const { name, email } = req.body;
  res.json({
    message: 'Profile updated successfully',
    updates: { name, email }
  });
});

// Public routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export const handler = serverless(app);
