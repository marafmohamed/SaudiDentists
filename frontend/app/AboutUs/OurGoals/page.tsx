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
            {isEnglish ? "Goals of the project" : "أهداف المشروع"}
          </h3>
          <ol
            className={`text-lg md:text-xl mb-4 md:w-[90%] leading-relaxed flex flex-col gap-4  text-custom-grayWrite ${
              isEnglish ? "text-left " : "text-right ml-auto "
            }`}
          >
            {isEnglish ? (
              <>
                <li>1. Establishing a Database</li>
                <p>
                  Creating a comprehensive database for all colleagues in the
                  field of prosthodontics across the Kingdom who have been
                  officially certified by the Saudi Commission for Health
                  Specialties.
                </p>
                <li>2. Raising Awareness</li>
                <p>
                  Educating and informing the community about the group of
                  specialists and consultants in the field of prosthodontics
                  working in various regions across the Kingdom of Saudi Arabia.
                </p>
                <li>3. Facilitating Access to Distinguished Professionals</li>
                <p>
                  Simplifying access to outstanding colleagues and involving
                  them in the educational supervision process within the Saudi
                  Board Program for Prosthodontics across various training
                  centers in different regions.
                </p>
                <li>4. Streamlining Referrals</li>
                <p>
                  Facilitating the referral process for individuals in need of
                  highly skilled and experienced prosthodontic professionals in
                  different regions of the Kingdom.
                </p>
                <li>5. Enhancing the Primary Database</li>
                <p>
                  Enriching the primary database of the Saudi Society of
                  Prosthodontics.
                </p>
              </>
            ) : (
              <>
                <li>
                  ١- إﻧﺸﺎء ﻗﺎﻋﺪة ﺑﻴﺎﻧﺎت ﻟﺠﻤﻴﻊ اﻟﺰﻣﻼء واﻟﺰﻣﻴﻼت ﻓﻲ ﺗﺨﺼﺺ اﻹﺳﺘﻌﺎﺿﺔ
                  اﻟﺴﻨﻴﺔ ﻓﻲ ﺟﻤﻴﻊ أﻧﺤﺎء اﻟﻤﻤﻠﻜﺔ واﻟﺬﻳﻦ ﺗﻢ إﻋﺘﻤﺎد ﺗﺼﻨﻴﻔﻬﻢ ﻣﻦ ﻗﺒﻞ
                  اﻟﻬﻴﺌﺔ اﻟﺴﻌﻮدﻳﺔ ﻟﻠﺘﺨﺼﺼات اﻟﺼﺤﻴﺔ.
                </li>
                <li>
                  ٢- ﺗﻮﻋﻴﺔ وﺗﻌﺮﻳﻒ اﻟﻤﺠﺘﻤﻊ ﺑﺸﺮﻳﺤﺔ اﻷﺧﺼﺎﺋﻴﻴﻦ واﻹﺳﺘﺸﺎرﻳﻦ ﻓﻲ
                  اﻹﺳﺘﻌﺎﺿﺔ اﻟﺴﻨﻴﺔ واﻟﻌﺎﻣﻠﺔ ﻓﻲ ﻣﺨﺘﻠﻒ ﻣﻨﺎﻃﻖ وأﻧﺤﺎء اﻟﻤﻤﻠﻜﺔ اﻟﻌﺮﺑﻴﺔ
                  اﻟﺴﻌﻮدﻳﺔ.
                </li>
                <li>
                  ٣- ﺗﺴﻬﻴﻞ اﻟﺤﺼﻮل ﻋﻠﻰ اﻟﻜﻮادر اﻟﻤﻤﻴﺰة ﻣﻦ اﻟﺰﻣﻼء واﻟﺰﻣﻴﻼت
                  وإﺷﺮاﻛﻬﻢ ﻓﻲ ﻋﻤﻠﻴﺔ اﻹﺷﺮاف اﻟﺘﻌﻠﻴﻤﻲ ﻟﺪى ﺑﺮﻧﺎﻣﺞ اﻟﺒﻮرد اﻟﺴﻌﻮدي
                  ﻟﻺﺳﺘﻌﺎﺿﺔ اﻟﺴﻨﻴﺔ ﻓﻲ ﻣﺨﺘﻠﻒ اﻟﻤﺮاﻛﺰ اﻟﺘﺪرﻳﺒﻴﺔ واﻟﻤﻨﺘﺸﺮة ﻓﻲ ﻣﺨﺘﻠﻒ
                  اﻟﻤﻨﺎﻃﻖ.
                </li>
                <li>
                  ٤- ﺗﺴﻬﻴﻞ ﻋﻤﻠﻴﺔ اﻟﻘﻴﺎم ﺑﺈﺣﺎﻟﺔ ﻛﻞ ﻣﻦ ﻫﻢ ﻓﻲ ﺣﺎﺟﺔ أﻃﺒﺎء ذو ﻛﻔﺎءة
                  ﻋﺎﻟﻴﺔ وﺧﺒﺮة ﻓﻲ ﻣﺠﺎل اﻟﺘﺨﺼﺺ ﻓﻲ ﻣﺨﺘﻠﻒ ﻣﻨﺎﻃﻖ اﻟﻤﻤﻠﻜﺔ.
                </li>
                <li>
                  ٥- إﺛﺮاء ﻗﺎﻋﺪة اﻟﺒﻴﺎﻧﺎت اﻷوﻟﻴﺔ ﻟﻠﺠﻤﻌﻴﺔ اﻟﺴﻌﻮدﻳﺔ ﻟﻺﺳﺘﻌﺎﺿﺔ
                  اﻟﺴﻨﻴﺔ.
                </li>
              </>
            )}
          </ol>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 px-4">
          <div className="w-full flex justify-center">
            <img
              src="/Images/vision1.png"
              alt={isEnglish ? "Dental Demonstration" : "عرض الأسنان"}
              className="w-full mx-auto"
            />
          </div>
          <div className="w-full flex  ">
            <img
              src="/Images/vision2.png"
              alt={isEnglish ? "Dental Patient Care" : "رعاية المرضى"}
              className=" w-[48%] mr-auto"
            />
            <img
              src="/Images/vision3.png"
              alt={isEnglish ? "Dental Tools" : "أدوات الأسنان"}
              className=" w-[48%] ml-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
