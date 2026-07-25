"use client";

import "./onboarding.css";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// ─── Question interface ───────────────────────────────────────────────────────

export interface Question {
  id: number;
  title: string;
  options: string[];   // empty array → free-text input
  optional?: boolean;
}

// ─── Questions — edit this array freely ──────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Where did you hear about our website?",
    options: ["Google", "YouTube", "Friend", "Social Media", "Blog / Article", "Other"],
    optional: true,
  },
  {
    id: 2,
    title: "What best describes your role?",
    options: ["Trainer", "Member"],
    optional: false,
  },
  {
    id: 3,
    title: "What are your main goals?",
    options: ["Fitness & Health", "Learn New Skills", "Networking", "Career Growth", "Hobbies", "Wellness"],
    optional: false,
  },
  {
    id: 4,
    title: "What is your gender?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
    optional: true,
  },
  {
    id: 5,
    title: "What is your phone number?",
    options: [],   // ← empty = renders as text input
    optional: true,
  },
];

// ─── Role card metadata (only used when options.length === 2) ─────────────────

const ROLE_META: Record<string, { emoji: string; desc: string }> = {
  Trainer: { emoji: "🏋️", desc: "Create channels & guide others" },
  Member:  { emoji: "🙋", desc: "Follow channels & learn" },
  // fallback for any 2-option question
  default: { emoji: "✦",  desc: "" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

type QType = "multi" | "single-card" | "pill" | "text";

function getType(q: Question): QType {
  if (q.options.length === 0)  return "text";
  if (q.options.length === 2)  return "single-card";
  // 4 options that look like gender choices → pill
  if (q.id === 4)              return "pill";
  return "multi";
}

type Answers = Record<string, string | string[]>;

// converts question id number → stable string field name for RHF
const qKey = (id: number): string => `q_${id}`;

function buildDefaults(): Answers {
  return QUESTIONS.reduce<Answers>((acc, q) => {
    acc[qKey(q.id)] = getType(q) === "multi" ? [] : "";
    return acc;
  }, {});
}

function Tick() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="#0a0f22" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir]         = useState<"fwd" | "back">("fwd");
  const [done, setDone]       = useState(false);
  const animKey               = useRef(0); // forces re-mount of step body

  const totalSteps = QUESTIONS.length;
  const currentQ   = QUESTIONS[stepIdx];
  const qType      = getType(currentQ);
  const progress   = ((stepIdx + 1) / totalSteps) * 100;

  const { control, handleSubmit, watch, setValue } = useForm<Answers>({
    defaultValues: buildDefaults(),
  });

  const currentAnswer = watch(qKey(currentQ.id));

  // ── multi-select toggle ──
  const toggleMulti = (qId: number, opt: string, current: string[]) => {
    setValue(qKey(qId), current.includes(opt) ? current.filter(v => v !== opt) : [...current, opt]);
  };

  // ── can advance? ──
  const canAdvance = (): boolean => {
    if (currentQ.optional) return true;
    if (qType === "multi") return (currentAnswer as string[]).length > 0;
    return (currentAnswer as string).trim() !== "";
  };

  const navigate = (direction: "fwd" | "back") => {
    setDir(direction);
    animKey.current += 1;
    if (direction === "fwd") setStepIdx(i => i + 1);
    else setStepIdx(i => i - 1);
  };

  const onSubmit = (data: Answers) => {
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([, v]) =>
        Array.isArray(v) ? v.length > 0 : String(v).trim() !== ""
      )
    );
    console.log("✅ Onboarding complete:", cleaned);
    setDone(true);
  };

  // ─── Success ─────────────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="ob-root">
        <div className="ob-card">
          <div className="ob-success">
            <div className="ob-success-ring">🎉</div>
            <h2 className="ob-success-title">You're all set!</h2>
            <p className="ob-success-sub">
              Your profile has been personalised. Welcome aboard — let's get started.
            </p>
            <button className="ob-success-cta" onClick={() => alert("→ Dashboard")}>
              Go to Dashboard <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Page ─────────────────────────────────────────────────────────────────

  return (
    <div className="ob-root">
      <div className="ob-card">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Top bar */}
          <div className="ob-topbar">
            <span className="ob-step-count">
              {stepIdx + 1} / {totalSteps}
            </span>
            <div className="ob-progress-track">
              <div className="ob-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step dots */}
          <div className="ob-dots">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`ob-dot ${i === stepIdx ? "active" : i < stepIdx ? "done" : ""}`}
                style={{ width: i === stepIdx ? 22 : 8 }}
              />
            ))}
          </div>

          {/* Animated step body — key forces re-mount on every step change */}
          <div
            key={animKey.current}
            className={`ob-step-body ${dir === "back" ? "ob-step-back" : ""}`}
          >
            {/* Question header */}
            <div className="ob-q-header">
              {currentQ.optional && (
                <span className="ob-optional-tag">Optional</span>
              )}
              <h2 className="ob-q-title">{currentQ.title}</h2>
              <p className="ob-q-hint">
                {qType === "multi"
                  ? "Select all that apply."
                  : qType === "single-card"
                  ? "Choose one to continue."
                  : qType === "pill"
                  ? "Pick one that fits."
                  : "You can skip this if you prefer."}
              </p>
            </div>

            {/* ── MULTI-SELECT grid ── */}
            {qType === "multi" && (
              <Controller
                name={qKey(currentQ.id)}
                control={control}
                render={({ field }) => {
                  const cur = field.value as string[];
                  return (
                    <div className="ob-grid">
                      {currentQ.options.map(opt => {
                        const sel = cur.includes(opt);
                        return (
                          <div
                            key={opt}
                            className={`ob-option ${sel ? "ob-sel" : ""}`}
                            onClick={() => toggleMulti(currentQ.id, opt, cur)}
                          >
                            <span className="ob-opt-label">{opt}</span>
                            <span className="ob-check">{sel && <Tick />}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />
            )}

            {/* ── SINGLE-CARD (2 options) ── */}
            {qType === "single-card" && (
              <Controller
                name={qKey(currentQ.id)}
                control={control}
                render={({ field }) => (
                  <div className="ob-role-grid">
                    {currentQ.options.map(opt => {
                      const meta = ROLE_META[opt] ?? ROLE_META.default;
                      return (
                        <div
                          key={opt}
                          className={`ob-role-card ${field.value === opt ? "ob-sel" : ""}`}
                          onClick={() => field.onChange(opt)}
                        >
                          <span className="ob-role-emoji">{meta.emoji}</span>
                          <span className="ob-role-name">{opt}</span>
                          {meta.desc && (
                            <span className="ob-role-desc">{meta.desc}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            )}

            {/* ── PILL (single-pick, many options) ── */}
            {qType === "pill" && (
              <Controller
                name={qKey(currentQ.id)}
                control={control}
                render={({ field }) => (
                  <div className="ob-pills">
                    {currentQ.options.map(opt => (
                      <span
                        key={opt}
                        className={`ob-pill ${field.value === opt ? "ob-sel" : ""}`}
                        onClick={() => field.onChange(opt)}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
              />
            )}

            {/* ── FREE TEXT ── */}
            {qType === "text" && (
              <Controller
                name={qKey(currentQ.id)}
                control={control}
                render={({ field }) => (
                  <div className="ob-input-wrap">
                    <div className="ob-input-row">
                      <input
                        className="ob-input ob-input-prefix"
                        value="+1"
                        readOnly
                        tabIndex={-1}
                      />
                      <input
                        type="tel"
                        className="ob-input"
                        placeholder="(555) 000-0000"
                        value={field.value as string}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    </div>
                    <span className="ob-input-hint">
                      We'll never share your number with anyone.
                    </span>
                  </div>
                )}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="ob-nav">
            {stepIdx > 0 ? (
              <button type="button" className="ob-btn-back" onClick={() => navigate("back")}>
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}

            {stepIdx < totalSteps - 1 ? (
              <button
                type="button"
                className="ob-btn-next"
                onClick={() => navigate("fwd")}
                disabled={!canAdvance()}
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="ob-btn-next"
                disabled={!canAdvance()}
              >
                Finish <Check size={14} />
              </button>
            )}
          </div>

          {/* Skip */}
          {currentQ.optional && stepIdx < totalSteps - 1 && (
            <button type="button" className="ob-skip" onClick={() => navigate("fwd")}>
              Skip this step
            </button>
          )}

        </form>
      </div>
    </div>
  );
}