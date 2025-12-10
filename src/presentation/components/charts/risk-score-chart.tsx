'use client';

import { PredictionResultEntity } from '@/domain/entities/prediction.entity';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatDate } from '@/shared/utils/format';

interface RiskScoreChartProps {
  data: Array<{
    date: Date;
    risk_score: number;
  }>;
}

export function RiskScoreChart({ data }: RiskScoreChartProps) {
  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    score: (item.risk_score * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#71717a' }}
          tickLine={{ stroke: '#d4d4d8' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#71717a' }}
          tickLine={{ stroke: '#d4d4d8' }}
          label={{ value: 'Risk Score (%)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`${value}%`, 'Risk Score']}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#22c55e"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorScore)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}