import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = resolve(__dirname, './service-key.json');

// Import the service account JSON file
const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function exportUsers() {
  let users = [];
  let nextPageToken;

  try {
    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      users = users.concat(listUsersResult.users);
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    // Convert UserRecord objects to plain objects before stringifying
    const plainUsers = users.map((user) => user.toJSON());

    writeFileSync("users.json", JSON.stringify(plainUsers, null, 2));
    console.log("Users exported to users.json");
  } catch (error) {
    console.error("Error exporting users:", error);
    process.exit(1);
  }
}

exportUsers();
