import { Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header dir="rtl" className=" fixed right-0 top-0 z-30 flex h-[68px] w-full items-center justify-end border-b border-[#142541]
        bg-[#071124]/95 px-5 backdrop-blur-xl lg:pr-[235px]">
      <div className="flex items-center gap-5">
        <button className=" relative flex h-9 w-9 items-center justify-center rounded-lg text-[#A4B0C8] transition hover:bg-[#0E1B35] hover:text-white">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-1 h-1.5 w-1.5 rounded-full bg-[#5368FF]" />
        </button>
        <div className="h-7 w-px bg-[#182A47]" />
        <button className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#29436D] bg-[#172744]">
            <span className="text-[11px] text-white">
              د
            </span>
          </div>

          <span className="text-[12px] font-medium text-[#D7DFF0]">
            دریا
          </span>

          <ChevronDown className="h-3.5 w-3.5 text-[#7B8BAA]" />
        </button>
      </div>
    </header>
  )
}