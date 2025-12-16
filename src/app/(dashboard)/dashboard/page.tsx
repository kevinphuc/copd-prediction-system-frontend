"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHealthHistory } from "@/app/hooks/use-health-history";
import { useLogout } from "@/app/hooks/use-auth";
import { useTokenRefresh } from "@/app/hooks/use-token-refresh";
import { LocalStorageService } from "@/infrastructure/storage/local-storage.service";
import { HealthUploadForm } from "@/presentation/components/forms/health-upload-form";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { formatDate, formatRiskScore } from "@/shared/utils/format";
import { getRiskColor } from "@/domain/entities/prediction.entity";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const { data: history, isLoading } = useHealthHistory();
  const logoutMutation = useLogout();

  // Check token expiry automatically
  useTokenRefresh();

  // Additional check on mount
  useEffect(() => {
    const { accessToken, isExpired } = LocalStorageService.getAuthTokens();

    if (!accessToken || isExpired) {
      console.warn("⚠️ No valid token on dashboard load");
      LocalStorageService.clearAuthTokens();
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-zinc-900">Dashboard</span>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            Log Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Form */}
          <div className="lg:col-span-1">
            <HealthUploadForm />
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardDescription>
                  View your past respiratory health assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-zinc-600">Loading...</p>
                ) : history && history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div
                        key={item.input_id}
                        className="border border-zinc-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
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
                              {formatRiskScore(
                                item.prediction_result.risk_score,
                              )}{" "}
                              Risk
                            </span>
                          )}
                        </div>
                        {item.spectrogram && (
                          <Image
                            src={item.spectrogram.spectrogram_url}
                            alt="Spectrogram"
                            className="w-full h-32 object-cover rounded mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-600">
                    No assessments yet. Upload your first audio file!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
