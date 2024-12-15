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
          <h3
            className={`text-lg w-full md:text-xl  font-medium mb-4  ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {isEnglish
              ? "We Care About Your Dental Health"
              : "نحن نهتم بصحة أسنانك"}
          </h3>
          <p
            className={`text-lg md:text-xl mb-2 md:w-[90%] leading-relaxed  text-custom-grayWrite ${
              isEnglish ? "text-left " : "text-right ml-auto "
            }`}
          >
            {isEnglish
              ? "The International Dental Support Club, composed of dentists who share the same values and qualifications from all over the world, is formed to provide our patients with immediate dental care when they are out of the country or away from their homeland. Providing the patient's prompt and reliable care becomes a top priority in these situations, which can be extremely difficult for both the patient and the recommending dentist. Recognizing this need, this support team was established."
              : "يتكون نادي الدعم الدولي للأسنان من أطباء أسنان يشتركون في نفس القيم والمؤهلات من جميع أنحاء العالم، وتم تشكيله لتقديم الرعاية الفورية لمرضانا عندما يكونون خارج بلدانهم أو بعيدين عن أوطانهم. إن توفير الرعاية السريعة والموثوقة للمريض يصبح أولوية قصوى في هذه الحالات، والتي قد تكون صعبة للغاية على كل من المريض والطبيب الموصي. واعترافًا بهذه الحاجة، تم تأسيس فريق الدعم هذا."}
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img
            src="/images/about_the_club.png" // Replace with the actual image path
            alt={isEnglish ? "Dental Support Team" : "فريق الدعم للأسنان"}
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
