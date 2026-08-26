/**
 * Global API & Agency Configuration for AMP Ventures
 * Uses VITE_API_URL and VITE_WHATSAPP_NUMBER from environment
 */
const rawBase = import.meta.env.VITE_API_URL || '';
export const API_BASE_URL = rawBase.replace(/\/+$/, '');

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

const rawWa = import.meta.env.VITE_WHATSAPP_NUMBER || '917000384330';
export const WHATSAPP_NUMBER = rawWa.replace(/\D/g, '');

export const formatWhatsAppDisplay = (num) => {
  const digits = (num || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return digits ? `+${digits}` : '+91 70003 84330';
};

export const WHATSAPP_DISPLAY = formatWhatsAppDisplay(WHATSAPP_NUMBER);

export const getWhatsAppUrl = (text = '') => {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!text) return `https://wa.me/${cleanNumber}`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};

export default {
  API_BASE_URL,
  getApiUrl,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
};
