import * as Yup from "yup";

export const registerSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .required("نام و نام خانوادگی را وارد کنید.")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد.")
    .max(100, "نام بیش از حد طولانی است."),

  email: Yup.string()
    .trim()
    .email("فرمت ایمیل معتبر نیست.")
    .required("ایمیل را وارد کنید."),

  username: Yup.string()
    .trim()
    .max(30, "نام کاربری حداکثر ۳۰ کاراکتر است.")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد، نقطه، خط تیره و زیرخط باشد."
    ),

  password: Yup.string()
    .required("رمز عبور را وارد کنید.")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),

  password_confirmation: Yup.string()
    .required("تکرار رمز عبور را وارد کنید.")
    .oneOf(
      [Yup.ref("password")],
      "رمز عبور و تکرار آن یکسان نیستند."
    ),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("فرمت ایمیل معتبر نیست.")
    .required("ایمیل را وارد کنید."),

  password: Yup.string()
    .required("رمز عبور را وارد کنید."),
});