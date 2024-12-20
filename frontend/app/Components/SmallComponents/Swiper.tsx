"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function HeroSlider({ isEnglish }: { isEnglish: boolean }) {
  return (
    <section
      className={`relative my-4  ${!isEnglish ? "rtl" : ""}`} // Adds RTL class if Arabic
    >
      <div className="relative w-full  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Arrow */}
        <div
          className={`absolute top-1/2 ${
            isEnglish ? "left-2" : "right-2"
          } z-10 -translate-y-1/2 cursor-pointer`}
        >
          <div
            className="swiper-button-prev-custom flex items-center justify-center bg-custom-bluePrimary text-white rounded-full w-8 h-8 shadow-md"
            id="prevButton"
          >
            {isEnglish ? <FaArrowLeft /> : <FaArrowRight />}
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000, // Auto swipe every 3 seconds
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: "#prevButton", // Custom left/right arrow
          }}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className={`flex flex-col  items-center justify-between w-full h-full bg-white ${
                !isEnglish ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-1/2 p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {isEnglish ? (
                    <>
                      Welcome to <br />
                      <span className="text-custom-bluePrimary">
                        Saudi Dentists Directory
                      </span>
                    </>
                  ) : (
                    <>
                      مرحبًا بكم في <br />
                      <span className="text-custom-bluePrimary">
                        دليل أطباء الأسنان السعودي
                      </span>
                    </>
                  )}
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {isEnglish
                    ? "Serving Patients All Over Saudi Arabia"
                    : "نخدم المرضى في جميع أنحاء المملكة العربية السعودية"}
                </p>
                <Link
                  href="/Experts"
                  className="text-blue-600 font-semibold hover:underline mt-4 inline-block"
                >
                  {isEnglish ? "Meet Our Experts" : "قابل خبراءنا"}
                </Link>
              </div>
              <div className="w-full hidden sm:block md:w-1/2 p-4 relative border-collapse">
                <img
                  src="/images/about_the_club.png"
                  alt={
                    isEnglish
                      ? "Saudi Dentists Directory"
                      : "دليل أطباء الأسنان السعودي"
                  }
                  className="w-full h-auto object-cover"
                />
                <div
                  className={`absolute bottom-0 ${
                    isEnglish
                      ? "left-0 bg-gradient-to-r"
                      : "right-0 bg-gradient-to-l"
                  } h-full  from-white pointer-events-none to-transparent w-1/2`}
                ></div>
                <div
                  className={`absolute bottom-0 ${
                    isEnglish
                      ? "left-0 bg-gradient-to-r"
                      : "right-0 bg-gradient-to-l"
                  } h-full  from-white pointer-events-none to-transparent w-1/2`}
                ></div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className={`flex flex-col  items-center justify-between w-full h-full bg-white ${
                !isEnglish ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-1/2 p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {isEnglish ? (
                    <>
                      Discover Top <br />
                      <span className="text-custom-bluePrimary">
                        Dental Experts
                      </span>
                    </>
                  ) : (
                    <>
                      اكتشف أفضل <br />
                      <span className="text-custom-bluePrimary">
                        خبراء طب الأسنان
                      </span>
                    </>
                  )}
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {isEnglish
                    ? "Providing the best dental care across Saudi Arabia."
                    : "تقديم أفضل رعاية لطب الأسنان في جميع أنحاء المملكة العربية السعودية."}
                </p>
                <a
                  href="#services"
                  className="text-blue-600 font-semibold hover:underline mt-4 inline-block"
                >
                  {isEnglish ? "Explore Services" : "استكشاف الخدمات"}
                </a>
              </div>
              <div className="w-full hidden md:block md:w-1/2 p-4 relative">
                <img
                  src="/images/about_the_club.png"
                  alt={isEnglish ? "Dental Experts" : "خبراء طب الأسنان"}
                  className="w-full h-auto object-cover"
                />
                <div
                  className={`absolute bottom-0 ${
                    isEnglish
                      ? "left-0 bg-gradient-to-r"
                      : "right-0 bg-gradient-to-l"
                  } h-full  from-white pointer-events-none to-transparent w-1/2`}
                ></div>
                <div
                  className={`absolute bottom-0 ${
                    isEnglish
                      ? "left-0 bg-gradient-to-r"
                      : "right-0 bg-gradient-to-l"
                  } h-full  from-white pointer-events-none to-transparent w-1/2`}
                ></div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
