export default function AuthLogo() {
  return (
    <div className="flex items-center justify-center gap-3" dir="ltr">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#5268ff]/20 blur-xl" />
        <svg className="relative h-11 w-11 text-[#5368ff]" viewBox="0 0 32 32" fill="none" aria-hidden="true" >
          <path d="M12.2 19.8L19.8 12.2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M10.2 22.8L7.7 25.3C5.7 27.3 2.4 27.3.4 25.3C-1.6 23.3-1.6 20 .4 18l5.1-5.1c2-2 5.3-2 7.3 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" transform="translate(4 -6)"/>
          <path d="M19.8 9.2l2.5-2.5c2-2 5.3-2 7.3 0 2 2 2 5.3 0 7.3l-5.1 5.1c-2 2-5.3 2-7.3 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" transform="translate(-4 6)"/>
        </svg>
      </div>
      <span className="text-[30px] font-extrabold tracking-[-1px] text-white">
        Kurd<span className="text-[#5368ff]">link</span>
      </span>
    </div>
  )
}
