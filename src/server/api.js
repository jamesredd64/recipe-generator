import express from 'express';
import { getUserByEmail, disableUser } from '../services/firebaseAdmin.js';

const router = express.Router();

router.post('/getUserByEmail', async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await getUserByEmail(email);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/disableUser', async (req, res) => {
  try {
    const { uid } = req.body;
    await disableUser(uid);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
