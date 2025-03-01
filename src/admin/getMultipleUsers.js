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

async function getUsersByUIDs(uids) {
  try {
    const userRecords = await auth.getUsers(uids.map(uid => ({ uid })));
    console.log('Users:', JSON.stringify(userRecords.users, null, 2));
    return userRecords.users.map(user => user.toJSON());
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Example usage:
// getUsersByUIDs(['uid1', 'uid2', 'uid3']);

export { getUsersByUIDs };