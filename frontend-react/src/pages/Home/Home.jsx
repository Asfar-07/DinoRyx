import "./home.css"
import HeroSearch from './HeroSearch'
import HomeStart from './HomeStart'
import HomeReview from './HomeReview'
import MainHero from './MainHero'
import HomeFeature from './HomeFeature'

export default function Home() {

  return (
    <div>
      <MainHero />
      <HeroSearch />
      <HomeFeature />
      <HomeReview />
      <HomeStart />
    </div>
  )
}
