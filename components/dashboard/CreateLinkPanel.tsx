
import { useState } from "react";

import { Eye, Link2, X } from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  shorten,
  clearUrlResult,
} from "@/store/slices/urlSlice";

interface Props {
  onClose: () => void;
  onLinkCreated: (result: unknown) => boolean;
}

export default function CreateLinkPanel({
  onClose,
  onLinkCreated,
}: Props) {
  const dispatch = useAppDispatch();

  const token = useAppSelector(
    (state) => state.auth.token
  );

  const loading = useAppSelector(
    (state) => state.url.loading
  );

  const result = useAppSelector(
    (state) => state.url.result
  );

  const error = useAppSelector(
    (state) => state.url.error
  );

  const [url, setUrl] = useState("");
  const [prefix, setPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateLink = async () => {
    if (loading) return;

    if (!token) {
      alert("لطفاً ابتدا وارد حساب کاربری شوید.");
      return;
    }

    if (!url.trim()) {
      alert("لطفاً لینک اصلی را وارد کنید.");
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url.trim());

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        throw new Error("Invalid protocol");
      }
    } catch {
      alert("لطفاً یک آدرس معتبر با http یا https وارد کنید.");
      return;
    }

    const payload: {
      url: string;
      prefix?: string;
      password?: string;
    } = {
      url: parsedUrl.href,
    };

    if (prefix.trim()) {
      payload.prefix = prefix.trim();
    }

    if (showPassword && password) {
      payload.password = password;
    }

    try {
      const apiResult = await dispatch(
        shorten({
          payload,
          token,
        })
      ).unwrap();
      const added = onLinkCreated(apiResult);
      if (added) {
        setUrl("");
        setPrefix("");
        setPassword("");

        dispatch(clearUrlResult());
        onClose();
      }
    } catch (err) {
      console.error("Shorten error:", err);

      alert(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "کوتاه کردن لینک انجام نشد."
      );
    }
  };

  const handleClose = () => {
    if (loading) return;

    dispatch(clearUrlResult());
    onClose();
  };

  return (
    <div dir="rtl" className="w-full rounded-[12px] border border-[#1A3153] bg-[#09162D] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-extrabold">
          ساخت لینک جدید
        </h3>

        <button type="button" onClick={handleClose} disabled={loading} aria-label="بستن پنل" className="text-[#72829F] hover:text-white disabled:opacity-50">
          <X className="h-4 w-4" />
        </button>
      </div>

      <label className="mt-5 block text-[11px] text-[#8B9AB6]">
        لینک اصلی
      </label>

      <input value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { void handleCreateLink();}}}
        dir="ltr" type="url" autoComplete="url" placeholder="https://example.com/very-long-link"
        className="mt-2 h-10 w-full rounded-lg border border-[#20385E] bg-[#0D1B35] px-3 text-left text-[10px] text-white outline-none placeholder:text-[#566B8F] focus:border-[#5368FF]"/>

      <label className="mt-4 block text-[11px] text-[#8B9AB6]">
        نام دلخواه (اختیاری)
      </label>

      <input value={prefix} onChange={(e) => setPrefix(e.target.value)} dir="ltr" placeholder="my-link" className="mt-2 h-10 w-full rounded-lg border border-[#20385E] bg-[#0D1B35] px-3 text-left text-[10px] text-white outline-none placeholder:text-[#566B8F] focus:border-[#5368FF]"/>
      <label className="mt-4 flex items-center justify-between text-[11px] text-[#8B9AB6]">
        رمز عبور (اختیاری)
        <button type="button" role="switch" aria-checked={showPassword} aria-label="فعال‌سازی رمز عبور" onClick={() => { setShowPassword((prev) => {
              if (prev) setPassword("");
              return !prev;
            }); }} className={`flex h-5 w-9 items-center rounded-full p-1 transition ${ showPassword ? "bg-[#5368FF]" : "bg-[#34445F]"}`} >
          <span className={`h-3 w-3 rounded-full bg-white transition-transform ${ showPassword ? "-translate-x-4" : "translate-x-0" }`} />
        </button>
      </label>

      {showPassword && (
        <div className="relative mt-2">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="رمز عبور لینک" autoComplete="new-password" className="h-10 w-full rounded-lg border border-[#20385E] bg-[#0D1B35] px-3 text-[11px] text-white outline-none placeholder:text-[#566B8F] focus:border-[#5368FF]"/>
          <Eye className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5D7194]" />
        </div>
      )}

      <button type="button" onClick={() => void handleCreateLink()} disabled={loading}
        className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#5268FF] to-[#4058EA] text-[11px] font-bold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
        <Link2 className="h-4 w-4" />

        <span>
          {loading ? "در حال ساخت..." : "ساخت لینک"}
        </span>
      </button>

      {result && (
        <div className="mt-4 rounded-lg border border-[#1A3153] bg-[#0D1B35] p-3">
          <p className="text-[10px] text-[#8B9AB6]">
            پاسخ API:
          </p>

          <pre
            dir="ltr"
            className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all text-left text-[9px] text-[#B9C6E3]"
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <p className="mt-3 text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
