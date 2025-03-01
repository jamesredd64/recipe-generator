import { getUserByEmail } from '../admin/getUserByEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const userData = await getUserByEmail(email);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}