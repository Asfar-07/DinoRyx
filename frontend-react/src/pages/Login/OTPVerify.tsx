import { useEffect, useState } from "react";
import { Shield, Lock, X } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpVerifyModalProps {
  email: string;
  onClose: () => void;
  onVerify?: (code: string) => void;
  onChangeEmail?: () => void;
  resendOtp?: (time: number) => void;
}

export default function OTPVerify({ email, onClose = () => { },
  onVerify = () => { }, onChangeEmail = () => { }, resendOtp = () => { } }: OtpVerifyModalProps) {
  const length = 5;
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(60 * 2);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const isComplete = code.length === length;

  const slotClass =
    "h-14 w-14 rounded-xl border border-[#7be6df40] bg-[#ffffff08] text-lg font-semibold text-[#f0f4f8] " +
    "data-[active=true]:border-(--symbol-color) data-[active=true]:shadow-[0_0_0_3px_#7be6df26] " +
    "transition max-md:h-12 max-md:w-12 max-md:text-base focus:outline-none focus:ring-0";

  return (
    <div className="glass-strong-nav fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[#7be6df33] bg-(--primary-bg-color) shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-(--secondary-text-color) transition hover:bg-white/5 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">

          {/* left — form */}
          <div className="flex flex-col gap-6 p-8 md:p-10">
            <div className="relative w-fit">
              <div className="flex h-16 w-16 items-center justify-center rounded-full">
                <Shield fontWeight={100} className="size-[90%] font-extralight text-[#38d9c4]" />
              </div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center">
                <Lock className="size-[90%] font-extralight text-[#c8fff8]" />
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[70%] rounded-full blur-[20px] bg-[#38d9c4]">
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold text-(--primary-text-color)">Verify Your Email</h2>
              <p className="text-sm leading-relaxed text-(--secondary-text-color)">
                We've sent a 6-digit OTP to
                <br />
                <span className="font-semibold text-(--symbol-color)">{email}</span>
              </p>
            </div>

            <div className="border-t border-dashed border-[#bac7cc26]" />

            <InputOTP maxLength={length} value={code} onChange={setCode}>
              <InputOTPGroup className="gap-3 max-md:ga-1">
                {Array.from({ length }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} className={slotClass} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <p className="text-sm text-(--secondary-text-color)">
              Didn't receive the code?{" "}
              {seconds > 0 ? (
                <span>
                  {seconds > 60 ? (
                    <button onClick={() => { resendOtp(seconds);}} className="font-semibold cursor-pointer cursor-pointer text-(--symbol-color) hover:underline">
                        Resend OTP
                    </button>
                  ) :
                    (
                      <button onClick={() => { resendOtp(seconds); setSeconds(60 * 2) }} className="font-semibold cursor-pointer cursor-pointer text-(--symbol-color) hover:underline">
                        Resend OTP
                      </button>
                    )
                  }
                  <span className="font-semibold text-(--symbol-color)"> :- {mm}:{ss}</span>
                </span>
              ) : (
                <button onClick={() => { resendOtp(seconds); setSeconds(60 * 2) }} className="font-semibold cursor-pointer cursor-pointer text-(--symbol-color) hover:underline">
                  Resend OTP
                </button>
              )}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => isComplete && onVerify(code)}
                disabled={!isComplete}
                className="h-12 cursor-pointer flex-1 rounded-xl bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-sm font-bold text-[#082a28] transition
                  disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:brightness-105"
              >
                Verify OTP
              </button>
              <div className="flex flex-col items-center gap-2 text-xs text-(--secondary-text-color)">
                <span className="h-3 w-px bg-(--secondary-bg-color)" />
                <span>or</span>
                <span className="h-3 w-px bg-(--secondary-bg-color)" />
              </div>
              <button
                onClick={onChangeEmail}
                className="whitespace-nowrap cursor-pointer text-sm font-semibold text-(--symbol-color) hover:underline"
              >
                Change Email
              </button>
            </div>
          </div>

          {/* right — mascot */}
          <div className="hidden items-end justify-center bg-(--secondary-bg-color) p-6 md:flex">
            <div className="max-w-80 max-h-90 w-full h-3/4">
              <img src="/images/DinoSecurity.webp" className="size-full" alt="security dino" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}