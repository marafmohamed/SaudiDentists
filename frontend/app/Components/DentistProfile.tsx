import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Image from "next/image";
import {
  FaSnapchat,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { useApp } from "@/app/Context"; // Path to useApp hook
import { RequestData } from "./SmallComponents/RequestPopup";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

interface ProfilePageProps {
  data: RequestData;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  data,
}: ProfilePageProps) => {
  const { lang } = useApp(); // Get the current language
  const [showNotifyCopied, setShowNotifyCopied] = React.useState(false);

  // Determine displayed text based on language
  const title =
    lang === "ar"
      ? data.titleArabic == "بروفيسور"
        ? "البروفيسور"
        : data.titleArabic
      : data.title;
  const lastName = lang === "ar" ? data.lastNameArabic : data.lastName;
  const firstName = lang === "ar" ? data.firstNameArabic : data.firstName;
  const area =
    lang === "ar" ? data.locationArabic.areaArabic : data.location.area;
  const city =
    lang === "ar" ? data.locationArabic.cityArabic : data.location.city;
  return (
    <motion.div
      className="p-6 lg:p-10 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb */}
      <div
        className={`text-sm text-custom-grayDark mb-6 font-bold ${
          lang == "en" ? "" : "ml-auto text-right"
        }`}
      >
        <Link href="/" className="hover:underline">
          {lang === "ar" ? "الصفحة الرئيسية" : "Home"}
        </Link>{" "}
        /{" "}
        <Link href="/Experts" className="hover:underline">
          {lang === "ar" ? "تعرف على نخبة الاطباء" : "Meet Our Experts"}
        </Link>{" "}
        / {title} {firstName} {lastName}
      </div>

      <motion.div
        className={`flex flex-col bg-white rounded-lg shadow-lg p-6 lg:p-10 ${
          lang == "en" ? "md:flex-row" : " md:flex-row-reverse text-right gap-4"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Profile Picture */}
        <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
          <img
            src={
              data.profilePicture
                ? data.profilePicture
                : data.gender === "male"
                ? "/Images/Default-ProfileMale.jpg"
                : "/Images/Default-ProfileFemale.png"
            }
            alt={`${data.firstName}'s profile picture`}
            className="rounded-lg object-fit w-[400px] h-[250px] md:h-[400px]"
          />
        </div>

        {/* Details */}
        <div className="lg:w-2/3 lg:pl-8">
          <h1 className="text-2xl font-bold text-custom-dark mb-2">
            {title} {firstName} {lastName}
          </h1>
          <p className="text-custom-grayDark mb-4">
            <strong>{lang === "ar" ? "المدينة:" : "City:"}</strong> {area}{" "}
            {city}
          </p>
          <p className="text-custom-grayDark mb-4">
            {lang == "ar" ? data.categoryArabic : data.category}
          </p>
          {data.privateSector && (
            <p className="text-custom-grayDark mb-4">
              <strong>
                {lang === "ar" ? "قطاع العمل الخاص :" : "Private Sector:"}
              </strong>{" "}
              {lang == "ar" ? data.privateSectorArabic : data.privateSector}
            </p>
          )}
          {data.governmentalSector && (
            <p className="text-custom-grayDark mb-4">
              <strong>
                {lang === "ar" ? "قطاع العمل الحكومي :" : "Govermental Sector:"}
              </strong>{" "}
              {lang == "ar"
                ? data.governmentalSectorArabic
                : data.governmentalSector}
            </p>
          )}
          <h2 className="text-lg font-semibold text-custom-bluePrimary mb-2">
            {lang === "ar" ? "نبذة مختصرة" : "Brief Biography"}
          </h2>
          <div className="text-custom-grayDark mb-6">
            {(lang === "ar" ? data.descriptionArabic : data.description)
              .split("*")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
          {/* Buttons */}
          <div
            className={`flex flex-col gap-4 mb-6 ${
              lang == "en" ? "" : "justify-end"
            }`}
          >
            <div
              className={`flex flex-col ${
                lang == "ar" ? " items-end" : " items-start"
              }`}
            >
              <h1 className="text-lg font-semibold text-custom-bluePrimary mb-2">
                {lang == "ar" ? "للمواعيد" : "For Appointements"}
              </h1>
              <motion.button
                onClick={() => {
                  // When clicked, the reservation phone is copied
                  if (data.reservationsPhone) {
                    navigator.clipboard.writeText(data.reservationsPhone);
                    setShowNotifyCopied(true);
                    setTimeout(() => {
                      setShowNotifyCopied(false);
                    }, 1000);
                  }
                }}
                className="px-4 py-2 relative bg-custom-greenPrimary w-40 text-white rounded-md shadow-md hover:bg-green-600"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {data.reservationsPhone}
                {showNotifyCopied && (
                  <span className="absolute top-12 right-0 bg-custom-grayWrite/40 text-white px-2 py-1 rounded-md">
                    {lang === "ar" ? "تم النسخ!" : "Copied!"}
                  </span>
                )}
              </motion.button>
            </div>
            <div
              className={`flex flex-col ${
                lang == "ar" ? " items-end" : " items-start"
              }`}
            >
              <h1 className="text-lg font-semibold text-custom-bluePrimary mb-2">
                {lang == "ar" ? "مواقع العمل" : "Work locations"}
              </h1>
              <div className="flex flex-wrap gap-2">
                {data.locationUrl?.map((url, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-custom-bluePrimary w-28 text-white rounded-md shadow-md hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {lang === "ar"
                      ? `الموقع ${index + 1}`
                      : `Location ${index + 1}`}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
            {/* Social Media Links */}
          {(data.snapchatUrl || data.instagramUrl || data.tiktokUrl || data.linkedinUrl || data.twitterUrl || data.youtubeUrl) && (
            <h2 className="text-lg font-semibold text-custom-bluePrimary mb-2">
              {lang === "ar" ? "مواقع التواصل الاجتماعي" : "Social media"}
            </h2>
          )}
          {/* Social Media Links */}
          <div className={`flex items-center gap-4 ${lang == "en" ? "" : "flex-row-reverse"}`}>

            {data.snapchatUrl && (
              <a
                href={data.snapchatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaSnapchat />
              </a>
            )}
            {data.instagramUrl && (
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaInstagram />
              </a>
            )}
            {data.tiktokUrl && (
              <a
                href={data.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaTiktok />
              </a>
            )}
            {data.linkedinUrl && (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaLinkedin />
              </a>
            )}
            {data.twitterUrl && (
              <a
                href={data.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaXTwitter />
              </a>
            )}
            {data.youtubeUrl && (
              <a
                href={data.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaYoutube />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* CV Section */}
      <div className="mt-10 bg-custom-grayLight p-4 rounded-md flex items-center gap-4">
        <Image
          src="/Logos/pdf.svg"
          alt="PDF icon"
          width={100}
          height={100}
          className="object-contain"
        />
        <div>
          <a
            href={
              typeof data.curriculumVitaeUrl === "string"
                ? data.curriculumVitaeUrl
                : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-bluePrimary hover:underline"
          >
            {lang === "ar" ? "تحميل" : "Download"}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
