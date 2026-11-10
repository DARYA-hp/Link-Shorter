import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserUrls, shortenUrl} from "@/services/urlApi";

import type { ShortenUrlPayload,  ShortenUrlResponse} from "@/types/url";

interface UrlState {
  loading: boolean;
  loadingList: boolean;
  error: string | null;
  result: ShortenUrlResponse | null;
  userUrls: unknown;
}

const initialState: UrlState = {
  loading: false,
  loadingList: false,
  error: null,
  result: null,
  userUrls: [],
}

export const shorten = createAsyncThunk<
  ShortenUrlResponse,
  { payload: ShortenUrlPayload; token: string },
  { rejectValue: string }
>(
  "url/shorten",
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      return await shortenUrl(payload, token);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "کوتاه کردن لینک انجام نشد."
      );
    }
  }
)

export const fetchUserUrls = createAsyncThunk<
  unknown,
  { token: string },
  { rejectValue: string }
>(
  "url/fetchUserUrls",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await getUserUrls(token);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "دریافت لینک‌های کاربر انجام نشد."
      );
    }
  }
)

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    clearUrlResult: (state) => {
      state.result = null;
      state.error = null;
    },
    clearUrlError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shorten.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(shorten.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(shorten.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "ساخت لینک ناموفق بود.";
      })
      .addCase(fetchUserUrls.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action) => {
        state.loadingList = false;
        state.userUrls = action.payload;
      })
      .addCase(fetchUserUrls.rejected, (state, action) => {
        state.loadingList = false;
        state.error =
          action.payload ??
          action.error.message ??
          "دریافت لینک‌های کاربر انجام نشد.";
      });
  },
})

export const { clearUrlResult, clearUrlError } = urlSlice.actions;

export default urlSlice.reducer;

