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
        secondWord={"Vision and Goals"}
        firstWordAr={"من نحن"}
        secondWordAr={"الرؤية والأهداف"}
      />
      <div className="mx-auto px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row items-start justify-between">
        {/* Content Section */}
        <div className="w-full md:w-2/3 mb-8 md:mb-0 ">
          <h2 className="text-2xl md:text-2xl w-full flex items-center justify-center bg-custom-bluePrimary/30 font-bold mb-6 ">
            {isEnglish ? "Vision and Goals" : "الرؤية والأهداف"}
          </h2>
          <h3
            className={`text-lg w-full md:text-xl  font-medium mb-4  ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {isEnglish
              ? "Goals of the project"
              : "أهداف المشروع"}
          </h3>
          <ol
            className={`text-lg md:text-xl mb-4 md:w-[90%] leading-relaxed flex flex-col gap-4  text-custom-grayWrite ${
              isEnglish ? "text-left " : "text-right ml-auto "
            }`}
          >
            {isEnglish ? (
              <>
                <li>1. Establishment of a database for all colleagues in the field of prosthodontics throughout the Kingdom, whose classification has been approved by the Saudi Commission for Health Specialties.</li>
                <li>2. Sharing some of these information with the community in need to guarantee their full awareness toward the qualified licensed specialists and consultants in prosthodontics in Saudi Arabia.</li>
                <li>3. Facilitating the recruitment of our colleagues to participate in the teaching process of Saudi prosthodontic board residents in the different training centers all over the kingdom of Saudi Arabia.</li>
                <li>4. Facilitating patients referral between us who are in need of qualified Prosthodontists by knowing our geographic distribution within the different cities of Saudi Arabia.</li>
                <li>5. Enrich the database of the newly established Saudi Prosthodontic Society.</li>
              </>
            ) : (
              <>
                <li>١. إنشاء قاعدة بيانات لجميع الزملاء في مجال الأسنان التعويضية في جميع أنحاء المملكة، والتي تم اعتماد تصنيفها من قبل الهيئة السعودية للتخصصات الصحية.</li>
                <li>٢. مشاركة بعض هذه المعلومات مع المجتمع لضمان وعيهم الكامل بالمتخصصين والاستشاريين المرخصين المؤهلين في مجال الأسنان التعويضية في المملكة العربية السعودية.</li>
                <li>٣. تسهيل استقطاب زملائنا للمشاركة في عملية التعليم لأطباء البورد السعودي في الأسنان التعويضية في مراكز التدريب المختلفة في جميع أنحاء المملكة.</li>
                <li>٤. تسهيل إحالة المرضى بيننا ممن هم بحاجة إلى أطباء أسنان تعويضية مؤهلين من خلال معرفة توزيعنا الجغرافي في مدن المملكة المختلفة.</li>
                <li>٥. إثراء قاعدة بيانات الجمعية السعودية للأسنان التعويضية المنشأة حديثًا.</li>
              </>
            )}
          </ol>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 px-4">
          <div className="w-full flex justify-center">
            <img
              src="/images/vision1.png"
              alt={isEnglish ? "Dental Demonstration" : "عرض الأسنان"}
              className="w-full mx-auto"
            />
          </div>
          <div className="w-full flex  ">
            <img
              src="/images/vision2.png"
              alt={isEnglish ? "Dental Patient Care" : "رعاية المرضى"}
              className=" w-[48%] mr-auto"
            />
            <img
              src="/images/vision3.png"
              alt={isEnglish ? "Dental Tools" : "أدوات الأسنان"}
              className=" w-[48%] ml-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
