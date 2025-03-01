const admin = require("firebase-admin");
const fs = require("node:fs");

// Reference the entire service account JSON file
// const serviceAccount = require("../service-key.json"); // Path to your service key file
const serviceAccount = require("./service-key.json"); // Path to your service key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function exportUsers() {
  let users = [];
  let nextPageToken;

  do {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    users = users.concat(listUsersResult.users);
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);

  // Convert UserRecord objects to plain objects before stringifying
  const plainUsers = users.map((user) => user.toJSON());

  fs.writeFileSync("users.json", JSON.stringify(plainUsers, null, 2));
  console.log("Users exported to users.json");
}

exportUsers().catch((error) => {
  console.error("Error exporting users:", error);
});
