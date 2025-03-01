const API_BASE = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/.netlify/functions/api'
  : '/.netlify/functions/api';

export const callApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Example usage:
export const checkHealth = () => callApi('/health');

// https://your-site-name.netlify.app/.netlify/functions/api/health
