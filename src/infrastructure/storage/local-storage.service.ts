export class LocalStorageService {
  private static isClient = typeof window !== "undefined";

  static setItem(key: string, value: string): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
      console.log(`✅ LocalStorage.setItem('${key}')`);
    } catch (error) {
      console.error(`❌ Error setting localStorage item '${key}':`, error);
    }
  }

  static getItem(key: string): string | null {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`❌ Error getting localStorage item '${key}':`, error);
      return null;
    }
  }

  static removeItem(key: string): void {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
      console.log(`🗑️ LocalStorage.removeItem('${key}')`);
    } catch (error) {
      console.error(`❌ Error removing localStorage item '${key}':`, error);
    }
  }

  static clear(): void {
    if (!this.isClient) return;
    try {
      localStorage.clear();
      console.log("🧹 LocalStorage cleared");
    } catch (error) {
      console.error("❌ Error clearing localStorage:", error);
    }
  }

  static setAuthTokens(accessToken: string, userId: string): void {
    if (!this.isClient) return;

    console.log("🔐 Setting auth tokens");

    // Store in localStorage
    this.setItem("access_token", accessToken);
    this.setItem("user_id", userId);

    // ALSO store in cookies for middleware
    // IMPORTANT: Match Supabase token expiry (typically 1 hour)
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour expiry to match Supabase

    // Store token expiry time for validation
    this.setItem("token_expires_at", expires.toISOString());

    document.cookie = `access_token=${accessToken}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    document.cookie = `user_id=${userId}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

    console.log("✅ Tokens stored in cookies (expires in 1 hour)");
  }

  static clearAuthTokens(): void {
    if (!this.isClient) return;

    console.log("🧹 Clearing auth tokens");

    // Clear localStorage
    this.removeItem("access_token");
    this.removeItem("user_id");
    this.removeItem("token_expires_at");

    // Clear cookies
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    console.log("✅ Cookies cleared");
  }

  static getAuthTokens(): {
    accessToken: string | null;
    userId: string | null;
    isExpired: boolean;
  } {
    if (!this.isClient) {
      return { accessToken: null, userId: null, isExpired: true };
    }

    const accessToken = this.getItem("access_token");
    const userId = this.getItem("user_id");
    const expiresAt = this.getItem("token_expires_at");

    // Check if token is expired
    let isExpired = true;
    if (expiresAt) {
      const expiryDate = new Date(expiresAt);
      isExpired = expiryDate.getTime() < Date.now();

      if (isExpired) {
        console.warn("⚠️ Token has expired");
      }
    }

    return {
      accessToken,
      userId,
      isExpired,
    };
  }

  static isAuthenticated(): boolean {
    const { accessToken, isExpired } = this.getAuthTokens();
    return !!accessToken && !isExpired;
  }
}
