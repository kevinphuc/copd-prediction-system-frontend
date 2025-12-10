import { format } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'PPP');
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'PPP p');
};

export const formatRiskScore = (score: number): string => {
  return `${(score * 100).toFixed(1)}%`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};