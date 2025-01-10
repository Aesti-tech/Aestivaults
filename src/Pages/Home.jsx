import FeaturedArtworks from "../Features/Home/Featured";
import TrendingUsers from "../Features/Home/TrendingUsers";
import Stats from "../Features/Home/Stats";
import Hero from "../Features/Home/Hero";
import ReasonsToJoin from "../Features/Home/Reasons";
import Collections from "../Features/Home/Collections";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TrendingUsers />
      <FeaturedArtworks />

      <Collections />
      <ReasonsToJoin />
    </>
  );
}

export default Home;
