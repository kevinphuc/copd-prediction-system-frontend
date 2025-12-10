"use client";

import { useHealthHistory } from "@/app/hooks/use-health-history";
import { Card, CardContent } from "../ui/card";
import { formatDate, formatRiskScore } from "@/shared/utils/format";
import { getRiskColor } from "@/domain/entities/prediction.entity";
import Link from "next/link";
import Image from "next/image";

export function HealthHistoryList() {
  const { data: history, isLoading, error } = useHealthHistory();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-20 bg-zinc-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-600">
          Error loading history. Please try again.
        </CardContent>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-zinc-600">
          No assessments yet. Upload your first audio file!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Link key={item.input_id} href={`/dashboard/details/${item.input_id}`}>
          <Card className="hover:border-primary-300 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-600">
                  {formatDate(item.created_at)}
                </span>
                {item.prediction_result && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: getRiskColor(
                        item.prediction_result.risk_score,
                      ),
                    }}
                  >
                    {formatRiskScore(item.prediction_result.risk_score)}
                  </span>
                )}
              </div>
              {/*{item.spectrogram && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  <Image
                    src={item.spectrogram.spectrogram_url}
                    alt="Spectrogram"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}*/}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
