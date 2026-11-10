import Link from "next/link";
import { Link2, PlusCircle, UserRound, LogOut, BarChart3,} from "lucide-react";

export default function Sidebar() {
  return (
    <aside dir="rtl"  className=" fixed bottom-0 left-0 top-0 z-40 hidden w-[215px] border-l border-[#162746] bg-[#071124] lg:flex lg:flex-col ">
      <div className="flex h-[68px] items-center border-b border-[#142541] px-7">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center">
            <Link2 className="h-8 w-8 text-[#5368FF]" strokeWidth={2.7} />
          </div>
          <span className="text-[21px] font-extrabold">
            Kurd<span className="text-[#5368FF]">link</span>
          </span>
        </Link>
      </div>
      <nav className="mt-6 px-4">
        <Link href="/dashboard" className="flex h-[42px] items-center gap-4 rounded-xl bg-gradient-to-l from-[#5268FF] to-[#4058EA] px-4
            text-[13px] font-bold text-white shadow-[0_8px_25px_rgba(70,90,255,0.2)] ">
          <Link2 className="h-[18px] w-[18px]" />
          لینک‌ها
        </Link>
        <Link href="#create" className=" mt-2 flex h-[42px] items-center gap-4 rounded-xl px-4 text-[13px] text-[#9BA9C5]
            transition hover:bg-[#0D1A34] hover:text-white" >
          <PlusCircle className="h-[18px] w-[18px]" />
          ساخت لینک جدید
        </Link>
        <Link href="#profile" className=" mt-2 flex h-[42px] items-center gap-4 rounded-xl px-4 text-[13px] text-[#9BA9C5] transition
            hover:bg-[#0D1A34] hover:text-white">
          <UserRound className="h-[18px] w-[18px]" />
          پروفایل
        </Link>

        <button className=" mt-2 flex h-[42px] w-full items-center gap-4 rounded-xl px-4 text-[13px] text-[#9BA9C5] transition hover:bg-[#0D1A34] hover:text-white">
          <LogOut className="h-[18px] w-[18px]" />
          خروج
        </button>
      </nav>
      <div className="mt-auto border-t border-[#142541] p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5368FF]/10">
            <Link2 className="h-5 w-5 text-[#5368FF]" />
          </div>
          <div>
            <p className="text-[12px] font-bold"> Kurd<span className="text-[#5368FF]">link</span> </p>
            <p className="mt-1 text-[9px] text-[#637494]"> لینک‌های کوتاه، امکانات بیشتر.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}