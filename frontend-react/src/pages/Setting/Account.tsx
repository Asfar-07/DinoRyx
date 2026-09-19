import { Trash } from "lucide-react";
import type { ReactElement } from "react";
import { CiWarning } from "react-icons/ci";

export default function Account(): ReactElement {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134e4a] via-[#0f766e] to-[#7be6df] p-8">
        <h2 className="text-2xl font-extrabold text-white">Account Settings</h2>
        <p className="mt-1 text-sm text-white/80">Account & data settings go here.</p>
      </div>
      
      {/* real SectionCard */}
      <div className="flex flex-col gap-4 gap-2 rounded-2xl border border-[#ffffff10] bg-[#ffffff05] p-6 ">
        <div className="flex flex-col gap-5 md:flex-row md:gap-8">
          <div className="flex flex-2 items-start gap-3 md:w-64 md:shrink-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7be6df33] bg-[#7be6df14] text-[#7be6df]">
              <Trash size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#f0f4f8]">Account & Data</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#bac7cc]">Permanently remove your account and all associated data</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full flex justify-end">
              <button className="flex items-center cursor-pointer gap-3 text-sm text-red-400 rounded-2xl border border-red-600 bg-red-600/20
               px-7 py-1.5 hover:scale-[1.05] delay-200"><Trash size={16} />Delete</button>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-3 py-2 px-2 text-red-400 rounded-[8px] border border-red-600/50 bg-red-600/20">
        <CiWarning size={20}/>
        <p className="mt-0.5 text-xs leading-relaxed text-red-400">Permanently remove your account and all associated data</p>
        </div>
      </div>

    </div>
  );
}
