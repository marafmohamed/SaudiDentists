"use client";
import HeroSlider from "./Components/SmallComponents/Swiper";
import { useApp } from "./Context";
export default function Home() {
  const { lang } = useApp();
  const isEnglish = lang === "en";
  return (
    <div>
      {/* <Navbar />
      <Footer /> */}
      <HeroSlider isEnglish={isEnglish} />
    </div>
  );
}
