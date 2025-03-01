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

async function listUsersWithPagination(limit = 100, pageToken = undefined) {
  try {
    const listUsersResult = await auth.listUsers(limit, pageToken);
    const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    
    return {
      users,
      nextPageToken: listUsersResult.pageToken
    };
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
}

// Example usage:
// const { users, nextPageToken } = await listUsersWithPagination(50);
// const nextPage = await listUsersWithPagination(50, nextPageToken);

export { listUsersWithPagination };