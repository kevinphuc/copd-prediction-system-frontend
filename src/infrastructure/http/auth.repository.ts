import { IAuthRepository } from '@/domain/repositories/auth.repository.interface';
import { RegisterInput, LoginInput } from '@/shared/schemas/auth.schema';
import { AuthTokens } from '@/domain/entities/user.entity';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import { apiClient } from './api-client';
import { LocalStorageService } from '../storage/local-storage.service';

export class AuthRepository implements IAuthRepository {
  async register(data: RegisterInput): Promise<{ message: string }> {
    const response = await apiClient.instance.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  }

  async login(data: LoginInput): Promise<AuthTokens> {
    // Create form data for application/x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', data.email); // OAuth2 standard uses 'username' field
    formData.append('password', data.password);

    const response = await apiClient.instance.post<AuthTokens>(
      API_ENDPOINTS.AUTH.LOGIN,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const tokens = response.data;
    
    // Store tokens
    apiClient.setToken(tokens.access_token);
    LocalStorageService.setAuthTokens(tokens.access_token, tokens.user_id);
    
    return tokens;
  }

  async logout(): Promise<void> {
    LocalStorageService.clearAuthTokens();
  }
}

export const authRepository = new AuthRepository();