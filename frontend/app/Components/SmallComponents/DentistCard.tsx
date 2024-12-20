import React from "react";
import { useApp } from "@/app/Context"; // Adjust the path to your useApp hook

interface CardProps {
  name: string;
  city: string;
  nameArabic: string;
  cityArabic: string;
  profilePicture: string;
  onViewProfile: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  city,
  nameArabic,
  cityArabic,
  profilePicture,
  onViewProfile,
}) => {
  // Get the current language from the useApp hook
  const { lang } = useApp();

  // Determine displayed text based on language
  const displayedName = lang === "ar" ? nameArabic : name;
  const displayedCity = lang === "ar" ? cityArabic : city;

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-80 pb-16 mx-auto">
      {/* Profile Picture */}
      <div className="absolute -top-10">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profilePicture}
            alt={displayedName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-custom-dark">{displayedName}</h3>
        <p className="text-sm text-custom-grayDark">{displayedCity}</p>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewProfile}
        className="mt-4 px-6 py-2 bg-custom-bluePrimary text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
      >
        {lang === "ar" ? "عرض الملف الشخصي" : "See Profile"}
      </button>
    </div>
  );
};

export default Card;
