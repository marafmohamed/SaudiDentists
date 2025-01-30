"use client";
import { useApp } from "@/app/Context";
import { FaLinkedin, FaMapMarkerAlt, FaSnapchatGhost, FaTiktok, FaYoutube } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import TitleCompoenet from "@/app/Components/SmallComponents/PageName";
import { useState } from "react";
import { useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";

export default function Page() {
  const [showLocations, setShowLocations] = useState(false);
  const { lang } = useApp();
  const isEnglish = lang === "en";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest(".relative")
      ) {
        setShowLocations(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <section className="py-12 md:pb-20 md:pt-12 text-custom-grayWrite">
      <TitleCompoenet
        isEnglish={isEnglish}
        firstWord={"About Us"}
        secondWord={"Founder"}
        firstWordAr={"من نحن"}
        secondWordAr={"المؤسس"}
      />
      <div className=" mx-auto px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between ">
        {/* Founder Info */}

        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex flex-col items-start md:h-full">
          <h2 className="text-2xl md:text-2xl w-full flex items-center justify-center bg-custom-bluePrimary/30 font-bold mb-6 ">
            {isEnglish ? "FOUNDER" : "المؤسس"}
          </h2>
          <div>
            <div className="flex flex-col justify-evenly items-center mb-4">
              <h3
                className={`text-xl md:text-xl font-medium ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish ? "Prof. Nawaf Labban" : "البروفيسور. نواف بن يوسف لبّان"}
              </h3>

              {/* Social Links */}
              <div
                className={`flex items-center  py-4 gap-4  ${
                  isEnglish
                    ? "text-center justify-center flex-wrap"
                    : "text-center justify-center flex-wrap-reverse"
                }`}
              >
                <div className="relative">
                  <div
                    className="flex items-center gap-1  cursor-pointer"
                    onClick={() => setShowLocations(!showLocations)}
                  >
                    <div className="bg-custom-bluePrimary p-2 rounded-full">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <span className="text-custom-bluePrimary font-medium">
                      Riyadh,Saudi Arabia
                    </span>
                  </div>
                  {showLocations && (
                    <div
                      className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href="https://www.google.com/maps/place/Sigal+Dental+Clinic/@24.6959607,46.7025335,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f03733cf4ca4b:0x694c4f7f10d1d4f7!8m2!3d24.6959607!4d46.7025335!16s%2Fg%2F11c581fx82?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        className="block px-4 py-2 text-custom-bluePrimary hover:bg-gray-100"
                      >
                        {isEnglish
                          ? "Sigal Dental Clinic"
                          : "عيادات سجال لطب الأسنان"}
                      </a>
                      <a
                        href="https://www.google.com/maps/place/College+of+Dentistry+-+BUC/@24.7151829,46.6214721,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f1d901a18bb1d:0xd20f16c6e079ebc8!8m2!3d24.7151829!4d46.6214721!16s%2Fg%2F11h0m6v1jh?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        className="block px-4 py-2 text-custom-bluePrimary hover:bg-gray-100"
                      >
                        {isEnglish
                          ? "College of Dentistry - BUC"
                          : "كلية طب الأسنان - BUC"}
                      </a>
                      <a
                        href="https://www.google.com/maps?q=Sigal+Dental+Clinic+%D8%B9%D9%8A%D8%A7%D8%AF%D8%A7%D8%AA+%D8%B3%D8%AC%D8%A7%D9%84+%D9%84%D8%B7%D8%A8+%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86+%D9%81%D8%B1%D8%B9+%D8%A7%D9%84%D8%AA%D8%AE%D8%B5%D8%B5%D9%8A%D8%8C+Intesection+-Tahkassusi+Road%D8%8C+Prestige+Center,+2nd+Floor+East+of+Panorama+Mall+Aiun+Al+Jawa+St,+Riyadh+12331&ftid=0x3e2f0332a94c1dd3:0x7620e68beede87cf&entry=gps&lucs=,94242559,94224825,94227247,94227248,47071704,47069508,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTM0LjIuODYzNzAYACDXggMqYyw5NDI0MjU1OSw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICU0E%3D&g_st=iw"
                        target="_blank"
                        className="block px-4 py-2 text-custom-bluePrimary hover:bg-gray-100"
                      >
                        {isEnglish
                          ? "Sigal Dental Clinic - Tahkassusi"
                          : "عيادات سجال لطب الأسنان - التخصصي"}
                      </a>
                    </div>
                  )}
                </div>
                <a
                  target="_blanc"
                  href="https://www.snapchat.com/add/nawaflabban"
                  className="flex items-center gap-1"
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <FaSnapchatGhost className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </a>
                <a
                  target="_blanc"
                  href="https://www.tiktok.com/@nawaflabban"
                  className="flex items-center gap-1"
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <FaTiktok className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </a>
                <a
                  target="_blanc"
                  href="https://www.instagram.com/nawaflabban/"
                  className="flex items-center gap-1 "
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <TiSocialInstagram className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </a>
                <div
                  className="flex items-center gap-1 "
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <FaYoutube className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 "
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <FaLinkedin className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 "
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <FaXTwitter className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban
                  </span>
                </div>
              </div>
            </div>
            {/* Founder Details */}
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "1. Bachelor in Dental Surgery Degree from King Saud University"
                : "١. شهادة البكالوريوس من جامعة الملك سعود"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "2. Clinical Certificate in Prosthodontics, Postgraduate certificate in Dental Materials, and Master and PhD degrees from Indiana University, United States of America."
                : "٢. شهادة التخصص في تركيبات الأسنان والزراعة، شهادة دبلوم في تخصص مواد الأسنان، شهادة ماجستير ودكتوراة في طب الأسنان من جامعة انديانا بالولايات المتحدة الأمريكية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "3. Prosthodontic Consultant"
                : "٣. استشاري تركيبات أسنان وزراعة"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
                {isEnglish
                ? "4. Professor at King Saud University, Department of Prosthetic Dental Sciences"
                : "٤. بروفيسور بجامعة الملك سعود، قسم علم الأسنان التعويضية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "5. Board Member, Prosthodontic Scientific Council."
                : "٥. عضو مجلس إدارة المجلس العلمي للبورد السعودي لتركيبات الأسنان"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "6. Former Chairman, Department of Prosthetic Dental Sciences, King Saud University, College of Dentistry"
                : "٦. رئيس قسم سابق، قسم الإستعاضة السنية لدى كلية طب الأسنان بجامعة الملك سعود"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "7. Former Treasurer, Saudi Prosthodontic Society"
                : "٧. أمين مال سابق، مجلس إدارة الجمعية السعودية لتركيبات الأسنان"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "8. Adjunct Professor, Indiana University, USA"
                : "٨. بروفيسور متعاون لدى جامعة إنديانا بالولايات المتحدة الأمريكية"}
            </p>
            <div
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              <h3
                className={`text-xl md:text-xl font-medium ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish
                  ? "Dedicated to Colleagues in the Specialty"
                  : "إهداء للزملاء والزميلات في التخصص"}
              </h3>
              <p
                className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish
                  ? "Here is this electronic guide for many specialists, consultants, and technicians in prosthodontics, classified according to regions and various governmental and private institutions throughout the Kingdom of Saudi Arabia."
                  : "إليكم هذا الدليل الإلكتروني للعديد من الأخصائيين، الاستشاريين، والتقنيين في الاستعاضة السنية ومصنفون طبقاً للمناطق والمؤسسات الحكومية والخاصة المختلفة في جميع أنحاء المملكة العربية السعودية."}
              </p>
              <p
                className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish
                  ? "Your brother/ Prof. Nawaf bin Youssef Iban"
                  : "أخوكم/ أ.د. نواف بن يوسف لبّان"}
              </p>
              <p
                className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish
                  ? "Note: No material or other sources from the Saudi Prosthodontic Society or the Scientific Council of the Saudi Board of Prosthodontics were used in this work."
                  : "ملاحظة: لم يستخدم في هذا العمل أي مصادر مادية أو غيرها للجمعية السعودية أو المجلس العلمي للبورد السعودي للاستعاضة السنية."}
              </p>
            </div>
          </div>
        </div>

        {/* Founder Image */}
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img
            src="/Images/founder.png"
            alt={isEnglish ? "Founder" : "المؤسس"}
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
