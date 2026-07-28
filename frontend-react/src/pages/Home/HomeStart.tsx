import { useSelector } from "react-redux";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeStart() {
   const isAuth = useSelector((state)=>state.userauth.isAuthenticated);
  return (
    <section className="relative w-full overflow-hidden bg-(--primary-bg-color) px-6 py-28 text-center text-(--primary-text-color) md:px-10">

      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <h2 className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:text-6xl">
          Ready To Build Your
          <br />
          <span className="text-[#56b2bb]">Fitness Network?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-(--secondary-text-color)">
          Join thousands of trainers running their studios on DinoRyx.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          {isAuth ?
            <Link to="/account" className="flex items-center gap-1.5 rounded-full  px-7 py-4 text-sm font-semibold text-[#0a0f22] 
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link> :
            <Link to="/login" className="flex items-center gap-1.5 rounded-full  px-7 py-4 text-sm font-semibold text-[#0a0f22] 
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          }

          <Link to="/nearby-location"
            className="glass flex items-center gap-1.5 rounded-full border-[#f0f4f8]/15  px-7 py-4 text-sm font-semibold
             text-(--primary-text-color) hover:bg-[#1d2233] cursor-pointer"
          >
            <MapPin className="h-4 w-4 text-[#56b2bb]" />
            Explore Nearby
          </Link>
        </div>
      </div>
    </section>
  );
}