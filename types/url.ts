export interface ShortenUrlPayload {
  url: string;
  prefix?: string;
  password?: string;
  expired_at?: string;
}

export interface ShortenUrlResponse {
  message?: string;

  data?: unknown;

  [key: string]: unknown;
}