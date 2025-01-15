"use client";
import { useRouter } from "next/navigation";
import Filter from "./Components/SmallComponents/Filter";
import HeroSlider from "./Components/SmallComponents/Swiper";
import { useApp } from "./Context";
export default function Home() {
  const { lang } = useApp();
  const isEnglish = lang === "en";
  const router = useRouter();
  return (
    <div>
      {/* <Navbar />
      <Footer /> */}
      <HeroSlider isEnglish={isEnglish} />
      <Filter
        specialization={""}
        region={""}
        city={""}
        category={""}
        doctorName={""}
        onSearch={(specialization, region, city, category, doctorName) => {
          router.push(
            "/Experts?" +
              new URLSearchParams({
                specialization,
                region,
                city,
                category,
                doctorName,
              }).toString()
          );
        }}
        main={true}
      />
    </div>
  );
}
