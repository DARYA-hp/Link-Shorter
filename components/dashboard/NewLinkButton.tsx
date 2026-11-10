import { Link2, Plus } from "lucide-react";
interface Props {
  onClick: () => void;
}
export default function NewLinkButton({ onClick }: Props) {
  return (
    <button onClick={onClick}
      className=" flex h-[84px] w-full items-center justify-between rounded-[12px] border border-[#1A3155] bg-[#0C1930] px-5 transition
        hover:border-[#2D4B7A] hover:bg-[#0D1D38]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#182D5A]">
          <Link2 className="h-6 w-6 text-[#6177FF]" />
        </div>
        <div className="text-right">
          <p className="text-[14px] font-bold"> لینک جدید بساز</p>
          <p className="mt-1 text-[10px] text-[#7383A2]">
            لینک طولانی خود را کوتاه کنید
          </p>
          
        </div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5268FF] shadow-lg shadow-blue-600/20">
        <Plus className="h-5 w-5 cursor-pointer" />
      </div>
    </button>
  );
}