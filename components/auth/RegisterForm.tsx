import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import AuthInput from "./AuthInput";
import PasswordRules from "./PasswordRules";
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/slices/authSlice";
import { registerSchema } from "@/validations/authSchemas";

interface RegisterValues {
  full_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

const initialValues: RegisterValues = {
  full_name: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
}

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: RegisterValues,
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status: unknown) => void;
    }
  ) => {
    if (loading) return;

    try {
      setLoading(true);
      setStatus(undefined);

      await dispatch(
        register({
          full_name: values.full_name.trim(),
          email: values.email.trim(),
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
      ).unwrap();

      await router.replace("/login");
    } catch (error: unknown) {
      console.error("Register error:", error);

      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.";

      setStatus(message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit} validateOnMount={false} >
      {({ values, errors, touched,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => {
        const fieldError = (field: keyof RegisterValues) =>
          touched[field] && errors[field]
            ? String(errors[field])
            : undefined;

        return (
          <Form className="mt-8 space-y-4" noValidate>
            <AuthInput name="full_name" label="نام و نام خانوادگی" placeholder="نام و نام خانوادگی" value={values.full_name} onChange={(value) => setFieldValue("full_name", value)}
              onBlur={() => handleBlur("full_name")} error={fieldError("full_name")} icon={<UserIcon />} />
            <AuthInput name="email" label="ایمیل" type="email" placeholder="ایمیل" value={values.email} onChange={(value) => setFieldValue("email", value)}
              onBlur={() => handleBlur("email")} error={fieldError("email")} icon={<MailIcon />} dir="ltr" />
            <AuthInput name="username" label="نام کاربری" placeholder="نام کاربری (اختیاری)" value={values.username} onChange={(value) => setFieldValue("username", value)}
              onBlur={() => handleBlur("username")} error={fieldError("username")} icon={<UserIcon />} />
            <AuthInput name="password" label="رمز عبور" type="password" placeholder="رمز عبور" value={values.password} onChange={(value) => setFieldValue("password", value)}
              onBlur={() => handleBlur("password")} error={fieldError("password")} icon={<LockIcon />} dir="ltr"/>
            <AuthInput name="password_confirmation" label="تکرار رمز عبور" type="password" placeholder="تکرار رمز عبور" value={values.password_confirmation}
              onChange={(value) => setFieldValue("password_confirmation", value) } onBlur={() => handleBlur("password_confirmation")} error={fieldError("password_confirmation")} icon={<LockIcon />} dir="ltr"/>

            <PasswordRules password={values.password} />

            <button type="submit" disabled={loading || isSubmitting}
              className="group mt-1 flex h-[66px] w-full items-center justify-center gap-3 rounded-[16px] bg-gradient-to-l from-[#5268ff] via-[#485df7] to-[#3e52e7] text-[16px] font-bold text-white shadow-[0_12px_35px_rgba(65,83,231,0.28)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_16px_40px_rgba(65,83,231,0.38)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60">
              <span>
                {loading || isSubmitting
                  ? "در حال ثبت‌نام..."
                  : "ثبت‌نام"}
              </span>

              <UserPlusIcon />
            </button>
          </Form>
        );
      }}
    </Formik>
  )
}

function UserIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M8 10V7a4 4 0 018 0v3" />
      <circle cx="12" cy="15" r="1" />
    </svg>
  )
}

function UserPlusIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 20a6 6 0 00-12 0" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M16 11h6" />
    </svg>
  )
}