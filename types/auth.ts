export interface User {
  id?: number;
  full_name?: string;
  email?: string;
  profile_picture?: string | null;
  profilePicture?: string | null;
  avatar?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  user?: User;

  data?: {
    token?: string;
    access_token?: string;
    user?: User;
  };

  message?: string;

  [key: string]: unknown;
}



