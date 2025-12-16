"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocalStorageService } from "@/infrastructure/storage/local-storage.service";
import { toast } from "sonner";

export const useTokenRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    // Check token expiry every minute
    const checkTokenExpiry = () => {
      const { accessToken, isExpired } = LocalStorageService.getAuthTokens();

      if (accessToken && isExpired) {
        console.warn("⚠️ Token expired, logging out");

        // Clear expired tokens
        LocalStorageService.clearAuthTokens();

        // Show toast
        toast.error("Session Expired", {
          description: "Please log in again.",
        });

        // Redirect to login
        router.push("/login");
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);
};
