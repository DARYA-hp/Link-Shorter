import Head from "next/head";
import Link from "next/link";
import AuthLogo from "@/components/auth/AuthLogo";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>ورود | Kurdlink</title>
        <meta name="description" content="ورود به حساب کاربری Kurdlink" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main dir="rtl" className=" relative min-h-screen overflow-hidden bg-[#050d20] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className=" absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#123276]/20 blur-[170px]"/>
          <div className=" absolute left-1/2 top-1/2 h-[700px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c2a66]/10 blur-[170px] "/>
          <div className=" absolute bottom-[-350px] left-1/2 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#102c6b]/10 blur-[170px]"/>
        </div>
        <div className=" relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
          <section className=" relative w-full max-w-[590px] rounded-[25px] border border-[#17376c] bg-[#06132c]/95 px-5 py-9
              shadow-[0_35px_110px_rgba(0,0,0,0.48)] sm:px-10 sm:py-11 md:px-[55px] md:py-[48px] ">
            <div className=" pointer-events-none absolute inset-[1px] rounded-[24px] border border-white/[0.012] "/>

            <div className="relative">
              <div className="mb-8">
                <AuthLogo />
              </div>
              <div className="text-center">
                <h1 className=" text-[27px] font-extrabold tracking-tight text-white sm:text-[29px]" >
                  ورود به حساب کاربری
                </h1>
                <p className=" mt-3 text-[14px] leading-7 text-[#7e90b7] sm:text-[15px] " >
                  لطفاً ایمیل و رمز عبور خود را وارد کنید.
                </p>
              </div>

              <LoginForm />
              <div className="mt-10 text-center">
                <p className="text-[13px] text-[#8592ad]">
                  حساب کاربری ندارید؟
                  <Link href="/register" className=" mr-2 font-medium text-[#5268ff] transition-colors hover:text-[#7b8cff] ">
                    ثبت‌نام کنید
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}