import { Lock } from "lucide-react";
import { SectionCard } from "./SettingsShared";
import type { ReactElement } from "react";

export default function Privacy(): ReactElement {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <SectionCard
        icon={<Lock size={18} />}
        title="Privacy"
        description="Control your privacy and visibility preferences"
      >
        <p className="text-sm text-[#bac7cc]">Privacy settings go here.</p>
      </SectionCard>
    </div>
  );
}
