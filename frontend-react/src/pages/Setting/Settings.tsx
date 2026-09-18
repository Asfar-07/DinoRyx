import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { Search, Bell, ChevronDown, Settings as SettingsIcon, Database, ShieldCheck, Lock } from "lucide-react";
import General from "./General";
import Account from "./Account";
import Security from "./Security";
import Privacy from "./Privacy";
import { LogOut } from "lucide-react";

type NavKey = "general" | "account" | "security" | "privacy";

interface NavItem {
  key: NavKey;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "general", label: "General", icon: <SettingsIcon size={16} /> },
  { key: "account", label: "Account & Data", icon: <Database size={16} /> },
  { key: "security", label: "Login & Security", icon: <ShieldCheck size={16} /> },
  { key: "privacy", label: "Privacy", icon: <Lock size={16} /> },
];

const PANELS: Record<NavKey, ReactNode> = {
  general: <General />,
  account: <Account />,
  security: <Security />,
  privacy: <Privacy />,
};

export interface SettingsPageProps {
  userName?: string;
  userRole?: string;
  userAvatarSrc?: string;
}

export default function Settings({
  userName = "Asfar Muhammed",
  userRole = "Gym Enthusiast",
  userAvatarSrc,
}: SettingsPageProps): ReactElement {
  const [activeNav, setActiveNav] = useState<NavKey>("general");

  return (
    <div className="min-h-screen w-full bg-[#0a0f22] text-[#f0f4f8]">
      {/* Top navbar */}
      <header className="flex items-center gap-4 border-b border-[#ffffff0d] px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7be6df40] bg-[#7be6df14] text-lg">
            🦖
          </div>
          <span className="text-lg font-extrabold">
            Dino<span className="text-[#7be6df]">Ryx</span>
          </span>
        </div>

        <div className="mx-auto hidden max-w-md flex-1 items-center gap-2 rounded-full border border-[#ffffff14] bg-[#ffffff05] px-4 py-2.5 md:flex">
          <Search size={16} className="text-[#bac7cc]" />
          <input
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm text-[#f0f4f8] outline-none placeholder:text-[#bac7cc]"
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#ffffff14] text-[#bac7cc] hover:text-[#f0f4f8]"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#38d9c4]" />
          </button>

          <div className="flex items-center gap-2">
            {userAvatarSrc ? (
              <img src={userAvatarSrc} alt={userName} className="h-9 w-9 rounded-full border border-[#7be6df40] object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7be6df40] bg-[#7be6df14] text-sm">
                🦄
              </div>
            )}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-tight">{userName}</p>
              <p className="text-xs leading-tight text-[#bac7cc]">{userRole}</p>
            </div>
            <ChevronDown size={14} className="text-[#bac7cc]" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        {/* page title */}
        <div className="mb-6 flex items-center gap-3">
          <SettingsIcon size={22} className="text-[#7be6df]" />
          <div>
            <h1 className="text-2xl font-extrabold">Settings</h1>
            <p className="text-sm text-[#bac7cc]">Manage your app preferences and account settings</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* sidebar */}
          <nav className="flex flex-col gap-30">
            <div className="flex flex-row gap-2 overflow-x-auto md:w-64 md:shrink-0 md:flex-col md:overflow-visible">
              {NAV_ITEMS.map((item) => {
                const active = item.key === activeNav;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={`flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition md:rounded-xl ${active
                        ? "bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-[#082a28]"
                        : "text-[#bac7cc] hover:bg-[#ffffff08] hover:text-[#f0f4f8]"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full px-4
             py-2.5 text-sm font-semibold transition md:rounded-xl hover:bg-gradient-to-r from-[#ff0a0f] to-[#ee0000] hover:text-[#082a28]">
              <LogOut /> Log out
            </div>
          </nav>

          {/* content */}
          <main className="flex flex-1 flex-col gap-6">{PANELS[activeNav]}</main>
        </div>
      </div>
    </div>
  );
}
