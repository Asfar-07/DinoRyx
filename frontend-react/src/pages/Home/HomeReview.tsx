import * as React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "AR",
    name: "Aisha Rahman",
    role: "Head Coach · Iron Republic",
    rating: 5,
    quote:
      "DinoRyx replaced three tools. Billing, attendance and progress live in one place — my students actually see their wins now.",
  },
  {
    initials: "MV",
    name: "Marco Vitale",
    role: "Personal Trainer · Milan",
    rating: 5,
    quote:
      "The nearby map alone brought me 27 new clients this quarter. The dashboard just… gets what trainers need.",
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "Studio Owner · Bengaluru",
    rating: 5,
    quote:
      "Cash flow finally makes sense. Pending fees are auto-tracked and monthly reports save me a full weekend.",
  },
  {
    initials: "LC",
    name: "Liam Carter",
    role: "Gym Manager · Austin",
    rating: 4,
    quote:
      "Bespoke branding and a productive team — running our gym has never felt this organized.",
  },
  {
    initials: "SK",
    name: "Sofia Kowalski",
    role: "Yoga Instructor · Warsaw",
    rating: 5,
    quote:
      "Client check-ins used to eat my mornings. Now it's automatic, and I actually get to teach.",
  },
];

export default function HomeReview() {
  return (
    <section className="w-full bg-(--primary-bg-color) px-6 py-24 text-center text-(--primary-text-color) md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-(--symbol-color)">
          Loved by trainers
        </span>

        <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
          What <span className="text-[#56b2bb]">Trainers Say</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl">
        {/* left fade shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f22] to-transparent sm:w-28"
        />
        {/* right fade shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f22] to-transparent sm:w-28"
        />

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-6 px-1">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.name}
                className="basis-[320px] pl-6 sm:basis-[360px]"
              >
                <article className="flex h-full flex-col gap-4 rounded-2xl bg-[#1d2233]/60 p-6 text-left ring-1 ring-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/20 text-sm font-semibold text-[#56b2bb] ring-1 ring-(#7be6df)">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-semibold text-[#f0f4f8]">
                        {t.name}
                      </p>
                      <p className="text-sm text-[#bac7cc]">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < t.rating ? "#7be6df" : "transparent"}
                        stroke={i < t.rating ? "#7be6df" : "#3a4257"}
                      />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-[#bac7cc]">
                    &quot;{t.quote}&quot;
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static h-10 w-10 translate-x-0 translate-y-0 border-[#f0f4f8]/15 bg-[#1d2233] text-[#f0f4f8] hover:bg-[#56b2bb]/20 hover:text-[#56b2bb]" />
            <CarouselNext className="static h-10 w-10 translate-x-0 translate-y-0 border-[#f0f4f8]/15 bg-[#1d2233] text-[#f0f4f8] hover:bg-[#56b2bb]/20 hover:text-[#56b2bb]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}