export interface PredictionResultEntity {
  result_id: string;
  input_id: string;
  risk_score: number;
  created_at: Date;
}

export const getRiskLevel = (score: number): 'low' | 'moderate' | 'high' | 'severe' => {
  if (score < 0.3) return 'low';
  if (score < 0.6) return 'moderate';
  if (score < 0.85) return 'high';
  return 'severe';
};

export const getRiskColor = (score: number): string => {
  const level = getRiskLevel(score);
  const colors = {
    low: '#22c55e',
    moderate: '#f59e0b',
    high: '#f97316',
    severe: '#ef4444',
  };
  return colors[level];
};