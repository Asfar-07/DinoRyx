import React from 'react'
import { Check } from "lucide-react";

type Source = "google" | "friends" | "instagram" | "other_social";
type Role = "trainer" | "student" | "gym_owner";

interface Roles {
    id: Role;
    icon: React.ElementType;
    title: string;
    description: string;
}

export default function NormalQuestions({ step, sourceOptions, source, setSource, roles, role, setRole}:
    { step: number, sourceOptions: { id: Source, icon: React.ElementType, title: string }[], source: Source | null, setSource: (source: Source) => void,
     roles: Roles[], role: Role | null, setRole: (role: Role) => void }) {
    return (
        <div>
            {step === 1 && (
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Where did you hear about DinoRyx?
                    </h1>
                    <p className="mt-2 text-[#bac7cc]">
                        This helps us understand what brought you here.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {sourceOptions.map(({ id, icon: Icon, title }) => {
                            const selected = source === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setSource(id)}
                                    className={`relative flex items-center gap-4 rounded-4xl px-5 py-6 text-left ring-1 transition-all ${selected
                                        ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187)] ring-(--symbol-color)"
                                        : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                                        }`}
                                >
                                    {selected && (
                                        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                    )}
                                    <span
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected
                                            ? "bg-(--symbol-color) text-[#0a0f22]"
                                            : "glass-strong-nav text-[#bac7cc]"
                                            }`}
                                    >
                                        <Icon className="h-4.5 w-4.5" />
                                    </span>
                                    <p className="font-bold text-[#f0f4f8]">{title}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Who are you training as?
                    </h1>
                    <p className="mt-2 text-[#bac7cc]">
                        We&apos;ll tailor your dashboard around this.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {roles.map(({ id, icon: Icon, title, description }) => {
                            const selected = role === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setRole(id)}
                                    className={`relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition-all ${selected
                                            ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                                            : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                                        }`}
                                >
                                    {selected && (
                                        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                    )}
                                    <Icon
                                        className={`h-6 w-6 ${selected ? "text-[#56b2bb]" : "text-[#bac7cc]"
                                            }`}
                                    />
                                    <div>
                                        <p className="font-bold text-[#f0f4f8]">{title}</p>
                                        <p className="mt-0.5 text-sm text-[#bac7cc]">
                                            {description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
