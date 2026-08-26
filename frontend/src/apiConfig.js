/**
 * Global API Configuration for AMP Ventures
 * Uses VITE_API_URL from environment when deployed to cloud (e.g., Render/Railway/Vercel)
 * Falls back to relative '' which resolves through Vite's local dev proxy or same-origin routing.
 */
const rawBase = import.meta.env.VITE_API_URL || '';
export const API_BASE_URL = rawBase.replace(/\/+$/, '');

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl,
};
