"use client";
import { useApp } from "@/app/Context";
import TitleCompoenet from "@/app/Components/SmallComponents/PageName";

export default function Page() {
  const { lang } = useApp();
  const isEnglish = lang === "en";

  return (
    <section className="py-12 md:pb-20 md:pt-12 text-custom-grayWrite">
      <TitleCompoenet
        isEnglish={isEnglish}
        firstWord={"About Us"}
        secondWord={"Thanks And Appreciation"}
        firstWordAr={"من نحن"}
        secondWordAr={"الشكر والتقدير"}
      />
      <div className="mx-auto px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row items-start justify-between">
        {/* Content Section */}
        <div className="w-full md:w-2/3 mb-8 md:mb-0 ">
          <h2 className="text-2xl md:text-2xl w-full flex items-center justify-center bg-custom-bluePrimary/30 font-bold mb-6 ">
            {isEnglish ? "Thanks And Appreciation" : "الشكر والتقدير"}
          </h2>
          <p
            className={`text-lg md:text-xl mb-2 md:w-[90%] leading-relaxed  text-custom-grayWrite ${
              isEnglish ? "text-left " : "text-right ml-auto "
            }`}
          >
            {isEnglish
              ? "Special thanks to my dear brother and mentor, Professor Dr. Mansour Asiri, and all the former and current members of the Board of Directors of the Saudi Prosthodontics Society for encouraging work on this idea. I would also like to extend special thanks to my dear brother Dr. Adnan Ashki for all the support he provided during the work on this project. Thanks are also extended to Dr. Lamia Al-Humaidhi, Dr. Najla Al-Khuzayem, and Dr. Abdullah Al-Urayni for their contribution to technical support as well."
              : "شكر خاص لسعادة أخي وأستاذي الأستاذ الدكتور/ منصور عسيري وجميع أعضاء مجلس إدارة الجمعية السعودية للاستعاضة السنية السابق والحالي على تشجيع العمل على هذه الفكرة و أيضاً  أخص بالشكر سعادة أخي الدكتور/ عدنان عشقي على جميع ما قدمه من دعم خلال العمل على هذا المشروع والشكر موصول للدكتورة/ لمياء الحميضي والدكتورة/ نجلاء الخزيم والدكتور/ عبدالله العريني على المشاركة في الدعم الفني أيضاً."}{" "}
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img
            src="/Images/about_the_club.png" // Replace with the actual image path
            alt={isEnglish ? "Dental Support Team" : "فريق الدعم للأسنان"}
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
