import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = resolve(__dirname, './service-key.json');

const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function getUserByEmail(email) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log('User data:', JSON.stringify(userRecord.toJSON(), null, 2));
    return userRecord.toJSON();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Example usage:
// getUserByEmail("user@example.com");

export { getUserByEmail };