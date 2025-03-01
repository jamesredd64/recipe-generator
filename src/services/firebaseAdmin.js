import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin if it hasn't been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    // Your admin config here
    // You should load this from environment variables
    credential: admin.credential.applicationDefault(),
  });
}

export const adminAuth = getAuth();

export async function getUserByEmail(email) {
  try {
    const userRecord = await adminAuth.getUserByEmail(email);
    return userRecord.toJSON();
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function disableUser(uid) {
  try {
    await adminAuth.updateUser(uid, {
      disabled: true
    });
    return true;
  } catch (error) {
    throw new Error(`Error disabling user: ${error.message}`);
  }
}