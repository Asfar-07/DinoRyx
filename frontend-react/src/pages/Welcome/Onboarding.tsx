import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Dumbbell,
  Users,
  Building2,
  Flame,
  Timer,
  HeartPulse,
  Trophy,
  Target,
  MapPin,
  Bell,
  CalendarDays,
  Sparkles,
  Search,
  Heart,
} from "lucide-react";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

import { handleSurvey } from "@/features/survey/surveyService";


type Role = "trainer" | "student" | "gym_owner";

const roles: {
  id: Role;
  icon: React.ElementType;
  title: string;
  description: string;
}[] = [
  {
    id: "trainer",
    icon: Dumbbell,
    title: "Trainer",
    description: "Manage students, plans & billing",
  },
  {
    id: "student",
    icon: Users,
    title: "Student",
    description: "Track progress & find gyms",
  },
  {
    id: "gym_owner",
    icon: Building2,
    title: "Gym Owner",
    description: "Run your gym & team at scale",
  },
];

const goalOptions: { id: string; icon: React.ElementType; label: string }[] =
  [
    { id: "build_strength", icon: Dumbbell, label: "Build Strength" },
    { id: "fat_loss", icon: Flame, label: "Fat Loss" },
    { id: "endurance", icon: Timer, label: "Endurance" },
    { id: "general_health", icon: HeartPulse, label: "General Health" },
    { id: "competition_prep", icon: Trophy, label: "Competition Prep" },
    { id: "consistency", icon: Target, label: "Consistency" },
  ];

const experienceLevels = [
  { level: 1, label: "Beginner" },
  { level: 2, label: "Intermediate" },
  { level: 3, label: "Advanced" },
  { level: 4, label: "Elite" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Where did you hear about DinoRyx?
type Source = "google" | "friends" | "instagram" | "other_social";

const sourceOptions: {
  id: Source;
  icon: React.ElementType;
  title: string;
}[] = [
  { id: "google", icon: Search, title: "Google" },
  { id: "friends", icon: Search, title: "Friends" },
  { id: "instagram", icon: Search, title: "Instagram" },
  { id: "other_social", icon: Search, title: "Another social media" },
];

// Do you want to help build a strong fitness community?
type Community = "yes" | "later";

const communityStudentOptions: {
  id: Community;
  title: string;
  description: string;
}[] = [
  {
    id: "yes",
    title: "Yes, I'm in!",
    description: "Count me in for updates & feedback",
  },
  {
    id: "later",
    title: "Maybe later",
    description: "I'll decide another time",
  },
];

const communityTrainerOptions: {
  id: Community;
  title: string;
  description: string;
}[] = [
  {
    id: "yes",
    title: "Yes, Let's go",
    description: "Count me in for updates & feedback",
  },
  {
    id: "later",
    title: "Not yet",
    description: "I'll decide another time",
  },
];

const TOTAL_STEPS = 6;

//helper functions

function roleLabel(role: Role | null) {
  return roles.find((r) => r.id === role)?.title ?? "Not set";
}

function experienceLabel(level: number) {
  return experienceLevels.find((e) => e.level === level)?.label ?? "Not set";
}

function sourceLabel(source: Source | null) {
  return sourceOptions.find((s) => s.id === source)?.title ?? "Not set";
}

function communityLabel(community: Community | null) {
  return communityStudentOptions.find((c) => c.id === community)?.title ?? "Not set";
}

//last step summary card component

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function SummaryCard({ icon: Icon, label, value }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-[#1a2136] p-4 ring-1 ring-white/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/15 text-[#56b2bb]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-[#bac7cc]">{label}</p>
        <p className="truncate font-bold text-[#f0f4f8]">{value}</p>
      </div>
    </div>
  );
}

//main component
export default function DinoRyxOnboarding() {
  const [step, setStep] = React.useState(1);
  const [finished, setFinished] = React.useState(false);

  const [source, setSource] = React.useState<Source | null>("friends");
  const [role, setRole] = React.useState<Role | null>("student");
  const [goals, setGoals] = React.useState<string[]>(["fat_loss", "endurance"]);
  const [experience, setExperience] = React.useState(2);
  const [sessionsPerWeek, setSessionsPerWeek] = React.useState(3);
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const [city, setCity] = React.useState("");
  const [studentCount, setStudentCount] = React.useState(0);
  const [remindersOn, setRemindersOn] = React.useState(true);
  const [community, setCommunity] = React.useState<Community | null>(null);

  const percentComplete = finished
    ? 100
    : ((step - 1) / TOTAL_STEPS) * 100;

  const stepMeta = [
    { label: "About us" },
    { label: "Your role" },
    { label: "Your goals" },
    { label: "Experience" },
    { label: "Schedule" },
    { label: "Community" },
    { label: "Finish" },
  ][step - 1];


  React.useEffect(() => {
    handleSurvey.getQuestions().then((data) => {
      console.log("Survey questions:", data[0].option
);
    }).catch((error) => {
      console.error("Error fetching survey questions:", error);
    })
  })

  const toggleGoal = (id: string) =>
    setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  const toggleDay = (day: string) =>
    setSelectedDays((d) =>
      d.includes(day) ? d.filter((x) => x !== day) : [...d, day]
    );

  const goNext = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleFinishSetup = () => {
    const onboardingData = {
      source,
      sourceLabel: sourceLabel(source),
      role,
      roleLabel: roleLabel(role),
      goals,
      experience,
      experienceLabel: experienceLabel(experience),
      sessionsPerWeek,
      selectedDays,
      city,
      remindersOn,
      community,
      communityLabel: communityLabel(community),
    };

    console.log("DinoRyx onboarding data:", onboardingData);
    setFinished(true);
  };

  const scheduleSummary =
    selectedDays.length > 0
      ? `${sessionsPerWeek}x / week · ${selectedDays.join(", ")}`
      : `${sessionsPerWeek}x / week`;

  return (
    <div className="relative min-h-screen w-full  px-6 py-8 text-[#f0f4f8] md:px-10 overflow-hidden">
      <div className="pointer-events-none z-1 absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-(--symbol-color)/80 blur-[240px]">
      </div>
      <div className="pointer-events-none z-1 absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-(--symbol-color)/80 blur-[240px]">
      </div>
      <StarsBackground
       factor={0.15}
       speed={100}
       starColor='#7be6df'
       transition={ {stiffness: 50, damping: 20} }
       className="absolute inset-0 z-0 h-full w-full bg-[#0a0f22]"
      />
      <div className="relative z-2 mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/DinoHome.webp"
              alt="DinoRyx"
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-(--symbol-color)">
              DinoRyx
            </span>
          </a>

          <button
            type="button"
            className="rounded-full cursor-pointer bg-[#1d2233]/70 px-4 py-2 text-xs font-medium text-[#f0f4f8] ring-1 ring-white/10 transition-colors hover:bg-[#1d2233]"
          >
            Skip for now
          </button>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#bac7cc]">
              Step {step} of {TOTAL_STEPS} · {stepMeta.label}
            </span>
            <span className="font-semibold text-[#f0f4f8]">
              {Math.round(percentComplete)}% complete
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#1d2233]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="relative mt-6 overflow-hidden rounded-3xl glass-strong-nav p-8 ring-1 ring-white/5 sm:p-10">
          {finished ? (
            <div className="relative flex min-h-[340px] flex-col items-center justify-center py-10 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/15 blur-[70px]"
              />

              <span className="relative flex h-16 w-16 items-center justify-center text-(--symbol-color)">
                <Sparkles className="h-9 w-9" />
              </span>

              <h1 className="relative mt-6 text-3xl font-extrabold tracking-tight text-(--symbol-color) sm:text-4xl">
                Welcome to DinoRyx
              </h1>
              <p className="relative mt-3 max-w-md text-[#bac7cc]">
                Your workspace is personalized and ready. Jump in and start
                building your fitness network.
              </p>

              <Button
                type="button"
                className="relative cursor-pointer mt-8 h-12 gap-1.5 rounded-full bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] px-7 font-semibold text-[#0a0f22] hover:opacity-90"
              >
                Go to dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
          {/* ---------------- Step content ---------------- */}
          <div className="min-h-[340px]">
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
                        className={`relative flex items-center gap-4 rounded-4xl px-5 py-6 text-left ring-1 transition-all ${
                          selected
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
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            selected
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
                        className={`relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition-all ${
                          selected
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
                          className={`h-6 w-6 ${
                            selected ? "text-[#56b2bb]" : "text-[#bac7cc]"
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
                        className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition-colors ${
                          selected
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
                        className={`flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold ring-1 transition-colors ${
                          selected
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
                        className={`relative flex flex-col items-start gap-1 rounded-2xl p-5 text-left ring-1 transition-all ${
                          selected
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

            {/* trainer and gym owner experience step */}
            {step === 3  && (role === "trainer" || role === "gym_owner") && (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  How experienced are you?
                </h1>
                <p className="mt-2 text-[#bac7cc]">
                  Helps us calibrate plans and metrics.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {experienceLevels.map(({ level, label }) => {
                    const selected = experience === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setExperience(level)}
                        className={`flex flex-col items-center gap-2 rounded-2xl py-6 ring-1 transition-all ${
                          selected
                            ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                            : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                        }`}
                      >
                        <span className="text-3xl font-extrabold text-(--symbol-color)">
                          {level}
                        </span>
                        <span className="font-semibold text-[#f0f4f8]">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl bg-[#1a2136]/50 p-6 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#f0f4f8]">
                      Sessions per week
                    </p>
                    <span className="text-xl font-extrabold text-(--symbol-color)">
                      {sessionsPerWeek}
                    </span>
                  </div>
                  <Slider
                    value={[sessionsPerWeek]}
                    onValueChange={([v]) => setSessionsPerWeek(v)}
                    min={1}
                    max={7}
                    step={1}
                    className="mt-5 [&_[data-slot=slider-track]]:bg-[#0a0f22] [&_[data-slot=slider-range]]:bg-(--symbol-color) [&_[data-slot=slider-thumb]]:border-(--symbol-color) [&_[data-slot=slider-thumb]]:bg-[#7fd7e0]"
                  />
                </div>
              </div>
            )}

            {/* trainer and gym owner schedule step */}
            {step === 4 && (role === "trainer" || role === "gym_owner") && (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  where do you training?
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
                        className={`flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold ring-1 transition-colors ${
                          selected
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

                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#f0f4f8]">
                      <MapPin className="h-4 w-4 text-(--symbol-color)" />
                      Student count
                    </label>
                   <Input
                      type="number"
                      min={0}
                      max={100}
                      value={studentCount}
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value >= 0 && value <= 100) {
                          setStudentCount(value);
                        }
                      }}
                      placeholder="e.g. 50"
                      className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* trainer and gym owner community step */}
            {step === 5 && (role === "trainer" || role === "gym_owner") && (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Are you ready to build your fitness dashboard?
                </h1>
                <p className="mt-2 text-[#bac7cc]">
                  Join fellow trainers, students and gym owners shaping the
                  future of fitness.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {communityTrainerOptions.map(({ id, title, description }) => {
                    const selected = community === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setCommunity(id)}
                        className={`relative flex flex-col items-start gap-1 rounded-2xl p-5 text-left ring-1 transition-all ${
                          selected
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

            {step === 6 && (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  You&apos;re all set
                </h1>
                <p className="mt-2 text-[#bac7cc]">
                  Here&apos;s a quick look at your setup.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SummaryCard
                    icon={Search}
                    label="Heard about us via"
                    value={sourceLabel(source)}
                  />
                  <SummaryCard icon={Users} label="Role" value={roleLabel(role)} />
                  {role === "student" && (
                    <SummaryCard
                      icon={Target}
                      label="Goals"
                      value={goals.length > 0 ? `${goals.length} selected` : "Not set"}
                    />
                  )}
                  {role !== "student" && (
                     <SummaryCard
                    icon={Trophy}
                    label="Experience"
                    value={experienceLabel(experience)}
                  />
                  )} 

                  <SummaryCard
                    icon={CalendarDays}
                    label="Schedule"
                    value={scheduleSummary}
                  />
                  <SummaryCard
                    icon={MapPin}
                    label="City"
                    value={city || "Not set"}
                  />
                  
                  {role === "student" && (
                      <SummaryCard
                    icon={Bell}
                    label="Reminders"
                    value={remindersOn ? "On" : "Off"}
                  />
                  )}

                  <SummaryCard
                    icon={Heart}
                    label="Community"
                    value={communityLabel(community)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer for handle buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={step === 1}
              className="relative cursor-pointer h-11 gap-1.5 rounded-full border-white/10 bg-transparent px-5 font-semibold text-[#f0f4f8] hover:bg-[#1d2233] hover:text-[#f0f4f8] disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const idx = i + 1;
                const isCurrent = idx === step;
                const isDone = idx < step;
                return (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? "w-7 bg-gradient-to-r from-(--symbol-color) to-[#7fd7e0]"
                        : isDone
                        ? "w-2 bg-(--symbol-color)"
                        : "w-2 bg-white/15"
                    }`}
                  />
                );
              })}
            </div>

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={goNext}
                className="relative z-0 cursor-pointer h-11 gap-1.5 rounded-full bg-(--symbol-color) px-6 font-semibold text-[#0a0f22] hover:bg-(--symbol-color)/90"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleFinishSetup}
                className="relative z-0 cursor-pointer h-11 gap-1.5 rounded-full bg-(--symbol-color) px-6 font-semibold text-[#0a0f22] hover:bg-(--symbol-color)/90"
              >
                Finish setup
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
            </>
          )}

          {step < TOTAL_STEPS && 
          <div className="absolute -z-5 bottom-5 right-[12.5%] h-25 w-20 rotate-y-180">
            <img
              src="/images/DinoHome.webp"
              alt="dino logo"
              aria-hidden
              className="size-full"
            />
          </div>
          }
          
        </div>
      </div>
    </div>
  );
}