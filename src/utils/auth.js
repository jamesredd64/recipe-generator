import { auth } from '../firebaseConfig.jsx';
import { signInWithCustomToken, signOut } from 'firebase/auth';
import { API_BASE } from './api';

let tokenRefreshTimeout;

export const setupTokenRefresh = async (isAdmin = false) => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }

  try {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (!idToken) {
      throw new Error('No ID token available');
    }

    const response = await fetch(`${API_BASE}/createCustomToken`, {
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

    tokenRefreshTimeout = setTimeout(() => {
      setupTokenRefresh(isAdmin).catch(console.error);
    }, 9 * 60 * 1000);
  } catch (error) {
    console.error('Error refreshing token:', error);

    if (error.message.includes('Failed to fetch')) {
      console.log('Network error - will retry on next attempt');
      return;
    }

    await signOut(auth);
    throw error;
  }
};

export const clearTokenRefresh = () => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
    tokenRefreshTimeout = null;
  }
};
