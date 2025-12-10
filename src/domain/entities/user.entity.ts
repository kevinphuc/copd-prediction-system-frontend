export interface UserEntity {
  id: string;
  email: string;
  username: string;
  phone_number?: string;
  inserted_at: Date;
  updated_at: Date;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  user_id: string;
}