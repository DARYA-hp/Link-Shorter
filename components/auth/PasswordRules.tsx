interface PasswordRulesProps {
  password: string;
}

export default function PasswordRules({ password,}: PasswordRulesProps) {
  const minLength = password.length >= 8;
  const hasLetters = /[A-Za-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const lettersAndNumbers = hasLetters && hasNumbers;

  return (
    <div className=" rounded-[15px] border border-[#172e59] bg-[#09152f] px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className=" flex h-8 w-8 items-center justify-center rounded-lg bg-[#173269] text-[#5c7dff]">
            <ShieldIcon />
          </div>
          <span className="text-[14px] font-medium text-[#dce4fa]">
            رمز عبور باید شامل:
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-3 pr-11">
        <PasswordRule valid={minLength} text="حداقل ۸ کاراکتر باشد"/>
        <PasswordRule valid={lettersAndNumbers} text="ترکیبی از حروف و اعداد باشد"/>
      </div>
    </div>
  )
}

function PasswordRule({ valid, text,}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={` flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-all
          ${
            valid
              ? "text-[#42d5b0]"
              : "text-[#52617f]"
          }
        `}>
        ✓
      </span>
      <span className={` text-[13px]
          ${
            valid
              ? "text-[#a8b6d4]"
              : "text-[#667594]"
          } `}>
        {text}
      </span>
    </div>
  )
}

function ShieldIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}