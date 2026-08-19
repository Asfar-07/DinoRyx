import * as React from "react";
import { CreditCard, CheckCircle2, MapPin } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface TrainerCard {
  size: string;
}

interface ProgressBar {
  height: string;
  tone: string;
}

interface MapPinPosition {
  top: string;
  left: string;
}

const trainerCards: TrainerCard[] = [
  { size: "h-40" },
  { size: "h-48" },
  { size: "h-44" },
];

const progressBars: ProgressBar[] = [
  { height: "h-16", tone: "bg-[#2f4a52]" },
  { height: "h-10", tone: "bg-[#2f4a52]" },
  { height: "h-28", tone: "bg-[#3d7d86]" },
  { height: "h-20", tone: "bg-[#4a97a1]" },
  { height: "h-32", tone: "bg-[#7fd7e0]" },
];

const discoveryPoints: string[] = [
  "Real-time Capacity Tracking",
  "Instant Booking Integration",
];

const mapPins: MapPinPosition[] = [
  { top: "18%", left: "20%" },
  { top: "30%", left: "48%" },
  { top: "22%", left: "70%" },
  { top: "48%", left: "12%" },
  { top: "55%", left: "38%" },
  { top: "40%", left: "62%" },
  { top: "68%", left: "55%" },
  { top: "72%", left: "28%" },
];

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function HomeFeature(): React.JSX.Element {
  return (
    <section className="w-full bg-(--primary-bg-color) px-6 py-24 text-(--primary-text-color) md:px-10">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2
          variants={headerItemVariants}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
        >
          Everything You Need To Manage A Modern Gym
        </motion.h2>
        <motion.p
          variants={headerItemVariants}
          className="mt-5 text-base text-[#bac7cc] sm:text-sm"
        >
          High-density data management wrapped in a premium, motivating
          interface.
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-5"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Trainer Network — large card */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col rounded-2xl bg-[#1d2233]/60 p-8 ring-1 ring-white/5 lg:col-span-3"
        >
          <h3 className="text-2xl font-bold text-[#56b2bb]">
            Trainer Network
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#bac7cc] sm:text-base">
            Manage schedules, commissions, and performance metrics for your
            entire coaching staff in one dashboard.
          </p>

          <div className="mt-8 flex items-end gap-4 rounded-xl bg-black/20 p-6">
            {trainerCards.map((card: TrainerCard, i: number) => (
              <div
                key={i}
                className={`flex w-32 flex-1 flex-col justify-end gap-3 rounded-xl bg-[#2a3145] p-4 ${card.size}`}
              >
                <span
                  className={`h-9 w-9 rounded-full ${
                    i === 1 ? "bg-[#56b2bb]/50" : "bg-[#4d5978]"
                  }`}
                />
                <span className="h-2 w-3/4 rounded-full bg-[#4d5978]" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Billing & Accounting */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col rounded-2xl bg-[#1d2233]/60 p-8 ring-1 ring-white/5 lg:col-span-2"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#56b2bb]/15 text-[#56b2bb]">
            <CreditCard className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">Billing &amp; Accounting</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#bac7cc] sm:text-base">
            Automated invoicing, recurring payments, and detailed financial
            forecasting for your facility.
          </p>
        </motion.div>

        {/* Student Progress */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col rounded-2xl bg-[#1d2233]/60 p-8 ring-1 ring-white/5 lg:col-span-2"
        >
          <h3 className="text-2xl font-bold">Student Progress</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#bac7cc] sm:text-base">
            Visual health charts and progression analytics that keep your
            members engaged and motivated.
          </p>

          <div className="mt-8 flex flex-1 items-end gap-3">
            {progressBars.map((bar: ProgressBar, i: number) => (
              <div
                key={i}
                className={`w-full rounded-lg ${bar.height} ${bar.tone}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Gym Discovery */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col gap-8 rounded-2xl bg-[#1d2233]/60 p-8 ring-1 ring-white/5 lg:col-span-3 lg:flex-row lg:items-center"
        >
          <div className="flex flex-1 flex-col">
            <h3 className="text-2xl font-bold text-[#56b2bb]">
              Gym Discovery
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#bac7cc] sm:text-base">
              Connect your facility to a global network. Increase your
              visibility and attract drop-ins from around the world.
            </p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {discoveryPoints.map((point: string) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm font-semibold sm:text-base"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#56b2bb]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#0f1c33] via-[#131b2e] to-[#1a1035] ring-1 ring-white/10 lg:w-72">
            <div className="absolute left-3 top-2 rounded bg-black/40 px-2 py-1 text-[10px] font-medium text-[#bac7cc]">
              Location Map: Central District
            </div>
            {mapPins.map((pin: MapPinPosition, i: number) => (
              <MapPin
                key={i}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-full text-[#56b2bb] drop-shadow-[0_0_6px_rgba(86,178,187,0.8)]"
                style={{ top: pin.top, left: pin.left }}
                fill="#56b2bb"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}