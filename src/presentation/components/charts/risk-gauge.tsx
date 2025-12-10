'use client';

import { getRiskLevel, getRiskColor } from '@/domain/entities/prediction.entity';
import { formatRiskScore } from '@/shared/utils/format';

interface RiskGaugeProps {
  score: number;
}

export function RiskGauge({ score }: RiskGaugeProps) {
  const level = getRiskLevel(score);
  const color = getRiskColor(score);
  const percentage = score * 100;

  const levelLabels = {
    low: 'Low Risk',
    moderate: 'Moderate Risk',
    high: 'High Risk',
    severe: 'Severe Risk',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="#e5e7eb"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke={color}
            strokeWidth="16"
            fill="none"
            strokeDasharray={`${percentage * 5.03} 503`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {formatRiskScore(score)}
          </span>
          <span className="text-sm text-zinc-600 mt-1">{levelLabels[level]}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-zinc-600">Low (0-30%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-zinc-600">Moderate (30-60%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-sm text-zinc-600">High (60-85%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-zinc-600">Severe (85-100%)</span>
        </div>
      </div>
    </div>
  );
}