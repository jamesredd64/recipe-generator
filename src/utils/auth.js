import { auth } from '../firebaseConfig.jsx';
import { signInWithCustomToken, signOut } from 'firebase/auth';

let tokenRefreshTimeout;

export const setupTokenRefresh = async (isAdmin = false) => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }

  try {
    const idToken = await auth.currentUser?.getIdToken(true); // Force refresh
    if (!idToken) {
      throw new Error('No ID token available');
    }

    const apiUrl = '/.netlify/functions/api/createCustomToken';
    console.log('Requesting custom token from:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ isAdmin }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data.token) {
      throw new Error('No token received from server');
    }

    await signInWithCustomToken(auth, data.token);
    console.log('Successfully signed in with custom token');

    // Set up refresh timeout
    tokenRefreshTimeout = setTimeout(() => {
      setupTokenRefresh(isAdmin).catch(console.error);
    }, 9 * 60 * 1000); // Refresh slightly before expiration
  } catch (error) {
    console.error('Error refreshing token:', error);

    // Don't sign out for network errors
    if (error.message.includes('Failed to fetch')) {
      console.log('Network error - will retry on next attempt');
      return;
    }

    // For other errors, sign out the user
    await signOut(auth);
    throw error; // Re-throw to be handled by the caller
  }
};

export const clearTokenRefresh = () => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
    tokenRefreshTimeout = null;
  }
};
