import { Check } from "lucide-react";
import { MapPin, Bell } from "lucide-react"
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type { StudentQuestions } from '../Onboarding.types';

export default function StudentQuestions({ role, step, goalOptions, goals, toggleGoal, days, selectedDays, toggleDay,
  city, setCity, remindersOn, setRemindersOn, communityStudentOptions, community, setCommunity }:
  StudentQuestions) {
  return (
    <div>
      {/* user goal for student */}
      {step === 3 && role === "student" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What are your main goals?
          </h1>
          <p className="mt-2 text-[#bac7cc]">Pick as many as you like.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {goalOptions.map(({ id, icon: Icon, label }) => {
              const selected = goals.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleGoal(id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition-colors ${selected
                    ? "bg-[#56b2bb]/15 text-(--symbol-color) ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 text-[#f0f4f8] ring-white/10 cursor-pointer"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-[#bac7cc]">
            {goals.length} selected — you can change these anytime in
            settings.
          </p>
        </div>
      )}

      {/* user schedule for student */}
      {step === 4 && role === "student" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            When do you train?
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Pick your usual days and where you are.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {days.map((day) => {
              const selected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold ring-1 transition-colors ${selected
                    ? "bg-(--symbol-color) text-[#0a0f22] ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 text-[#f0f4f8] ring-white/10 cursor-pointer"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#f0f4f8]">
                <MapPin className="h-4 w-4 text-(--symbol-color)" />
                Your city
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#1a2136] px-5 ring-1 ring-white/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-[#f0f4f8]">
                <Bell className="h-4 w-4 text-(--symbol-color)" />
                Workout reminders
              </span>
              <Switch
                checked={remindersOn}
                onCheckedChange={setRemindersOn}
                className="data-[state=checked]:bg-(--symbol-color)"
              />
            </div>
          </div>
        </div>
      )}

      {/* user community for student */}
      {step === 5 && role === "student" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Do you want to help build a strong fitness community?
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Join fellow trainers, students and gym owners shaping the
            future of fitness.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {communityStudentOptions.map(({ id, title, description }) => {
              const selected = community === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCommunity(id)}
                  className={`relative flex flex-col items-start gap-1 rounded-2xl p-5 text-left ring-1 transition-all ${selected
                    ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                    }`}
                >
                  {selected && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <p className="font-bold text-[#f0f4f8]">{title}</p>
                  <p className="mt-0.5 text-sm text-[#bac7cc]">
                    {description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  )
}
