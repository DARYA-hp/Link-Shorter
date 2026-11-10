import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (!url.trim()) return;
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("kurdlink.ir/go/abc123");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#090F22] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[48%] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute right-[-180px] top-[550px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[160px]" />
        <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />
      </div>

      <header className="relative z-50 border-b border-white/[0.05]">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-blue-600/20 blur-md transition group-hover:bg-blue-500/30" />
              <svg className="relative h-8 w-8 text-blue-500" viewBox="0 0 32 32" fill="none">
                <path d="M12.2 19.8L19.8 12.2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M10.2 22.8L7.7 25.3C5.7 27.3 2.4 27.3.4 25.3C-1.6 23.3-1.6 20 .4 18l5.1-5.1c2-2 5.3-2 7.3 0" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" transform="translate(4 -6)" />
                <path d="M19.8 9.2l2.5-2.5c2-2 5.3-2 7.3 0 2 2 2 5.3 0 7.3l-5.1 5.1c-2 2-5.3 2-7.3 0" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" transform="translate(-4 6)" />
              </svg>
            </div>
            <span className="text-[22px] font-extrabold tracking-tight">
              Kurd<span className="text-blue-500">link</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <button className="hidden px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block">
              <Link href="/login">ورود</Link>
            </button>
            <button className="rounded-xl bg-gradient-to-l from-[#5267FF] to-[#4157E8] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30">
              <Link href="/register">ثبت‌نام</Link>
            </button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-2 lg:gap-4 lg:pb-28 lg:pt-20">
          <div className="relative z-20 text-center lg:text-right">
            <h1 className="mx-auto max-w-[650px] text-[42px] font-black leading-[1.45] tracking-tight sm:text-[52px] lg:mx-0 lg:text-[62px]">
              لینک‌های طولانی<br />
              <span className="text-white">
                رو{" "}
                <span className="relative inline-block text-[#5268FF]">
                  کوتاه
                  <span className="absolute -bottom-1 left-0 right-0 h-[5px] rounded-full bg-[#5268FF]/30 blur-sm" />
                </span>{" "}
                کن.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-[590px] text-[15px] leading-8 text-slate-400 sm:text-[17px] lg:mx-0">
              با Kurdlink لینک‌های طولانی خودت رو به لینک‌های کوتاه
              و قابل مدیریت تبدیل کن و آمار کلیک‌ها رو ببین.
            </p>

            <div className="mt-9">
              <button
                onClick={() => {
                  document.getElementById("shortener")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-l from-[#5268FF] to-[#4058EA] px-8 py-4 text-[15px] font-bold shadow-[0_10px_40px_rgba(70,90,255,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(70,90,255,0.35)]"
              >
                شروع کنید
                <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-7 text-sm text-slate-400 lg:justify-start">
              <TrustItem text="لینک کوتاه" />
              <TrustItem text="آمار کلیک" />
              <TrustItem text="امن" />
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[450px] w-full max-w-[610px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute h-[310px] w-[310px] rounded-full bg-blue-600/20 blur-[110px]" />
            <div className="relative w-full max-w-[530px]">
              <div className="relative rotate-[-7deg] rounded-[24px] border border-blue-400/20 bg-[#101A36] p-[8px] shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
                <div className="flex h-10 items-center gap-2 px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#46567E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#46567E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#46567E]" />
                </div>

                <div className="rounded-[17px] border border-white/[0.08] bg-[#172344] px-5 py-5 shadow-inner">
                  <div dir="ltr" className="truncate text-left text-[13px] text-slate-400">
                    https://very-long-link-example.com/...
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-[18px] border border-blue-300/20 bg-gradient-to-r from-[#273FBA] to-[#3048D7] p-4 shadow-[0_10px_40px_rgba(47,72,215,0.35)]">
                  <div dir="ltr" className="flex-1 truncate text-left text-sm font-medium text-white">
                    kurdlink.ir/go/abc123
                  </div>
                  <button onClick={handleCopy} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20" aria-label="copy">
                    {copied ? (
                      <svg className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-14 left-[8%] rotate-[8deg]">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <path d="M15 15C20 52 43 73 77 72" stroke="#5369FF" strokeWidth="5" strokeLinecap="round" />
                  <path d="M65 60L80 73L64 83" stroke="#5369FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="absolute -bottom-20 -left-2 w-[245px] rounded-2xl border border-blue-400/20 bg-[#111B38]/95 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20">
                    <div className="flex h-8 w-8 items-end justify-center gap-[3px] rounded-full bg-[#2945B8] p-2">
                      <span className="h-2 w-1.5 rounded-sm bg-white" />
                      <span className="h-4 w-1.5 rounded-sm bg-white" />
                      <span className="h-5 w-1.5 rounded-sm bg-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">1,248</p>
                    <p className="text-[11px] text-slate-500">Total Clicks</p>
                  </div>
                  <svg className="mr-auto h-12 w-20" viewBox="0 0 100 50" fill="none">
                    <path d="M2 42C13 40 15 30 24 34C34 38 38 17 49 22C61 27 64 5 73 11C82 17 88 8 98 2" stroke="#7457FF" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shortener" className="border-y border-white/[0.05] bg-[#0B1229]/60 py-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-[24px] border border-blue-400/10 bg-[#101A35] p-3 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-3 md:flex-row">
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="لینک طولانی خود را وارد کنید..." className="h-14 flex-1 rounded-2xl border border-white/[0.06] bg-[#0B1228] px-5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/40" />
              <button onClick={handleShorten} className="h-14 rounded-2xl bg-gradient-to-l from-[#5268FF] to-[#4058EA] px-8 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
                کوتاه کردن لینک
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-[1280px] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon="bolt" title="لینک کوتاه" text="لینک‌های طولانی خودت رو به لینک‌های کوتاه و ساده تبدیل کن." type="purple" />
          <FeatureCard icon="chart" title="آمار کلیک" text="تعداد کلیک‌های لینک‌های خودت رو در داشبورد مشاهده کن." type="blue" />
          <FeatureCard icon="shield" title="مدیریت ساده" text="لینک‌های خودت رو از یک داشبورد ساده مدیریت و کنترل کن." type="green" />
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#080F22]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div className="relative order-2 lg:order-1">
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -bottom-2 -left-5 hidden sm:block">
                <div className="h-20 w-20 rounded-t-full bg-[#243A55]" />
                <div className="absolute -left-8 bottom-10 h-20 w-12 rotate-[-35deg] rounded-[100%_0] bg-blue-900/70" />
                <div className="absolute -left-2 bottom-20 h-24 w-12 rotate-[-55deg] rounded-[100%_0] bg-blue-700/50" />
              </div>

              <div className="relative">
                <div className="rounded-[22px] border-[7px] border-[#27385F] bg-[#0B1229] p-3 shadow-[0_35px_70px_rgba(0,0,0,0.55)]">
                  <div className="overflow-hidden rounded-xl border border-blue-500/10 bg-[#111A35]">
                    <div className="flex h-[45px] items-center justify-between border-b border-white/5 px-4">
                      <span className="text-[9px] font-bold">
                        Kurd<span className="text-blue-500">link</span>
                      </span>
                      <div className="h-2 w-20 rounded-full bg-white/5" />
                    </div>

                    <div className="flex min-h-[245px]">
                      <aside className="hidden w-[105px] border-l border-white/5 bg-[#0D1630] p-3 sm:block">
                        <div className="mb-5 h-6 rounded-md bg-[#4A5DFF]" />
                        <div className="space-y-3">
                          <div className="h-2 w-14 rounded-full bg-white/10" />
                          <div className="h-2 w-11 rounded-full bg-white/10" />
                          <div className="h-2 w-16 rounded-full bg-white/10" />
                          <div className="h-2 w-10 rounded-full bg-white/10" />
                        </div>
                      </aside>

                      <div className="flex-1 p-5">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold">My Links</div>
                            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/5" />
                          </div>
                          <div className="h-7 w-20 rounded-lg bg-[#4A5DFF]" />
                        </div>

                        <div className="space-y-3">
                          <DashboardRow link="kurdlink.ir/go/abc123" clicks="1,248" />
                          <DashboardRow link="kurdlink.ir/go/7T9Kx" clicks="856" />
                          <DashboardRow link="kurdlink.ir/go/3mnq" clicks="432" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto h-3 w-[92%] rounded-b-full bg-gradient-to-b from-[#425A8D] to-[#172441]" />
                <div className="mx-auto h-1 w-[35%] rounded-full bg-[#516894]" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-bold text-[#5268FF]">درباره Kurdlink</span>
            <h2 className="mt-4 text-3xl font-black leading-[1.5] sm:text-4xl">
              همه چیز ساده نگه داشته شده.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-400">
              Kurdlink یک سرویس ساده برای کوتاه کردن و مدیریت لینک‌هاست.
              بدون پیچیدگی اضافه، لینک بساز، مدیریت کن و آمارش رو ببین.
            </p>

            <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#111827] transition hover:-translate-y-0.5 hover:bg-slate-100">
              ساخت حساب
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span className="font-bold">
              Kurd<span className="text-blue-500">link</span>
            </span>
          </div>

          <p className="text-xs text-slate-600">© 2025 Kurdlink</p>
          <p className="text-xs text-slate-500">ساده و کوتاه.</p>
        </div>
      </footer>
    </main>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-[11px] text-blue-400">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({
  title,
  text,
  icon,
  type,
}: {
  title: string;
  text: string;
  icon: "bolt" | "chart" | "shield";
  type: "purple" | "blue" | "green";
}) {
  const styles = {
    purple: {
      box: "bg-[#6655F4]",
      glow: "group-hover:shadow-[0_20px_50px_rgba(102,85,244,0.12)]",
    },
    blue: {
      box: "bg-[#1670E8]",
      glow: "group-hover:shadow-[0_20px_50px_rgba(22,112,232,0.12)]",
    },
    green: {
      box: "bg-[#16B69B]",
      glow: "group-hover:shadow-[0_20px_50px_rgba(22,182,155,0.10)]",
    },
  };

  return (
    <div className={`group rounded-[20px] border border-blue-200/[0.08] bg-[#101A35] p-7 transition duration-300 hover:-translate-y-1 ${styles[type].glow}`}>
      <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-full ${styles[type].box} shadow-lg`}>
        {icon === "bolt" && (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}

        {icon === "chart" && (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16v-5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v-8" />
          </svg>
        )}

        {icon === "shield" && (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
        )}
      </div>

      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mt-3 text-sm leading-8 text-slate-400">{text}</p>
    </div>
  );
}

function DashboardRow({
  link,
  clicks,
}: {
  link: string;
  clicks: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#0D1630] px-3 py-3">
      <div className="min-w-0">
        <div dir="ltr" className="truncate text-[8px] text-slate-300 sm:text-[9px]">
          {link}
        </div>
      </div>

      <div className="mr-3 flex shrink-0 items-center gap-3">
        <span className="text-[8px] text-slate-400">{clicks}</span>
        <span className="rounded bg-emerald-500/10 px-2 py-1 text-[7px] text-emerald-400">
          Active
        </span>
      </div>
      <p> fahren sie </p>
    </div>
  )
}
