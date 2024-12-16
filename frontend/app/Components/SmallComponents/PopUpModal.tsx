import React from "react";
import { useApp } from "@/app/Context"; // Replace this with the correct import path
import { useRouter } from "next/navigation";

export default function PopUpModal() {
  const { lang } = useApp(); // Access global language variable
  const router = useRouter();

  // Determine messages based on the language
  const messages = {
    en: {
      heading: "Thanks you for joining us",
      body: "Your Submission is in review. Please wait and check your email",
      home: "Home",
    },
    ar: {
      heading: "شكرًا لانضمامك إلينا",
      body: "تم إرسال طلبك للمراجعة. يرجى الانتظار وفحص بريدك الإلكتروني",
      home: "الصفحة الرئيسية",
    },
  };

  const currentLang = lang === "ar" ? messages.ar : messages.en;

  // Function to handle home redirection
  const goHome = () => {
    router.push("/"); // Replace '/' with the correct home route
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }} // Ensures it's above all content
    >
      <div className="bg-white w-[80%] h-[40%] flex flex-col justify-center items-center gap-6 md:h-[80%] md:w-[60%] rounded-lg p-8 text-center shadow-lg">
        <h2 className="text-4xl  font-bold text-custom-dark mb-3">
          {currentLang.heading}
        </h2>
        <p className="text-custom-grayWrite font-semibold text-xl mb-5">{currentLang.body}</p>
        <button
          onClick={goHome}
          className="bg-gray-200 text-custom-bluePrimary w-52 font-bold text-lg py-2 px-4 rounded-md hover:bg-gray-300"
        >
          {currentLang.home}
        </button>
      </div>
    </div>
  );
}
