// import { useEffect, useState } from "react";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";
// import StatCard from "@/components/dashboard/StatCard";
// import NewLinkButton from "@/components/dashboard/NewLinkButton";
// import LinksTable from "@/components/dashboard/LinksTable";
// import CreateLinkModal from "@/components/dashboard/CreateLinkModal";
// import LinkDetailsPanel from "@/components/dashboard/LinkDetailsPanel";
// import ChangePasswordPanel from "@/components/dashboard/ChangePasswordPanel";
// import type { LinkItem } from "@/components/dashboard/LinksTable";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchUserUrls } from "@/store/slices/urlSlice";

// type ApiRecord = Record<string, unknown>;

// function isRecord(value: unknown): value is ApiRecord {
//   return (
//     typeof value === "object" &&
//     value !== null &&
//     !Array.isArray(value)
//   );
// }

// function getString(
//   record: ApiRecord,
//   keys: string[]
// ): string | undefined {
//   for (const key of keys) {
//     const value = record[key];

//     if (typeof value === "string" && value.trim()) {
//       return value.trim();
//     }
//   }

//   return undefined;
// }

// function getNumber(
//   record: ApiRecord,
//   keys: string[]
// ): number | undefined {
//   for (const key of keys) {
//     const value = record[key];

//     if (
//       typeof value === "number" &&
//       Number.isFinite(value)
//     ) {
//       return value;
//     }

//     if (
//       typeof value === "string" &&
//       value.trim() &&
//       Number.isFinite(Number(value))
//     ) {
//       return Number(value);
//     }
//   }

//   return undefined;
// }

// function getDateParts(value?: string): {
//   date: string;
//   time: string;
// } {
//   const parsedDate = value ? new Date(value) : new Date();
//   const validDate = !Number.isNaN(parsedDate.getTime());
//   const dateValue = validDate ? parsedDate : new Date();

//   return {
//     date: dateValue.toLocaleDateString("fa-IR"),
//     time: dateValue.toLocaleTimeString("fa-IR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   };
// }

// function mapApiLinkToLinkItem(
//   response: unknown
// ): LinkItem | null {
//   if (!isRecord(response)) return null;

//   const data = isRecord(response.data)
//     ? response.data
//     : isRecord(response.result)
//       ? response.result
//       : response;

//   const shortUrl = getString(data, [ "short_url", "shortUrl", "short_link", "shortLink", "shortened_url", "shortenedUrl", "short_code", "shortCode",]);

//   if (!shortUrl) return null;

//   const originalUrl =
//     getString(data, [ "original_url", "originalUrl", "long_url", "longUrl", "destination_url", "destinationUrl", "url",]) ?? "";

//   const id = getNumber(data, ["id"]) ?? Date.now();

//   const clicks =
//     getNumber(data, [
//       "clicks",
//       "click_count",
//       "clickCount",
//       "visits",
//       "visit_count",
//     ]) ?? 0;

//   const createdAt = getString(data, [
//     "created_at",
//     "createdAt",
//     "created",
//   ]);

//   const { date, time } = getDateParts(createdAt);

//   const statusValue = getString(data, [
//     "status",
//     "state",
//   ]);

//   const inactive = statusValue === "inactive" || statusValue === "disabled" || statusValue === "غیرفعال";

//   return {
//     id,
//     shortUrl: shortUrl.replace(/^https?:\/\//i, ""),
//     originalUrl,
//     clicks,
//     status: inactive ? "غیرفعال" : "فعال",
//     date,
//     time,
//   };
// }

// function extractApiRecords(response: unknown): unknown[] {
//   if (Array.isArray(response)) {
//     return response;
//   }

//   if (!isRecord(response)) {
//     return [];
//   }

//   for (const key of ["data", "urls", "links", "results", "result"]) {
//     const value = response[key];

//     if (Array.isArray(value)) {
//       return value;
//     }

//     if (isRecord(value)) {
//       for (const nestedKey of ["data", "urls", "links", "results"]) {
//         if (Array.isArray(value[nestedKey])) {
//           return value[nestedKey] as unknown[];
//         }
//       }
//     }
//   }

//   if (
//     getString(response, [  "short_url", "shortUrl", "short_link", "shortLink", "shortened_url", "shortenedUrl",])
//   ) {
//     return [response];
//   }

//   return [];
// }

// function getStoredUserName(
//   user: unknown
// ): string {
//   if (isRecord(user)) {
//     const name = getString(user, [ "full_name", "fullName", "name", "username", "first_name", "firstName",]);

//     if (name) return name;

//     const email = getString(user, ["email"]);

//     if (email && typeof window !== "undefined") {
//       const savedName = localStorage.getItem(
//         `kurdlink_name_${email.toLowerCase()}`
//       );

//       if (savedName?.trim()) {
//         return savedName.trim();
//       }
//     }
//   }

//   if (typeof window !== "undefined") {
//     const registeredName = localStorage.getItem(
//       "kurdlink_registered_name"
//     );

//     if (registeredName?.trim()) {
//       return registeredName.trim();
//     }
//   }

//   return "کاربر";
// }

// export default function Dashboard() {
//   const dispatch = useAppDispatch();

//   const token = useAppSelector((state) => state.auth.token);
//   const user = useAppSelector((state) => state.auth.user);
//   const apiUrls = useAppSelector((state) => state.url.userUrls);
//   const loadingList = useAppSelector(
//     (state) => state.url.loadingList
//   );

//   const [links, setLinks] = useState<LinkItem[]>([]);
//   const [showCreate, setShowCreate] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [listError, setListError] = useState("");

//   const userName = getStoredUserName(user);

//   useEffect(() => {
//     if (!token) {
//       setLinks([]);
//       return;
//     }

//     dispatch(fetchUserUrls({ token }))
//       .unwrap()
//       .then(() => {
//         setListError("");
//       })
//       .catch((error: unknown) => {
//         console.error(
//           "[Kurdlink Dashboard] Failed to load user URLs",
//           error
//         );

//         setListError(
//           typeof error === "string"
//             ? error
//             : "دریافت لینک‌های کاربر ناموفق بود."
//         );
//       });
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (apiUrls === null || apiUrls === undefined) {
//       return;
//     }

//     const records = extractApiRecords(apiUrls);

//     const mappedLinks = records
//       .map(mapApiLinkToLinkItem)
//       .filter((link): link is LinkItem => link !== null);

//     console.info("[Kurdlink Dashboard] User URL list processed", {
//       received: records.length,
//       mapped: mappedLinks.length,
//     });

//     setLinks(mappedLinks);

//     if (records.length > 0 && mappedLinks.length === 0) {
//       console.error(
//         "[Kurdlink Dashboard] Could not map API records to LinkItem. Check the API response field names."
//       );
//     }
//   }, [apiUrls]);

//   function handleLinkCreated(apiResponse: unknown): boolean {
//     const newLink = mapApiLinkToLinkItem(apiResponse);

//     if (!newLink) {
//       console.error(
//         "[Kurdlink Dashboard] Shorten response could not be mapped",
//         apiResponse
//       )
//       alert(
//         "درخواست ساخت لینک ارسال شد، اما آدرس کوتاه در پاسخ سرور پیدا نشد."
//       )
//       return false;
//     }
//     setLinks((previousLinks) => [
//       newLink,
//       ...previousLinks.filter((link) => link.id !== newLink.id),
//     ])
//     if (token) {
//       dispatch(fetchUserUrls({ token }))
//         .unwrap()
//         .catch((error: unknown) => {
//           console.error(
//             "[Kurdlink Dashboard] Refresh URL list failed",
//             error
//           )
//         })
//     }

//     return true
//   }

//   return (
//     <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#050D1D] text-white">
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute left-[35%] top-[-250px] h-[500px] w-[500px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
//         <div className="absolute bottom-[-250px] right-[20%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.04] blur-[150px]" />
//       </div>
//       <Sidebar />
//       <Topbar />
//       <div className="pt-[68px] lg:pl-[215px]">
//         <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-7">
//           <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
//             <div>
//               <h1 className="text-[30px] font-black tracking-tight"> سلام {userName}</h1>
//               <p className="mt-1.5 text-[14px] text-[#8796B2]">
//                 به پنل کاربری Kurdlink خوش آمدی.
//               </p>
//             </div>
//             <div className="w-full max-w-[345px]">
//               <NewLinkButton onClick={() => setShowCreate(true)} />
//             </div>
//           </div>
//           {listError && (
//             <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
//               {listError}
//             </p>
//           )}
//           {loadingList && (
//             <p className="mt-4 text-sm text-[#8796B2]"> در حال دریافت لینک‌های شما...</p>
//           )}
//           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             <StatCard title="لینک‌های فعال" value={String(links.filter((link) => link.status === "فعال").length)}
//               growth="10%" type="active"/>
//             <StatCard title="لینک‌های امروز" value={String(links.filter( (link) => link.date === new Date().toLocaleDateString("fa-IR")).length)}
//               growth="50%" type="today"/>
//             <StatCard title="تعداد لینک‌ها" value={String(links.length)} growth="33%" type="links" />
//             <StatCard title="کل کلیک‌ها" value={links .reduce((total, link) => total + link.clicks, 0) .toLocaleString("en-US")} growth="12%" type="clicks"/>
//           </div>
//           <div className="mt-5">
//             <LinksTable links={links} onDetails={() => setShowDetails(true)}/>
//           </div>
//         </div>
//       </div>
//       <CreateLinkModal isOpen={showCreate} onClose={() => setShowCreate(false)} onLinkCreated={handleLinkCreated} />
//       <div className="relative z-20 mx-auto mt-4 grid max-w-[1250px] grid-cols-1 gap-4 px-5 pb-6 lg:pl-[215px] xl:grid-cols-3">
//         {showDetails && (
//           <LinkDetailsPanel onClose={() => setShowDetails(false)} />
//         )}
//         {showPassword && (
//           <ChangePasswordPanel onClose={() => setShowPassword(false)} />
//         )}
//       </div>
//     </main>
//   )
// }


import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import NewLinkButton from "@/components/dashboard/NewLinkButton";
import LinksTable from "@/components/dashboard/LinksTable";
import CreateLinkModal from "@/components/dashboard/CreateLinkModal";
import LinkDetailsPanel from "@/components/dashboard/LinkDetailsPanel";
import ChangePasswordPanel from "@/components/dashboard/ChangePasswordPanel";

import type { LinkItem } from "@/components/dashboard/LinksTable";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserUrls } from "@/store/slices/urlSlice";

type ApiRecord = Record<string, unknown>;

const REDIRECT_API_URL = "http://seffeh.ir/api/shorten";

function isRecord(value: unknown): value is ApiRecord {
  return (typeof value === "object" && value !== null && !Array.isArray(value));
}

function getString(record: ApiRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function getNumber(record: ApiRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return undefined;
}

function extractShortCode(value: string): string | undefined {
  const cleanValue = value.trim();
  if (!cleanValue) return undefined;

  try {
    const parsedUrl = new URL(cleanValue, `${REDIRECT_API_URL}/`);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment ? decodeURIComponent(lastSegment) : undefined;
  } catch {
    const segments = cleanValue.split(/[/?#]/).filter(Boolean);
    return segments[segments.length - 1];
  }
}

function getRedirectUrl(shortCode: string): string {
  return `${REDIRECT_API_URL}/${encodeURIComponent(shortCode)}`;
}


function getApiShortCode(data: ApiRecord): string | undefined {
  const directCode = getString(data, [
    "short_code",
    "shortCode",
    "code",
    "slug",
    "prefix",
  ]);

  if (directCode) {
    return extractShortCode(directCode);
  }

  const shortUrl = getString(data, [
    "short_url",
    "shortUrl",
    "short_link",
    "shortLink",
    "shortened_url",
    "shortenedUrl",
  ]);

  if (shortUrl) {
    return extractShortCode(shortUrl);
  }

  return undefined;
}

function getDateParts(value?: string): { date: string; time: string } {
  const parsedDate = value ? new Date(value) : new Date();
  const validDate = !Number.isNaN(parsedDate.getTime());
  const dateValue = validDate ? parsedDate : new Date();

  return {
    date: dateValue.toLocaleDateString("fa-IR"),
    time: dateValue.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function mapApiLinkToLinkItem(response: unknown): LinkItem | null {
  if (!isRecord(response)) return null;

  const data = isRecord(response.data)
    ? response.data
    : isRecord(response.result)
      ? response.result
      : response;

  const shortCode = getApiShortCode(data);

  if (!shortCode) {
    console.error("[Kurdlink] Short code not found in API response", response);
    return null;
  }

  const originalUrl = getString(data, [
    "original_url",
    "originalUrl",
    "long_url",
    "longUrl",
    "destination_url",
    "destinationUrl",
    "url",
  ]) ?? "";

  const id = getNumber(data, ["id"]) ?? Date.now();

  const clicks = getNumber(data, [
    "clicks",
    "click_count",
    "clickCount",
    "visits",
    "visit_count",
  ]) ?? 0;

  const createdAt = getString(data, [
    "created_at",
    "createdAt",
    "created",
  ]);

  const { date, time } = getDateParts(createdAt);

  const statusValue = getString(data, ["status", "state"]);

  const inactive = [
    "inactive",
    "disabled",
    "غیرفعال",
  ].includes(statusValue?.toLowerCase() ?? "");

  const redirectUrl = getRedirectUrl(shortCode);

  return {
    id,
    shortUrl: redirectUrl,
    originalUrl,
    clicks,
    status: inactive ? "غیرفعال" : "فعال",
    date,
    time,
  };
}

function extractApiRecords(response: unknown): unknown[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return [];
  }

  for (const key of ["data", "urls", "links", "results", "result"]) {
    const value = response[key];

    if (Array.isArray(value)) {
      return value;
    }

    if (isRecord(value)) {
      for (const nestedKey of ["data", "urls", "links", "results"]) {
        if (Array.isArray(value[nestedKey])) {
          return value[nestedKey] as unknown[];
        }
      }
    }
  }

  if (getApiShortCode(response) || (isRecord(response.data) && getApiShortCode(response.data))) {
    return [response];
  }

  return [];
}

function getStoredUserName(user: unknown): string {
  if (isRecord(user)) {
    const name = getString(user, [
      "full_name",
      "fullName",
      "name",
      "username",
      "first_name",
      "firstName",
    ]);

    if (name) return name;

    const email = getString(user, ["email"]);

    if (email && typeof window !== "undefined") {
      const savedName = localStorage.getItem(`kurdlink_name_${email.toLowerCase()}`);

      if (savedName?.trim()) {
        return savedName.trim();
      }
    }
  }

  if (typeof window !== "undefined") {
    const registeredName = localStorage.getItem("kurdlink_registered_name");

    if (registeredName?.trim()) {
      return registeredName.trim();
    }
  }

  return "کاربر";
}

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const apiUrls = useAppSelector((state) => state.url.userUrls);
  const loadingList = useAppSelector((state) => state.url.loadingList);

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [listError, setListError] = useState("");

  const userName = getStoredUserName(user);

  useEffect(() => {
    if (!token) {
      setLinks([]);
      return;
    }

    dispatch(fetchUserUrls({ token }))
      .unwrap()
      .then(() => {
        setListError("");
      })
      .catch((error: unknown) => {
        console.error("[Kurdlink Dashboard] Failed to load user URLs", error);
        setListError(
          typeof error === "string"
            ? error
            : "دریافت لینک‌های کاربر ناموفق بود."
        );
      });
  }, [dispatch, token]);

  useEffect(() => {
    if (apiUrls === null || apiUrls === undefined) {
      return;
    }

    const records = extractApiRecords(apiUrls);
    const mappedLinks = records
      .map(mapApiLinkToLinkItem)
      .filter((link): link is LinkItem => link !== null);

    console.info("[Kurdlink Dashboard] User URL list processed", {
      received: records.length,
      mapped: mappedLinks.length,
    });

    setLinks(mappedLinks);

    if (records.length > 0 && mappedLinks.length === 0) {
      console.error("[Kurdlink Dashboard] Could not map API records. Check response field names.");
    }
  }, [apiUrls]);

  function handleLinkCreated(apiResponse: unknown): boolean {
    const newLink = mapApiLinkToLinkItem(apiResponse);

    if (!newLink) {
      console.error("[Kurdlink Dashboard] Shorten response could not be mapped", apiResponse);
      alert("ساخت لینک انجام شد، اما کد کوتاه در پاسخ سرور پیدا نشد. ساختار پاسخ API را بررسی کنید.");
      return false;
    }

    setLinks((previousLinks) => [
      newLink,
      ...previousLinks.filter((link) => link.id !== newLink.id),
    ]);

    if (token) {
      dispatch(fetchUserUrls({ token }))
        .unwrap()
        .catch((error: unknown) => {
          console.error("[Kurdlink Dashboard] Refresh URL list failed", error);
        });
    }

    return true;
  }

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#050D1D] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[35%] top-[-250px] h-[500px] w-[500px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-250px] right-[20%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.04] blur-[150px]" />
      </div>

      <Sidebar />
      <Topbar />

      <div className="pt-[68px] lg:pl-[215px]">
        <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-[30px] font-black tracking-tight">
                سلام {userName}
              </h1>
              <p className="mt-1.5 text-[14px] text-[#8796B2]">
                به پنل کاربری Kurdlink خوش آمدی.
              </p>
            </div>

            <div className="w-full max-w-[345px]">
              <NewLinkButton onClick={() => setShowCreate(true)} />
            </div>
          </div>

          {listError && (
            <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
              {listError}
            </p>
          )}

          {loadingList && (
            <p className="mt-4 text-sm text-[#8796B2]">
              در حال دریافت لینک‌های شما...
            </p>
          )}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="لینک‌های فعال"
              value={String(links.filter((link) => link.status === "فعال").length)}
              growth="10%"
              type="active"
            />

            <StatCard
              title="لینک‌های امروز"
              value={String(links.filter((link) => link.date === new Date().toLocaleDateString("fa-IR")).length)}
              growth="50%"
              type="today"
            />

            <StatCard
              title="تعداد لینک‌ها"
              value={String(links.length)}
              growth="33%"
              type="links"
            />

            <StatCard
              title="کل کلیک‌ها"
              value={links.reduce((total, link) => total + link.clicks, 0).toLocaleString("en-US")}
              growth="12%"
              type="clicks"
            />
          </div>

          <div className="mt-5">
            <LinksTable
              links={links}
              onDetails={() => setShowDetails(true)}
            />
          </div>
        </div>
      </div>

      <CreateLinkModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onLinkCreated={handleLinkCreated}
      />

      <div className="relative z-20 mx-auto mt-4 grid max-w-[1250px] grid-cols-1 gap-4 px-5 pb-6 lg:pl-[215px] xl:grid-cols-3">
        {showDetails && (
          <LinkDetailsPanel onClose={() => setShowDetails(false)} />
        )}

        {showPassword && (
          <ChangePasswordPanel onClose={() => setShowPassword(false)} />
        )}
      </div>
    </main>
  );
}
