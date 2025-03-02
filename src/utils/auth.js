import { API_BASE } from './api.js';

let tokenRefreshTimeout;

export const setupTokenRefresh = async (user) => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }

  // Set up token refresh 5 minutes before expiry
  if (user?.token?.expires_at) {
    const expiresAt = new Date(user.token.expires_at);
    const timeUntilExpiry = expiresAt - new Date();
    const refreshTime = timeUntilExpiry - (5 * 60 * 1000); // 5 minutes before expiry

    if (refreshTime > 0) {
      tokenRefreshTimeout = setTimeout(() => {
        user.refresh();
      }, refreshTime);
    }
  }
};

export const clearTokenRefresh = () => {
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }
};
