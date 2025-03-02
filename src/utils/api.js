export const API_BASE = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9999/.netlify/functions/api'
  : '/.netlify/functions/api';

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
