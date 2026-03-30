import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import CallToAction from "@/components/home/CallToAction";
import PopularCategories from "@/components/home/PopularCategories";

const Home = () => {
  return (
    <main className="space-y-12">
      <HeroSection />
      <Features />
      <CallToAction />
      <PopularCategories />
    </main>
  );
};

export default Home;
