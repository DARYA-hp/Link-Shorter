import Head from "next/head";
import Link from "next/link";
import AuthLogo from "@/components/auth/AuthLogo";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>ثبت‌نام | Kurdlink</title>
        <meta name="description" content="ثبت‌نام در Kurdlink" />
      </Head>
      <main dir="rtl" className="relative min-h-screen overflow-x-hidden bg-[#050d20] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-250px] h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-[#173b8f]/20 blur-[150px]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b2b6c]/10 blur-[150px]" />
          <div className="absolute bottom-[-300px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#122f78]/10 blur-[160px]" />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:py-16">
          <section className="relative w-full max-w-[680px] overflow-hidden rounded-[26px] border border-[#17376e] bg-[#06132c]/95 px-5 py-9 shadow-[0_35px_100px_rgba(0,0,0,0.45)] sm:px-10 sm:py-12 md:px-16 md:py-14">
            <div className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-white/[0.015]" />
            <div className="relative">
              <div className="mb-8">
                <AuthLogo />
              </div>
              <div className="text-center">
                <h1 className="text-[27px] font-extrabold tracking-tight text-white sm:text-[30px]">
                  ثبت‌نام در کردلینک
                </h1>
                <p className="mt-3 text-[14px] leading-7 text-[#8191b5] sm:text-[15px]">
                  با چند قدم ساده، حساب کاربری خود را بسازید.
                </p>
              </div>
              <RegisterForm />
              <div className="mt-9">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 right-0 h-px bg-[#142849]" />
                  <div className="relative bg-[#06132c] px-5">
                    <span className="text-[13px] text-[#7889b1]">
                      قبلاً ثبت‌نام کرده‌اید؟
                    </span>
                    <Link href="/login" className="mr-1 text-[#566dff] transition-colors hover:text-[#7b8cff]">
                      ورود
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}