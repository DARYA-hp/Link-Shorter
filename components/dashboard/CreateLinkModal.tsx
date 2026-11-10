
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initializeAuth,
  setCredentials,
} from "@/store/slices/authSlice";
import { shorten, clearUrlResult } from "@/store/slices/urlSlice";

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkCreated: (result: unknown) => boolean;
}

export default function CreateLinkModal({
  isOpen,
  onClose,
  onLinkCreated,
}: CreateLinkModalProps) {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.url.loading);
  const error = useAppSelector((state) => state.url.error);

  const [url, setUrl] = useState("");
  const [prefix, setPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  function getStoredToken(): {
    token: string | null;
    rememberMe: boolean;
  } {
    if (typeof window === "undefined") {
      return { token: null, rememberMe: false };
    }

    const localToken = localStorage.getItem("kurdlink_token");
    const sessionToken = sessionStorage.getItem("kurdlink_token");

    if (localToken) {
      return { token: localToken, rememberMe: true };
    }

    if (sessionToken) {
      return { token: sessionToken, rememberMe: false };
    }

    return { token: null, rememberMe: false };
  }

  function resetForm() {
    setUrl("");
    setPrefix("");
    setPassword("");
    setExpiresAt("");
    setFormError("");
  }

  async function handleShorten() {
    setFormError("");

    const inputUrl = url.trim();

    if (!inputUrl) {
      setFormError("لطفاً لینک موردنظر را وارد کنید.");
      return;
    }

    let activeToken = token;

    if (!activeToken) {
      const stored = getStoredToken();

      if (stored.token) {
        activeToken = stored.token;

        dispatch(
          setCredentials({
            token: stored.token,
            user,
            rememberMe: stored.rememberMe,
          })
        );
      }
    }

    if (!activeToken) {
      setFormError(
        "توکن ورود پیدا نشد. لطفاً خارج شوید و دوباره وارد حساب شوید."
      );
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(inputUrl);
    } catch {
      setFormError(
        "لطفاً یک آدرس معتبر وارد کنید؛ مثلاً https://example.com"
      );
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setFormError("آدرس باید با http:// یا https:// شروع شود.");
      return;
    }
    let expirationISO: string | undefined;
    if (expiresAt) {
      const expirationDate = new Date(expiresAt);

      if (Number.isNaN(expirationDate.getTime())) {
        setFormError("تاریخ انقضا معتبر نیست.");
        return;
      }

      if (expirationDate.getTime() <= Date.now()) {
        setFormError("تاریخ انقضا باید در آینده باشد.");
        return;
      }

      expirationISO = expirationDate.toISOString();
    }

    const payload: {
      url: string;
      prefix?: string;
      password?: string;
      expires_at?: string;
    } = {
      url: parsedUrl.href,
    };

    if (prefix.trim()) {
      payload.prefix = prefix.trim();
    }

    if (password.trim()) {
      payload.password = password;
    }

    if (expirationISO) {
      payload.expires_at = expirationISO;
    }

    try {
      const result = await dispatch(
        shorten({
          payload,
          token: activeToken,
        })
      ).unwrap();

      const added = onLinkCreated(result);

      if (!added) {
        setFormError(
          "پاسخ سرور دریافت شد، اما لینک کوتاه در آن پیدا نشد. ساختار پاسخ API را بررسی کنید."
        );
        return;
      }

      resetForm();
      dispatch(clearUrlResult());
      onClose();
    } catch (err: unknown) {
      console.error("[Kurdlink] Shorten operation failed:", err);

      setFormError(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "ساخت لینک ناموفق بود."
      );
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {
      if (loading) return;
      resetForm();
      dispatch(clearUrlResult());
      onClose();
    }}
      title="ساخت لینک کوتاه جدید">
      <form  onSubmit={(e) => { e.preventDefault(); void handleShorten(); }} className="space-y-4">
        <div>
          <label htmlFor="long-url" className="mb-2 block text-sm font-medium text-slate-300">
            لینک طولانی
          </label>

          <input id="long-url" type="url" dir="ltr" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/your-long-link" disabled={loading}
            required
            className="h-14 w-full rounded-xl border border-[#26395D] bg-[#0B1228] px-4 text-left text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#5268FF] disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="link-prefix" className="mb-2 block text-sm font-medium text-slate-300">
            نام دلخواه لینک (اختیاری)
          </label>

          <input id="link-prefix" type="text" dir="ltr" value={prefix} onChange={(e) => setPrefix(e.target.value)}
            placeholder="my-link" disabled={loading}
            className="h-12 w-full rounded-xl border border-[#26395D] bg-[#0B1228] px-4 text-left text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#5268FF] disabled:opacity-60"/>
        </div>

        <div>
          <label htmlFor="link-password" className="mb-2 block text-sm font-medium text-slate-300">
            رمز لینک (اختیاری)
          </label>

          <input id="link-password" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="برای محافظت از لینک رمز وارد کنید"
            autoComplete="new-password" disabled={loading}
            className="h-12 w-full rounded-xl border border-[#26395D] bg-[#0B1228] px-4 text-left text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#5268FF] disabled:opacity-60"/>
          <p className="mt-1 text-xs text-slate-500">
            اگر خالی بماند، لینکتان بدون رمز ساخته می‌شود.
          </p>
        </div>

        <div>
          <label htmlFor="link-expires-at" className="mb-2 block text-sm font-medium text-slate-300" >
            تاریخ و زمان انقضا (اختیاری)
          </label>

          <input id="link-expires-at" type="datetime-local" dir="ltr" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 16)}
            disabled={loading}
            className="h-12 w-full rounded-xl border border-[#26395D] bg-[#0B1228] px-4 text-left text-sm text-white outline-none focus:border-[#5268FF] disabled:opacity-60"/>
          <p className="mt-1 text-xs text-slate-500">
            بعد از زمان انتخاب‌شده، اعتبار لینک باید توسط سرور پایان یابد.
          </p>
        </div>

        {(formError || error) && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
          >
            {formError || String(error)}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <button type="button" onClick={() => {   if (loading) return;
              resetForm();
              dispatch(clearUrlResult());
              onClose();}}
            disabled={loading}
            className="h-12 flex-1 rounded-xl border border-[#26395D] text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:opacity-50">
            انصراف
          </button>

          <button type="submit" disabled={loading} className="h-12 flex-1 rounded-xl bg-gradient-to-l from-[#5268FF] to-[#4058EA] text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60" >
            {loading ? "در حال ساخت لینک..." : "کوتاه کردن لینک"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
