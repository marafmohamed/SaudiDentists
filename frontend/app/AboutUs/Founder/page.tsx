"use client";
import { useApp } from "@/app/Context";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import TitleCompoenet from "@/app/Components/SmallComponents/PageName";
export default function Page() {
  const { lang } = useApp();
  const isEnglish = lang === "en";

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
            <h3
              className={`text-xl md:text-xl font-medium mb-4 ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish ? "Dr. Nawaf Labban" : "د. نواف لبان"}
            </h3>

            {/* Social Links */}
            <div
              className={`flex items-center  py-4 gap-4  ${
                isEnglish
                  ? "text-left justify-start flex-wrap"
                  : "text-right justify-end flex-wrap-reverse"
              }`}
            >
              <div className="flex items-center gap-1  ">
                <div className="bg-custom-bluePrimary p-2 rounded-full">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <span className="text-custom-bluePrimary font-medium">
                  Riyadh,Saudi Arabia
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-custom-bluePrimary p-2 rounded-full">
                  <AiOutlineGlobal className="text-white" />
                </div>
                <span className="text-custom-bluePrimary font-medium">
                  NawafLabban{" "}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <div className="bg-custom-bluePrimary p-2 rounded-full">
                  <TiSocialInstagram className="text-white" />
                </div>
                <span className="text-custom-bluePrimary font-medium">
                  NawafLabban
                </span>
              </div>
            </div>

            {/* Founder Details */}
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Bachelor in Dental Surgery Degree from King Saud University"
                : "شهادة البكالوريوس من جامعة الملك سعود."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Clinical Certificate in Prosthodontics, Postgraduate certificate in Dental Materials, and Master and PhD degrees from Indiana University, United States of America."
                : "شهادة التخصص في تركيبات الأسنان والزراعة، شهادة دبلوم في تخصص مواد الأسنان، شهادة ماجستير ودكتوراة في طب الأسنان من جامعة انديانا بالولايات المتحدة الأمريكية."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Prosthodontic Consultant"
                : "استشاري تركيبات أسنان وزراعة."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Professor at King Saud University"
                : "بروفيسور بجامعة الملك سعود."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Board Member, Prosthodontic Scientific Council."
                : "عضو مجلس إدارة المجلس العلمي للبورد السعودي لتركيبات الأسنان."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Former Chairman, Department of Prosthetic Dental Sciences, King Saud University, College of Dentistry"
                : "رئيس قسم سابق، قسم الإستعاضة السنية لدى كلية طب الأسنان بجامعة الملك سعود."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Former Treasurer, Saudi Prosthodontic Society"
                : "أمين مال سابق، مجلس إدارة الجمعية السعودية لتركيبات الأسنان."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Adjunct Professor, Indiana University, USA"
                : "بروفيسور متعاون لدى جامعة إنديانا بالولايات المتحدة الأمريكية."}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Professor, Department of Prosthetic Dental Sciences"
                : "أستاذ، قسم علوم الأسنان التعويضية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Former Chairman, Prosthetic Dental Department, King Saud University, College of Dentistry, P. O. Box 60169, Riyadh 11545, Saudi Arabia"
                : "رئيس قسم الأسنان التعويضية السابق، جامعة الملك سعود، كلية طب الأسنان، ص.ب. 60169، الرياض 11545، المملكة العربية السعودية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Board Member, Prosthodontics Scientific Council"
                : "عضو مجلس، المجلس العلمي للأسنان التعويضية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Adjunct Professor, Indiana University, USA"
                : "أستاذ مشارك، جامعة إنديانا، الولايات المتحدة الأمريكية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
                ? "Former Treasurer, Saudi Prosthodontics Society"
                : "أمين الخزانة السابق، الجمعية السعودية للأسنان التعويضية"}
            </p>
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
