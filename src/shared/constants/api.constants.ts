export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    TOKEN: '/auth/token',
  },
  HEALTH: {
    UPLOAD: '/health/upload',
    HISTORY: '/health/history',
    DETAILS: (inputId: string) => `/health/details/${inputId}`,
  },
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kevinphuc-copd-prediction-system-backend-hf.hf.space/api/v1';