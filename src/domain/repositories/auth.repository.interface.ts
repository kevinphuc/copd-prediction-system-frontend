import { RegisterInput, LoginInput } from '@/shared/schemas/auth.schema';
import { AuthTokens } from '@/domain/entities/user.entity';

export interface IAuthRepository {
  register(data: RegisterInput): Promise<{ message: string }>;
  login(data: LoginInput): Promise<AuthTokens>;
  logout(): Promise<void>;
}