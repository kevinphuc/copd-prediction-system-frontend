import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/shared/constants/api.constants";
import { LocalStorageService } from "../storage/local-storage.service";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const { accessToken, isExpired } = LocalStorageService.getAuthTokens();

        // Check if token is expired before making request
        if (accessToken && isExpired) {
          console.warn("⚠️ Token expired, clearing auth");
          LocalStorageService.clearAuthTokens();

          // Redirect to login if not already there
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/login")
          ) {
            window.location.href = "/login";
          }

          return Promise.reject(new Error("Token expired"));
        }

        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.error("❌ 401 Unauthorized - clearing tokens");
          LocalStorageService.clearAuthTokens();

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public setToken(token: string): void {
    // Token is already set via LocalStorageService.setAuthTokens
    console.log("✅ Token set in API client");
  }

  public get instance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
