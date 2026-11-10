// import { BarChart3, Copy, Edit3, LockKeyhole, Search, Trash2, type LucideIcon, } from "lucide-react";
// export interface LinkItem {
//   id: number;
//   shortUrl: string;
//   originalUrl: string;
//   clicks: number;
//   status: "فعال" | "غیرفعال";
//   date: string;
//   time: string;
// }

// interface Props {
//   links: LinkItem[];
//   onDetails: (link: LinkItem) => void;
// }

// export default function LinksTable({ links, onDetails, }: Props) {
//   return (
//     <section dir="rtl" className=" overflow-hidden rounded-[12px] border border-[#192F50] bg-[#0A172E]">
//       <div className="flex h-[62px] items-center justify-between border-b border-[#172B4A] px-5">
//         <div className="flex items-center gap-3">
//           <h2 className="text-[16px] font-extrabold text-white">
//             لیست لینک‌ها
//           </h2>
//           <span className="rounded-full bg-[#172A4D] px-3 py-1 text-[10px] font-bold text-[#7990BB]">
//             {links.length} لینک
//           </span>
//         </div>
//         <div className="relative hidden w-[275px] sm:block">
//           <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#566B91]" />
//           <input type="text" placeholder="جستجو در لینک‌ها..."
//             className=" h-9 w-full rounded-lg border border-[#1B3153] bg-[#0C1932] pr-9 pl-3 text-[11px]
//               text-white outline-none placeholder:text-[#536584] transition focus:border-[#315083]"/>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[900px] text-right">
//           <thead>
//             <tr className="  h-[43px] border-b border-[#172B4A] bg-[#0C1932] text-[10px] text-[#6F82A5]">
//               <th className="w-[45px] px-4">
//                 <input type="checkbox" className="h-3.5 w-3.5 accent-[#5268FF]" />
//               </th>
//               <th>لینک کوتاه</th>
//               <th>لینک اصلی</th>
//               <th>کلیک‌ها</th>
//               <th>وضعیت</th>
//               <th>ایجاد شده</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {links.map((link) => (
//               <LinkRow key={link.id} link={link} onDetails={onDetails} />))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   )
// }
// function LinkRow({
//   link,
//   onDetails,
// }: {
//   link: LinkItem;
//   onDetails: (link: LinkItem) => void;
// }) {
//   const copy = async () => {
//     try {
//       await navigator.clipboard.writeText(link.shortUrl);
//     } catch (error) {
//       console.error("Copy failed:", error);
//     }
//   };
//   return (
//     <tr className=" h-[55px] border-b border-[#142945] text-[10px] transition hover:bg-[#0D1C36]">
//       <td className="px-4">
//         <input type="checkbox" className="h-3.5 w-3.5 accent-[#5268FF]" />
//       </td>
//       <td>
//         <div className=" inline-flex items-center gap-2 rounded-full bg-[#14284B] px-3 py-2 text-[#849BFF] ">
//           <span dir="ltr">
//             {link.shortUrl}
//           </span>
//           <button type="button" onClick={copy} className="transition hover:text-white" aria-label="کپی لینک">
//             <Copy className="h-3.5 w-3.5" />
//           </button>
//         </div>
//       </td>
//       <td>
//         <span dir="ltr" className=" block max-w-[190px] truncate text-[#C0C9DB]">
//           {link.originalUrl}
//         </span>
//       </td>
//       <td className="font-bold text-[#E0E5F0]">
//         {link.clicks}
//       </td>
//       <td>
//         <span className={` inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold
//             ${link.status === "فعال"
//             ? "bg-[#0B8068] text-[#9AF5DC]"
//             : "bg-[#8E2933] text-[#FFC0C5]"
//           }`}>
//           {link.status}
//         </span>
//       </td>
//       <td>
//         <div className="text-[#B3BED3]">
//           <p>{link.date}</p>
//           <p className="mt-1 text-[9px] text-[#5F7192]">
//             {link.time}
//           </p>
//         </div>
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           <ActionButton icon={BarChart3} ariaLabel="مشاهده آمار" />
//           <ActionButton icon={Edit3} ariaLabel="ویرایش لینک" />
//           <ActionButton icon={LockKeyhole} ariaLabel="تغییر رمز" />
//           <ActionButton icon={Trash2} danger ariaLabel="حذف لینک" />
//         </div>
//       </td>
//     </tr>
//   );
// }
// function ActionButton({
//   icon: Icon,
//   danger = false,
//   ariaLabel,
// }: {
//   icon: LucideIcon;
//   danger?: boolean;
//   ariaLabel: string;
// }) {
//   return (
//     <button type="button" aria-label={ariaLabel} className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#132541] transition
//         ${danger ? `
//               text-[#F04E5D]
//               hover:bg-[#3A1820] `
//         : `
//               text-[#8FA1C0]
//               hover:bg-[#20385D]
//               hover:text-white
//             ` }`} >
//       <Icon className="h-3.5 w-3.5" />
//     </button>
//   )
// }



import { BarChart3, Copy, Edit3, LockKeyhole, Search, Trash2, type LucideIcon,} from "lucide-react";

export interface LinkItem {
  id: number;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: "فعال" | "غیرفعال";
  date: string;
  time: string;
}

interface Props {
  links: LinkItem[];
  onDetails: (link: LinkItem) => void;
}

export default function LinksTable({ links, onDetails }: Props) {
  return (
    <section dir="rtl" className="overflow-hidden rounded-[12px] border border-[#192F50] bg-[#0A172E]">
      <div className="flex h-[62px] items-center justify-between border-b border-[#172B4A] px-5">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-extrabold text-white">
            لیست لینک‌ها
          </h2>
          <span className="rounded-full bg-[#172A4D] px-3 py-1 text-[10px] font-bold text-[#7990BB]">
            {links.length} لینک
          </span>
        </div>

        <div className="relative hidden w-[275px] sm:block">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#566B91]" />
          <input
            type="text"
            placeholder="جستجو در لینک‌ها..."
            className="h-9 w-full rounded-lg border border-[#1B3153] bg-[#0C1932] pr-9 pl-3 text-[11px] text-white outline-none placeholder:text-[#536584] transition focus:border-[#315083]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-right">
          <thead>
            <tr className="h-[43px] border-b border-[#172B4A] bg-[#0C1932] text-[10px] text-[#6F82A5]">
              <th className="w-[45px] px-4">
                <input type="checkbox" className="h-3.5 w-3.5 accent-[#5268FF]" />
              </th>
              <th>لینک کوتاه</th>
              <th>لینک اصلی</th>
              <th>کلیک‌ها</th>
              <th>وضعیت</th>
              <th>ایجاد شده</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <LinkRow key={link.id} link={link} onDetails={onDetails} />
            ))}

            {links.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-[#7183A3]">
                  هنوز لینکی ایجاد نکرده‌اید.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LinkRow({
  link,
  onDetails,
}: {
  link: LinkItem;
  onDetails: (link: LinkItem) => void;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      console.info("[Kurdlink] Redirect URL copied:", link.shortUrl);
    } catch (error) {
      console.error("Copy failed:", error);
      try {
        const input = document.createElement("textarea");
        input.value = link.shortUrl;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
    }
  };

  return (
    <tr className="h-[55px] border-b border-[#142945] text-[10px] transition hover:bg-[#0D1C36]">
      <td className="px-4">
        <input type="checkbox" className="h-3.5 w-3.5 accent-[#5268FF]" />
      </td>

      <td>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#14284B] px-3 py-2 text-[#849BFF]">
          <a
            href={link.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            title="باز کردن لینک کوتاه"
            className="max-w-[220px] truncate hover:text-white hover:underline"
          >
            {link.shortUrl}
          </a>

          <button
            type="button"
            onClick={copy}
            className="transition hover:text-white"
            aria-label="کپی لینک"
            title="کپی لینک"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
      <td>
        <a
          href={link.originalUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="block max-w-[190px] truncate text-[#C0C9DB] hover:text-white"
        >
          {link.originalUrl || "—"}
        </a>
      </td>

      <td className="font-bold text-[#E0E5F0]">
        {link.clicks}
      </td>

      <td>
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold
            ${
              link.status === "فعال"
                ? "bg-[#0B8068] text-[#9AF5DC]"
                : "bg-[#8E2933] text-[#FFC0C5]"
            }`}
        >
          {link.status}
        </span>
      </td>

      <td>
        <div className="text-[#B3BED3]">
          <p>{link.date}</p>
          <p className="mt-1 text-[9px] text-[#5F7192]">
            {link.time}
          </p>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <ActionButton
            icon={BarChart3}
            ariaLabel="مشاهده آمار"
            onClick={() => onDetails(link)}
          />
          <ActionButton icon={Edit3} ariaLabel="ویرایش لینک" />
          <ActionButton icon={LockKeyhole} ariaLabel="تغییر رمز" />
          <ActionButton icon={Trash2} danger ariaLabel="حذف لینک" />
        </div>
      </td>
    </tr>
  );
}

function ActionButton({
  icon: Icon,
  danger = false,
  ariaLabel,
  onClick,
}: {
  icon: LucideIcon;
  danger?: boolean;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#132541] transition
        ${
          danger
            ? "text-[#F04E5D] hover:bg-[#3A1820]"
            : "text-[#8FA1C0] hover:bg-[#20385D] hover:text-white"
        }`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
