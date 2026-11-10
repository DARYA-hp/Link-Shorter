import { BarChart3, Clock3, Download, ExternalLink, Link2, Lock, Trash2, X, } from "lucide-react";
interface Props {
  onClose: () => void;
}
export default function LinkDetailsPanel({ onClose, }: Props) {
  return (
    <div dir="rtl" className=" w-full rounded-[12px] border border-[#1A3153] bg-[#09162D] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]" >
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-extrabold">
          جزئیات لینک
        </h3>
        <button onClick={onClose} className="text-[#72829F] hover:text-white" >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-5 flex gap-2">
        <div className="flex h-10 flex-1 items-center rounded-lg border border-[#20385E] bg-[#0D1B35] px-3 text-[10px] font-bold text-[#6078FF]">
          <span dir="ltr">
            kurdlink.ir/go/abc123
          </span>
          <Link2 className="mr-auto h-4 w-4" />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#20385E] bg-[#0D1B35] text-[#8092B2]">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      <p dir="ltr" className="mt-2 truncate text-[10px] text-[#7D8EA9]">https://example.com/very-long-link...</p>
      <div className="mt-5 flex items-center gap-5">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-white p-2">
          <div className="grid h-full w-full grid-cols-5 gap-0.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className={[0, 1, 4, 5, 6, 9, 10, 14, 15, 19, 20, 21, 24].includes(i)
                ? "bg-black"
                : "bg-white"} />
            ))}
          </div>
        </div>
        <button className="flex h-9 items-center gap-2 rounded-lg bg-[#172B55] px-3 text-[10px] font-bold text-[#91A3FF]">
          <Download className="h-4 w-4" />
          دانلود QR
        </button>
      </div>
      <div className="my-4 h-px bg-[#162B4A]" />
      <div className="space-y-3">
        <DetailRow label="آخرین کلیک" value="۱۴۰۴/۰۶/۲۵ - ۱۳:۴۵" icon={<Clock3 />} />
        <DetailRow label="تعداد کلیک" value="421" icon={<BarChart3 />} />
        <DetailRow label="وضعیت" value="فعال" icon={<Link2 />} active />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <button className="flex h-9 items-center justify-center gap-1 rounded-lg border border-[#20385E] text-[9px] text-[#9BAAC3]">
          <Lock className="h-3.5 w-3.5" />
          تغییر پسورد
        </button>
        <button className="flex h-9 items-center justify-center gap-1 rounded-lg border border-[#20385E] text-[9px] text-[#9BAAC3]">
          <Lock className="h-3.5 w-3.5" />
          ویرایش
        </button>
        <button className="flex h-9 items-center justify-center gap-1 rounded-lg border border-[#71323C] bg-[#391C24] text-[9px] text-[#F15A68]">
          <Trash2 className="h-3.5 w-3.5" />
          حذف
        </button>
      </div>
    </div>
  )
}

function DetailRow({ label, value, icon, active, }: {
  label: string;
  value: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[10px] text-[#788AA8]">
        <span className="text-[#6177A0]">
          {icon}
        </span>
        {label}
      </div>
      {active ? (
        <span className="rounded-full bg-[#0C8069] px-3 py-1 text-[9px] font-bold text-[#A2F4DC]">
          {value}
        </span>
      ) : (
        <span className="text-[10px] text-[#C2CBDB]">
          {value}
        </span>
      )}
    </div>
  )
}