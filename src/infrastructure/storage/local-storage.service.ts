export class LocalStorageService {
  private static isClient = typeof window !== 'undefined';

  static setItem(key: string, value: string): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }

  static getItem(key: string): string | null {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }

  static clear(): void {
    if (!this.isClient) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  static setAuthTokens(accessToken: string, userId: string): void {
    // localStorage
    this.setItem('access_token', accessToken);
    this.setItem('user_id', userId);
    
    // cookies (for proxy)
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `access_token=${accessToken}; path=/; expires=${expires.toUTCString()}`;
  }

  static getAuthTokens(): { accessToken: string | null; userId: string | null } {
    return {
      accessToken: this.getItem('access_token'),
      userId: this.getItem('user_id'),
    };
  }

  static clearAuthTokens(): void {
    this.removeItem('access_token');
    this.removeItem('user_id');
  }
}