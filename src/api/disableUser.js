import admin from 'firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    await admin.auth().updateUser(uid, {
      disabled: true
    });

    res.status(200).json({ message: 'User disabled successfully' });
  } catch (error) {
    console.error('Error disabling user:', error);
    res.status(500).json({ error: error.message });
  }
}