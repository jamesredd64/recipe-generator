// Simplified API configuration - no need to worry about ports
export const API_BASE = '/.netlify/functions/api';

export const callApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Example usage:
export const checkHealth = () => callApi('/health');

// https://your-site-name.netlify.app/.netlify/functions/api/health
