import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginTest() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f22] text-[#f0f4f8]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-6 md:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d2233] ring-1 ring-[#56b2bb]/30">
            <span className="h-3.5 w-3.5 rounded-full bg-[#56b2bb]" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Dino<span className="text-[#56b2bb]">Ryx</span>
          </span>
        </a>

        <a
          href="#home"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[#f0f4f8] transition-colors hover:bg-[#1d2233]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>
      </header>

      {/* Card */}
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-6 md:px-10">
        <div className="grid overflow-hidden rounded-3xl bg-[#131a2e] ring-1 ring-white/5 md:grid-cols-2">
          {/* Left panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#16243a] to-[#0f1626] p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/10 blur-[100px]"
            />

            <div className="relative">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                WELCOME <span className="text-[#56b2bb]">BACK</span>
              </h1>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#bac7cc]">
                Welcome back! Please enter your details to continue
                training.
              </p>
            </div>

            <img
              src="/images/DinoHome.webp"
              alt="DinoRyx mascot"
              className="relative z-10 mx-auto h-64 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:h-72"
            />

            <Button className="relative z-10 h-12 w-fit rounded-full bg-[#56b2bb] px-8 font-semibold text-[#0a0f22] hover:bg-[#56b2bb]/90">
              Sign In
            </Button>
          </div>

          {/* Right panel */}
          <div className="flex flex-col justify-center p-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Log In
            </h2>
            <p className="mt-3 text-sm text-[#bac7cc]">
              New to DinoRyx?{" "}
              <a
                href="#signup"
                className="font-semibold text-[#56b2bb] underline underline-offset-2 hover:text-[#56b2bb]/80"
              >
                Create an account
              </a>
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-[#1a2136] pl-10 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-[#1a2136] pl-10 pr-10 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bac7cc] hover:text-[#f0f4f8]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#bac7cc]">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(v === true)}
                    className="border-white/20 data-[state=checked]:border-[#56b2bb] data-[state=checked]:bg-[#56b2bb] data-[state=checked]:text-[#0a0f22]"
                  />
                  Remember me
                </label>

                <a
                  href="#forgot-password"
                  className="text-sm font-medium text-[#56b2bb] underline underline-offset-2 hover:text-[#56b2bb]/80"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="h-12 rounded-xl bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] font-semibold text-[#0a0f22] hover:opacity-90"
              >
                Log In
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-[#bac7cc]">Or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 rounded-xl border-white/10 bg-transparent font-medium text-[#f0f4f8] hover:bg-[#1a2136] hover:text-[#f0f4f8]"
              >
                <GoogleIcon className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 rounded-xl border-white/10 bg-transparent font-medium text-[#f0f4f8] hover:bg-[#1a2136] hover:text-[#f0f4f8]"
              >
                <AppleIcon className="h-4 w-4" />
                Apple
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-[#bac7cc]">
              Don&apos;t have an account?{" "}
              <a
                href="#signup"
                className="font-semibold text-[#56b2bb] underline underline-offset-2 hover:text-[#56b2bb]/80"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.74Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.36 1.2c.1 1-.28 2-.85 2.72-.6.75-1.6 1.35-2.57 1.27-.12-.98.35-2.02.9-2.66.62-.72 1.68-1.28 2.52-1.33ZM20.9 17.3c-.5 1.14-.74 1.65-1.38 2.66-.9 1.4-2.16 3.15-3.73 3.16-1.39.02-1.75-.9-3.64-.9-1.88 0-2.29.88-3.68.92-1.56.05-2.75-1.5-3.65-2.9-2.5-3.86-2.77-8.39-1.22-10.8 1.1-1.72 2.83-2.73 4.46-2.73 1.66 0 2.7.92 4.08.92 1.33 0 2.15-.92 4.08-.92 1.45 0 2.98.79 4.07 2.16-3.58 1.96-3 7.06.61 8.43Z" />
    </svg>
  );
}