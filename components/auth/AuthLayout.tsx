import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050D20] px-4 py-8 text-white sm:py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[130px]" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-600/[0.06] blur-[120px]" />
        <div className="absolute left-[-150px] top-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>
      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
        {children}
      </div>
    </main>
  )
}