import { Eye, Lock, Save, X } from "lucide-react";
interface Props {
  onClose: () => void;
}
export default function ChangePasswordPanel({
  onClose,
}: Props) {
  return (
    <div dir="rtl" className=" w-full rounded-[12px] border border-[#1A3153] bg-[#09162D] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-extrabold">
          تغییر پسورد
        </h3>
        <button onClick={onClose} className="text-[#72829F] hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#182D5B]">
          <Lock className="h-7 w-7 text-[#667CFF]" />
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-[#9AA8C1]"> رمز عبور جدید را وارد کنید</p>
      <PasswordInput placeholder="رمز عبور جدید" />
      <PasswordInput placeholder="تکرار رمز عبور" />
      <button className=" mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#5268FF] to-[#4058EA] text-[11px]
          font-bold shadow-lg shadow-blue-600/20" >
        <Save className="h-4 w-4" />
        ذخیره
      </button>
    </div>
  )
}

function PasswordInput({ placeholder, }: { placeholder: string; }) {
  return (
    <div className="relative mt-3">
      <input type="password" placeholder={placeholder} className=" h-10 w-full rounded-lg border border-[#20385E] bg-[#0D1B35] px-3 pl-10
          text-[10px] text-white outline-none placeholder:text-[#566B8F] focus:border-[#5368FF]"/>
      <Eye className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#607394]" />
    </div>
  )
}