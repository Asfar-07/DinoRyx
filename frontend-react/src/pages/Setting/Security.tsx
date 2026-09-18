import { ShieldCheck } from "lucide-react";
import { SectionCard } from "./SettingsShared";
import type { ReactElement } from "react";

export default function Security(): ReactElement {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <SectionCard
        icon={<ShieldCheck size={18} />}
        title="Login & Security"
        description="Manage your password and login security"
      >
        <p className="text-sm text-[#bac7cc]">Login & security settings go here.</p>
      </SectionCard>
    </div>
  );
}
