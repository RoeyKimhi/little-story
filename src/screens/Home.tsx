import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import CallToAction from "@/components/home/CallToAction";
import PopularCategories from "@/components/home/PopularCategories";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateStory = () => {
    navigate("/create");
  };

  return (
    <main className="space-y-12">
      <HeroSection />
      <Features />
      <CallToAction onClick={handleCreateStory} />
      <PopularCategories />
    </main>
  );
};

export default Home;
