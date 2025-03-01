/* eslint-disable */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.createCustomToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    logger.warn("Unauthenticated user attempted to create custom token");
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
  }

  try {
    const uid = context.auth.uid;
    logger.info("Creating custom token", { uid: uid, isAdmin: data.isAdmin || false, email: context.auth.token.email });

    const additionalClaims = {
      expiresIn: Date.now() + 10 * 60 * 1000,
      isAdmin: data.isAdmin || false,
      email: context.auth.token.email || "",
      createdAt: Date.now(),
    };

    const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
    logger.info("Custom token created successfully", { uid });
    return { token: customToken };
  } catch (error) {
    logger.error("Error creating custom token", { uid: context.auth.uid, error: error.message });
    throw new functions.https.HttpsError("internal", error.message);
  }
});

const verifyToken = async (context) => {
  if (!context.auth) {
    logger.warn("Unauthenticated access attempt");
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
  }

  const tokenExpiration = context.auth.token.expiresIn;
  if (!tokenExpiration || Date.now() > tokenExpiration) {
    logger.warn("Expired token access attempt", { uid: context.auth.uid, tokenExpiration });
    throw new functions.https.HttpsError("permission-denied", "Token has expired");
  }
};

exports.getUserByEmail = functions.https.onCall(async (data, context) => {
  await verifyToken(context);

  if (!data.email) {
    logger.warn("getUserByEmail called without email", { uid: context.auth.uid });
    throw new functions.https.HttpsError("invalid-argument", "Email is required");
  }

  try {
    logger.info("Fetching user by email", { requestedEmail: data.email, requesterId: context.auth.uid });

    const userRecord = await admin.auth().getUserByEmail(data.email);
    logger.info("User fetched successfully", { requestedUid: userRecord.uid, requesterId: context.auth.uid });

    return {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      disabled: userRecord.disabled,
    };
  } catch (error) {
    logger.error("Error fetching user by email", {
      requestedEmail: data.email,
      requesterId: context.auth.uid,
      error: error.message,
    });
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.disableUser = functions.https.onCall(async (data, context) => {
  await verifyToken(context);

  if (!context.auth.token.isAdmin) {
    logger.warn("Non-admin attempted to disable user", { attemptingUid: context.auth.uid });
    throw new functions.https.HttpsError("permission-denied", "Admin access required");
  }

  if (!data.uid) {
    logger.warn("disableUser called without uid", { adminUid: context.auth.uid });
    throw new functions.https.HttpsError("invalid-argument", "User ID is required");
  }

  try {
    logger.info("Disabling user", { targetUid: data.uid, adminUid: context.auth.uid });

    await admin.auth().updateUser(data.uid, { disabled: true });
    logger.info("User disabled successfully", { targetUid: data.uid, adminUid: context.auth.uid });

    return { success: true, uid: data.uid };
  } catch (error) {
    logger.error("Error disabling user", { targetUid: data.uid, adminUid: context.auth.uid, error: error.message });
    throw new functions.https.HttpsError("internal", error.message);
  }
});
