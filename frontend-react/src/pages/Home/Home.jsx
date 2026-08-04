import "./home.css"
import { useState } from "react";
import HeroSearch from './HeroSearch'
import HomeStart from './HomeStart'
import HomeReview from './HomeReview'
import MainHero from './MainHero'
import HomeFeature from './HomeFeature'
import TrialNotice from "../../components/notice/TrialNotice";

export default function Home() {
    const [open, setOpen] = useState(true);

  return (
    <div>
      <TrialNotice open={open}
        onOpenChange={setOpen}
        onStartExploring={() => setOpen(false)}/>
      <MainHero />
      <HeroSearch />
      <HomeFeature />
      <HomeReview />
      <HomeStart />
    </div>
  )
}
