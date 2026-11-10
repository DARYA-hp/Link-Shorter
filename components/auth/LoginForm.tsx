import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, clearError, } from "@/store/slices/authSlice";
import { loginSchema } from "@/validations/authSchemas";
import AuthInput from "./AuthInput";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.auth.error);

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginValues,
    helpers: { setSubmitting: (value: boolean) => void; setStatus: (status: unknown) => void }) => {
    dispatch(clearError());
    helpers.setStatus(undefined);

    try {
      await dispatch(
        login({
          email: values.email.trim(),
          password: values.password,
          rememberMe,
        })
      ).unwrap();

      await router.replace("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);

      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "ورود انجام نشد. لطفاً دوباره تلاش کنید.";

      helpers.setStatus(message);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, setFieldValue, setFieldTouched, isSubmitting, status, }) => {
        const fieldError = (field: keyof LoginValues) =>
          touched[field] && errors[field]
            ? errors[field]
            : undefined;

        const updateField = (
          field: keyof LoginValues,
          value: string
        ) => {
          setFieldValue(field, value);
          if (authError) dispatch(clearError());
        };

        return (
          <Form className="mt-8" noValidate>
            <AuthInput name="email" label="ایمیل" type="email" placeholder="ایمیل" value={values.email} onChange={(value) => updateField("email", value)}
              onBlur={() => setFieldTouched("email", true)} error={fieldError("email")} icon={<MailIcon />} dir="ltr" />
            <div className="relative mt-4">
              <AuthInput name="password" label="رمز عبور" type={showPassword ? "text" : "password"} placeholder="رمز عبور" value={values.password}
                onChange={(value) => updateField("password", value)} onBlur={() => setFieldTouched("password", true)} error={fieldError("password")} icon={<LockIcon />}
                dir="rtl" />

              <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "مخفی کردن رمز عبور"
                    : "نمایش رمز عبور"
                }
                className="absolute left-16 top-[18px] z-10 flex h-7 w-7 items-center justify-center rounded-md text-[#91a0c1] transition hover:text-[#c6d1ec]" >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <label
                htmlFor="remember"
                className="flex cursor-pointer select-none items-center gap-3 text-[14px] text-[#d1d9ed]">
                <span>مرا به خاطر بسپار</span>
                <input id="remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only" />

                <span
                  aria-hidden="true"
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border transition-all ${rememberMe
                    ? "border-[#5268ff] bg-[#5268ff] shadow-[0_4px_15px_rgba(82,104,255,0.25)]"
                    : "border-[#345084] bg-[#0c1935]"
                    }`}
                >
                  {rememberMe && <CheckIcon />}
                </span>
              </label>
            </div>
            {(typeof status === "string" ? status : authError) && (
              <p
                role="alert"
                className="mt-4 text-sm leading-7 text-red-400"
              >
                {typeof status === "string" ? status : authError}
              </p>
            )}

            <button type="submit" disabled={isSubmitting}
              className="group mt-7 flex h-[64px] w-full items-center justify-center gap-3 rounded-[16px] bg-gradient-to-l from-[#5268ff] via-[#485df7] to-[#4054e7] text-[15px] font-bold text-white shadow-[0_12px_35px_rgba(65,83,231,0.28)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_17px_42px_rgba(65,83,231,0.38)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70">
              <span>
                {isSubmitting ? "در حال ورود..." : "ورود"}
              </span>

              {!isSubmitting && <ArrowLeftIcon />}
            </button>
            <div className="mt-5 text-center">
              <Link href="/forgot-password" className="text-[13px] font-medium text-[#5268ff] transition-colors hover:text-[#7b8cff]">
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>

              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute left-0 right-0 h-px bg-[#14294d]" />
                <span className="relative bg-[#06132c] px-6 text-[13px] text-[#8290ae]">
                  یا
                </span>
              </div>
              <button type="button" onClick={() => { console.log("Google login"); }}
                className="flex h-[62px] w-full items-center justify-center gap-3 rounded-[15px] border border-[#274271] bg-transparent text-[14px] font-medium text-[#e0e6f5] transition-all duration-200 hover:border-[#3a5a91] hover:bg-[#0b1833]">
                <GoogleIcon />
                <span>ورود با گوگل</span>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function MailIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
      <path d="M9.9 5.2A9.8 9.8 0 0112 5c6 0 9.5 7 9.5 7a18.4 18.4 0 01-3.1 3.8" />
      <path d="M6.1 6.1C3.8 7.8 2.5 12 2.5 12s3.5 7 9.5 7c1 0 1.9-.2 2.7-.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l4 4L19 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.27c0-.68-.06-1.34-.17-1.97H12v3.73h5.24a4.48 4.48 0 01-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.15z" />
      <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0012 21.5z" />
      <path fill="#FBBC05" d="M6.53 13.6A5.86 5.86 0 016.22 12c0-.56.1-1.1.31-1.6V7.87H3.28A9.76 9.76 0 002.25 12c0 1.57.38 3.06 1.03 4.13l3.25-2.53z" />
      <path fill="#EA4335" d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.45 14.63 2.5 12 2.5a9.75 9.75 0 00-8.72 5.37l3.25 2.53C7.3 8.09 9.46 6.37 12 6.37z" />
    </svg>
  );
}
