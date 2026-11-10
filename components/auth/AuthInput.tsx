import { ReactNode } from "react";

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  dir?: "rtl" | "ltr";
  error?: string;
  onBlur?: () => void;
  name?: string;
}

export default function AuthInput({ label, type = "text", value , placeholder , onChange, icon, dir = "rtl", error, onBlur, name,}: AuthInputProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      <div className={`relative flex h-[64px] items-center rounded-[15px] border bg-[#0c1833] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-all duration-200 focus-within:bg-[#0e1b39] focus-within:shadow-[0_0_0_3px_rgba(74,99,220,0.08)] ${
          error
            ? "border-red-500 focus-within:border-red-500"
            : "border-[#1d3765] focus-within:border-[#4966d8]"
        }`}>
        <div className="pointer-events-none absolute left-5 flex h-7 w-7 items-center justify-center text-[#8194c7]">
          {icon}
        </div>
        <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} placeholder={placeholder}
          dir={dir} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}
          className="h-full w-full rounded-[15px] bg-transparent px-5 pl-14 text-[15px] text-white outline-none placeholder:text-[#8090b5]"/>
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 px-1 text-right text-xs leading-5 text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}