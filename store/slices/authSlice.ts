import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "@/services/authApi";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  loadingLogout: boolean;
  error: string | null;
  isInitialized: boolean;
}

type LoginArgs = LoginPayload & {
  rememberMe?: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  loadingLogout: false,
  error: null,
  isInitialized: false,
};

const TOKEN_KEYS = [
  "token",
  "access_token",
  "accessToken",
  "access",
  "auth_token",
  "authToken",
  "jwt",
  "jwt_token",
  "jwtToken",
  "bearer_token",
  "bearerToken",
  "plainTextToken",
  "api_token",
];

function findToken(value: unknown, depth = 0): string | null {
  if (depth > 10 || value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    const candidate = value.trim();

    if (!candidate) {
      return null;
    }

    if (/^Bearer\s+\S+$/i.test(candidate)) {
      return candidate.replace(/^Bearer\s+/i, "").trim();
    }

    return candidate;
  }

  if (typeof value !== "object") {
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findToken(item, depth + 1);

      if (found) {
        return found;
      }
    }

    return null;
  }

  const record = value as Record<string, unknown>;

  for (const key of TOKEN_KEYS) {
    const candidate = record[key];

    if (typeof candidate === "string" && candidate.trim()) {
      return findToken(candidate, depth + 1);
    }
  }

  for (const [key, child] of Object.entries(record)) {
    if (typeof child === "object" && child !== null) {
      const found = findToken(child, depth + 1);

      if (found) {
        return found;
      }
    }

    if (key === "auth" && typeof child === "string" && child.trim()) {
      return findToken(child, depth + 1);
    }
  }

  return null;
}

export function getToken(response: AuthResponse): string | null {
  const token = findToken(response);

  return token || null;
}

export function getUser(response: AuthResponse): User | null {
  const body = response as AuthResponse & {
    data?: {
      user?: User;
      auth?: unknown;
    };
  };

  return body.user ?? body.data?.user ?? null;
}

export function getUserName(user: User | null): string | null {
  if (!user) {
    return null;
  }

  const possibleNames = [
    "full_name",
    "fullName",
    "name",
    "username",
    "first_name",
    "firstName",
  ];

  const userRecord = user as Record<string, unknown>;

  for (const key of possibleNames) {
    const value = userRecord[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function getNameStorageKey(email: string): string {
  return `kurdlink_name_${email.trim().toLowerCase()}`;
}

function persistCredentials(
  token: string,
  user: User | null,
  rememberMe: boolean
): void {
  if (typeof window === "undefined") {
    return;
  }

  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;

  otherStorage.removeItem("kurdlink_token");
  otherStorage.removeItem("kurdlink_user");

  storage.setItem("kurdlink_token", token);

  if (user) {
    storage.setItem("kurdlink_user", JSON.stringify(user));
  } else {
    storage.removeItem("kurdlink_user");
  }
}

function clearStoredCredentials(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("kurdlink_token");
  localStorage.removeItem("kurdlink_user");

  sessionStorage.removeItem("kurdlink_token");
  sessionStorage.removeItem("kurdlink_user");
}

export const login = createAsyncThunk<
  AuthResponse,
  LoginArgs,
  { rejectValue: string }
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { rememberMe: _rememberMe, ...credentials } = payload;

      const response = await loginUser(credentials as LoginPayload);
      const token = getToken(response);

      if (!token) {
        const body = response as AuthResponse & {
          data?: {
            auth?: unknown;
          };
        };

        const auth = body.data?.auth;

        console.error("[Kurdlink Auth] Token not found.", {
          topLevelKeys: Object.keys(response),
          dataKeys:
            body.data && typeof body.data === "object"
              ? Object.keys(body.data)
              : [],
          authType: typeof auth,
          authKeys:
            auth && typeof auth === "object"
              ? Object.keys(auth)
              : [],
        });

        return rejectWithValue(
          "ورود انجام شد اما توکن از پاسخ سرور استخراج نشد. ساختار بخش auth باید بررسی شود."
        );
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "ورود انجام نشد."
      );
    }
  }
);

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await registerUser(payload);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "ثبت‌نام انجام نشد."
      );
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  {
    state: { auth: AuthState };
    rejectValue: string;
  }
>(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "خروج از حساب انجام نشد."
      );
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async () => {
    if (typeof window === "undefined") {
      return {
        token: null,
        user: null,
      };
    }

    const token =
      localStorage.getItem("kurdlink_token") ||
      sessionStorage.getItem("kurdlink_token");

    const storedUser =
      localStorage.getItem("kurdlink_user") ||
      sessionStorage.getItem("kurdlink_user");

    let user: User | null = null;

    if (storedUser) {
      try {
        user = JSON.parse(storedUser) as User;
      } catch {
        user = null;
      }
    }

    return {
      token,
      user,
    };
  }
);

interface SetCredentialsPayload {
  token: string;
  user: User | null;
  rememberMe?: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<SetCredentialsPayload>
    ) => {
      const {
        token,
        user,
        rememberMe = false,
      } = action.payload;

      state.token = token;
      state.user = user;
      state.error = null;
      state.isInitialized = true;

      persistCredentials(token, user, rememberMe);
    },

    clearError: (state) => {
      state.error = null;
    },

    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.loading = false;
      state.loadingLogout = false;
      state.isInitialized = true;

      clearStoredCredentials();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        const token = getToken(action.payload);
        const user = getUser(action.payload);

        if (!token) {
          state.token = null;
          state.error =
            "ورود انجام شد اما توکن در پاسخ سرور پیدا نشد.";
          return;
        }

        state.token = token;
        state.user = user;
        state.error = null;

        const rememberMe = Boolean(action.meta.arg.rememberMe);

        persistCredentials(token, user, rememberMe);

        if (typeof window !== "undefined") {
          const email = action.meta.arg.email;
          const name = getUserName(user);

          if (name) {
            const storage = rememberMe
              ? localStorage
              : sessionStorage;

            storage.setItem(getNameStorageKey(email), name);
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "ورود انجام نشد.";
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "ثبت‌نام انجام نشد.";
      })

      .addCase(logout.pending, (state) => {
        state.loadingLogout = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loadingLogout = false;
        state.token = null;
        state.user = null;
        state.error = null;

        clearStoredCredentials();
      })
      .addCase(logout.rejected, (state, action) => {
        state.loadingLogout = false;
        state.error =
          action.payload ??
          action.error.message ??
          "خروج از حساب انجام نشد.";
      })

      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isInitialized = true;
      });
  },
});

export const {
  setCredentials,
  clearError,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;