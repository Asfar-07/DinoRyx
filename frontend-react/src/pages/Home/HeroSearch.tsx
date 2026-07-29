import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const popularTags = [
  "CrossFit",
  "Strength Training",
  "Yoga",
  "Personal Trainer",
  "Weight Loss",
];

export default function HeroSearch() {
  const [query, setQuery] = React.useState("");
  const [location, setLocation] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/nearby-location");
    // handle search logic here
  };

  return (
    <section className="relative w-full flex justify-center items-center overflow-hidden min-h-150 h-screen  px-6 py-24 text-center text-(--primary-text-color) md:px-10">
      {/* ambient glow */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/10 blur-[120px]"
      /> */}

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        <h1 className=" text-4xl font-extrabold tracking-tight sm:text-5xl">
          Find Trainers &amp;{" "}
          <span className="text-[#56b2bb]">Nearby Gyms</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-(--secondary-text-color)">
          Search by trainer name, gym name, city, or location discover the
          fitness community around you.
        </p>

        <form
          onSubmit={handleSearch}
          className="glass-strong glow-primary mx-auto mt-10  max-w-3xl flex flex-col items-stretch gap-2 rounded-[40px] p-3 sm:flex-row sm:items-center lg:min-w-210 max-md:w-full"
        >
          <div className="flex flex-4 items-center gap-2 rounded-3xl bg-white/5 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-(--secondary-text-color)" />
            <Input
              type="text"
              placeholder="Search trainers, gyms..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-auto border-0 bg-transparent p-0 text-(--primary-text-color) placeholder:text-[#bac7cc]/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex flex-2 items-center gap-2 rounded-3xl bg-white/5 px-4 py-3 sm:w-56">
            <MapPin className="h-4 w-4 shrink-0 text-[#56b2bb]" />
            <Input
              type="text"
              placeholder="Any location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-auto border-0 bg-transparent p-0 text-(--primary-text-color) placeholder:text-(--primary-text-color)/80 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl  bg-(--symbol-color) px-5 py-5 text-sm font-medium text-[#0a0f22] transition-transform hover:scale-[1.02]"
          >
            Search
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-sm">
          <span className="text-xs text-(--secondary-text-color)">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="glass-li rounded-full px-3.5 py-1.5 text-xs font-medium text-(--secondary-text-color) hover:text-(--primary-text-color)"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}