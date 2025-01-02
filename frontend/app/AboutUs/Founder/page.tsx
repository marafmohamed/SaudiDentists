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
            <div className="flex flex-col md:flex-row justify-evenly items-center mb-4">
              <h3
                className={`text-xl md:text-xl font-medium ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {isEnglish ? "Dr. Nawaf Labban" : "د. نواف لبان"}
              </h3>

              {/* Social Links */}
              <div
                className={`flex items-center  py-4 gap-4  ${
                  isEnglish
                    ? "text-center justify-center flex-wrap"
                    : "text-center justify-center flex-wrap-reverse"
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
                <a
                  target="_blanc"
                  href="https://linktr.ee/nawaflabban?fbclid=PAZXh0bgNhZW0CMTEAAaaCpcrMxkJqV0xFeVAxUYMiFnd97qneAwy2wrm4wHeu5_35uF048sPSUvY_aem_1vcIP7nC2sT5UOf-IV_Dvw"
                  className="flex items-center gap-1"
                >
                  <div className="bg-custom-bluePrimary p-2 rounded-full">
                    <AiOutlineGlobal className="text-white" />
                  </div>
                  <span className="text-custom-bluePrimary font-medium">
                    NawafLabban{" "}
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
              ? "4. Professor at King Saud University"
              : "٤. بروفيسور بجامعة الملك سعود."}
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
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
              ? "9. Professor, Department of Prosthetic Dental Sciences"
              : "٩. أستاذ، قسم علوم الأسنان التعويضية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
              ? "10. Former Chairman, Prosthetic Dental Department, King Saud University, College of Dentistry, P. O. Box 60169, Riyadh 11545, Saudi Arabia"
              : "١٠. رئيس قسم الأسنان التعويضية السابق، جامعة الملك سعود، كلية طب الأسنان، ص.ب. 60169، الرياض 11545، المملكة العربية السعودية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
              ? "11. Board Member, Prosthodontics Scientific Council"
              : "١١. عضو مجلس، المجلس العلمي للأسنان التعويضية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
              ? "12. Adjunct Professor, Indiana University, USA"
              : "١٢. أستاذ مشارك، جامعة إنديانا، الولايات المتحدة الأمريكية"}
            </p>
            <p
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
              {isEnglish
              ? "13. Former Treasurer, Saudi Prosthodontics Society"
              : "١٣. أمين الخزانة السابق، الجمعية السعودية للأسنان التعويضية"}
            </p>
            <div
              className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${
              isEnglish ? "text-left" : "text-right"
              }`}
            >
                <h3 className={`text-xl md:text-xl font-medium ${isEnglish ? "text-left" : "text-right"}`}>
                {isEnglish ? "Dedicated to Colleagues in the Specialty" : "إهداء للزملاء والزميلات في التخصص"}
                </h3>
                <p className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${isEnglish ? "text-left" : "text-right"}`}>
                {isEnglish
                  ? "Here is this electronic guide for many specialists, consultants, and technicians in prosthodontics, classified according to regions and various governmental and private institutions throughout the Kingdom of Saudi Arabia."
                  : "إليكم هذا الدليل الإلكتروني للعديد من الأخصائيين، الاستشاريين، والتقنيين في الاستعاضة السنية ومصنفون طبقاً للمناطق والمؤسسات الحكومية والخاصة المختلفة في جميع أنحاء المملكة العربية السعودية."}
                </p>
                <p className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${isEnglish ? "text-left" : "text-right"}`}>
                {isEnglish ? "Your brother/ Prof. Nawaf bin Youssef Iban" : "أخوكم/ أ.د. نواف بن يوسف إبان"}
                </p>
                <p className={`text-lg md:text-xl mb-2 text-custom-grayWrite ${isEnglish ? "text-left" : "text-right"}`}>
                {isEnglish
                  ? "Note: No material or other sources from the Saudi Association or the Scientific Council of the Saudi Board of Prosthodontics were used in this work."
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
