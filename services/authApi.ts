
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth"; 

const API_URL = "http://seffeh.ir/api";

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(data: unknown): string {
  if (typeof data === "object" && data !== null) {
    const body = data as Record<string, unknown>;

    for (const key of ["message", "error", "detail"]) {
      if (typeof body[key] === "string" && body[key]) {
        return body[key] as string;
      }
    }
  }

  return "عملیات با خطا مواجه شد.";
}

async function authRequest<T>(
  endpoint: string,
  payload: unknown
): Promise<T> {
  const method = "POST";
  const path = `/api${endpoint}`;

  console.info("[Kurdlink API] Request", { method, path });

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[Kurdlink API] Network error", {
      method,
      path,
      error: error instanceof Error ? error.message : String(error),
    });

    throw new Error(
      "ارتباط با سرور برقرار نشد. اتصال اینترنت و آدرس سرور را بررسی کنید."
    );
  }

  const data = await readResponse(response);

  if (endpoint === "/auth/login") {
    const body =
      data && typeof data === "object"
        ? (data as Record<string, unknown>)
        : null;

    const nestedData =
      body?.data && typeof body.data === "object"
        ? (body.data as Record<string, unknown>)
        : null;

    console.info("[Kurdlink Auth] Login response structure", {
      responseType: typeof data,
      responseKeys: body ? Object.keys(body) : [],
      dataKeys: nestedData ? Object.keys(nestedData) : [],
      authorizationHeaderExists: response.headers.has("authorization"),
      contentType: response.headers.get("content-type"),
    });
  }

  console.info("[Kurdlink API] Response", {
    method,
    path,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  });

  if (!response.ok) {
    console.error("[Kurdlink API] Request failed", {
      method,
      path,
      status: response.status,
    });

    throw new Error(getErrorMessage(data));
  }

  console.info("[Kurdlink API] Request succeeded", {
    method,
    path,
    status: response.status,
  });

  return data as T;
}

export function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/login", payload);
}

export function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/register", payload);
}

export async function logoutUser(token: string): Promise<void> {
  const method = "POST";
  const path = "/api/auth/logout";

  console.info("[Kurdlink API] Request", { method, path });

  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/logout`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[Kurdlink API] Network error", {
      method,
      path,
      error: error instanceof Error ? error.message : String(error),
    });

    throw new Error("ارتباط با سرور برقرار نشد.");
  }

  const data = await readResponse(response);

  console.info("[Kurdlink API] Response", {
    method,
    path,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  });

  if (!response.ok) {
    console.error("[Kurdlink API] Request failed", {
      method,
      path,
      status: response.status,
    });

    throw new Error(getErrorMessage(data) || "خروج از حساب انجام نشد.");
  }
}
