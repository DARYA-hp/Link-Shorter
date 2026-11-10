
import type {
  ShortenUrlPayload,
  ShortenUrlResponse,
} from "@/types/url";

const API_URL = "http://seffeh.ir/api";

export class ApiRequestError extends Error {
  status: number;
  responseBody: unknown;

  constructor(message: string, status: number, responseBody: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(data: unknown, status: number): string {
  if (typeof data === "object" && data !== null) {
    const body = data as Record<string, unknown>;

    for (const key of ["message", "error", "detail"]) {
      if (typeof body[key] === "string" && body[key]) {
        return body[key] as string;
      }
    }
  }

  return `درخواست ناموفق بود. وضعیت HTTP: ${status}`;
}

async function urlRequest<T>(
  method: "GET" | "POST",
  token: string,
  payload?: ShortenUrlPayload
): Promise<T> {
  const path = "/api/shorten";

  if (!token) {
    throw new Error("توکن ورود پیدا نشد. لطفاً دوباره وارد حساب شوید.");
  }

  console.info("[Kurdlink API] Request", {
    method,
    path,
    authenticated: true,
  });

  let response: Response;

  try {
    response = await fetch(`${API_URL}/shorten`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...(method === "POST"
          ? { "Content-Type": "application/json" }
          : {}),
      },
      ...(method === "POST" && payload
        ? { body: JSON.stringify(payload) }
        : {}),
    });
  } catch (error) {
    console.error("[Kurdlink API] Network error", {
      method,
      path,
      error: error instanceof Error ? error.message : String(error),
    });

    throw new Error(
      "ارتباط با سرور برقرار نشد. آدرس سرور و اتصال اینترنت را بررسی کنید."
    );
  }

  const data = await readResponse(response);

  console.info("[Kurdlink API] Response", {
    method,
    path,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    body: data,
  });

  if (!response.ok) {
    console.error("[Kurdlink API] Request failed", {
      method,
      path,
      status: response.status,
    });

    throw new ApiRequestError(
      getErrorMessage(data, response.status),
      response.status,
      data
    );
  }

  console.info("[Kurdlink API] Request succeeded", {
    method,
    path,
    status: response.status,
  });

  return data as T;
}

export function shortenUrl(
  payload: ShortenUrlPayload,
  token: string
): Promise<ShortenUrlResponse> {
  return urlRequest<ShortenUrlResponse>("POST", token, payload);
}

export function getUserUrls(token: string): Promise<unknown> {
  return urlRequest<unknown>("GET", token);
}