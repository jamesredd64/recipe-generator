import { auth, functions } from '../firebaseConfig.jsx'; // Import your Firebase configuration
import { httpsCallable } from 'firebase/functions';
import { signInWithCustomToken, signOut } from 'firebase/auth';

let tokenRefreshTimeout;

export const setupTokenRefresh = async (isAdmin = false) => {
  // Clear any existing timeout
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }

  try {
    const createCustomToken = httpsCallable(functions, 'createCustomToken');
    const result = await createCustomToken({ isAdmin });
    await signInWithCustomToken(auth, result.data.token);

    // Set timeout to sign out user after 10 minutes
    tokenRefreshTimeout = setTimeout(() => {
      signOut(auth);
    }, 10 * 60 * 1000); // 10 minutes
  } catch (error) {
    console.error('Error refreshing token:', error);
    await signOut(auth);
  }
};

export const clearTokenRefresh = () => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }
};
