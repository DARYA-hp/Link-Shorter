import { BarChart3, CalendarDays, Clock3, Link2, MousePointer2,} from "lucide-react";
interface StatCardProps { title: string; value: string; growth: string; type: "clicks" | "links" | "today" | "active";}

export default function StatCard({ title, value, growth, type,}: StatCardProps) {
  const icons = {
    clicks: MousePointer2,
    links: Link2,
    today: CalendarDays,
    active: Clock3,
  }
  const Icon = icons[type];

  return (
    <div className=" relative overflow-hidden rounded-[12px] border border-[#182D4E] bg-[#0B1830] px-4 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.12)] ">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-[#8595B4]"> {title}</p>
          <p className="mt-2 text-[21px] font-extrabold text-white"> {value}</p>
        </div>

        <div className=" flex h-11 w-11 items-center justify-center rounded-full bg-[#172B59] text-[#6B7EFF] ">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span className="text-[11px] font-bold text-[#19C79A]">
          ↑ {growth}
        </span>
        <MiniChart />
      </div>
    </div>
  )
}

function MiniChart() {
  return (
    <svg width="85" height="27" viewBox="0 0 85 27" fill="none">
      <path d="M1 22C8 20 10 15 17 17C25 20 27 12 35 14C43 16 47 5 54 9C61 13 65 7 71 10C77 13 80 4 84 3"
        stroke="#3C6BEA" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}