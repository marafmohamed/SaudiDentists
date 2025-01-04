import { useState, useRef, useEffect } from "react";
import { useApp } from "@/app/Context";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface FilterProps {
  specialization: string;
  region: string;
  city: string;
  doctorName: string;
  onSearch: (
    specialization: string,
    region: string,
    city: string,
    doctorName: string
  ) => void;
  main: boolean;
}

const Filter = ({
  specialization,
  region,
  city,
  doctorName,
  onSearch,
  main,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState({
    specialization: false,
    region: false,
    city: false,
  });
  const { lang } = useApp();
  const dropdownRefs = useRef<{
    specialization: HTMLDivElement | null;
    region: HTMLDivElement | null;
    city: HTMLDivElement | null;
  }>({ specialization: null, region: null, city: null });

  const specialties = [
    "Prosthodontics",
    "Dental Technology",
    "Endodontics",
    "Periodontics",
    "Oral and Maxillofacial Surgery",
    "Pedodontics",
    "Orthodontics",
    "Restorative Dentistry",
  ];

  const specialtiesArabic = [
    "طب الأسنان التعويضي",
    "تقنية الأسنان",
    "علاج جذور الأسنان",
    "طب دواعم الأسنان",
    "جراحة الفم والوجه والفكين",
    "طب أسنان الأطفال",
    "تقويم الأسنان",
    "طب الأسنان الترميمي",
  ];

  const regions =
    lang === "en"
      ? [
          "Riyadh",
          "Mecca",
          "Medina",
          "Eastern",
          "Asir",
          "Tabuk",
          "Hail",
          "Northern Borders",
          "Jazan",
          "Najran",
          "Al-Baha",
          "Al-Jouf",
        ]
      : [
          "الرياض",
          "مكة",
          "المدينة المنورة",
          "الشرقية",
          "عسير",
          "تبوك",
          "حائل",
          "الحدود الشمالية",
          "جازان",
          "نجران",
          "الباحة",
          "الجوف",
        ];
  const cities =
    lang === "en"
      ? [
          "Abha",
          "Abqaiq",
          "Afif",
          "Al-Ahsa (Hofuf)",
          "Al-Aqiq",
          "Al-Baha",
          "Al-Darb",
          "Al-Ghazalah",
          "Al-Hanakiyah",
          "Al-Hariq",
          "Al-Jouf",
          "Al-Jumum",
          "Al-Kamil",
          "Al-Kharj",
          "Al-Lith",
          "Al-Majmaah",
          "Al-Mandaq",
          "Al-Namas",
          "Al-Nairyah",
          "Al-Quwayiyah",
          "Al-Qurayyat",
          "Al-Shinan",
          "Al-Ula",
          "Al-Wajh",
          "Arar",
          "Badr",
          "Baljurashi",
          "Baqa",
          "Bisha",
          "Dammam",
          "Dawadmi",
          "Dhahran",
          "Duba",
          "Dumat Al-Jandal",
          "Farasan",
          "Hafr Al-Batin",
          "Haql",
          "Hail",
          "Jazan",
          "Jeddah",
          "Jubail",
          "Khafji",
          "Khaibar",
          "Khobar",
          "Khulais",
          "Khamis Mushait",
          "Madinah",
          "Makkah",
          "Muhayil",
          "Najran",
          "Qatif",
          "Rabigh",
          "Rafha",
          "Ranyah",
          "Rijal Alma",
          "Riyadh",
          "Rumah",
          "Sabya",
          "Sakakah",
          "Samtah",
          "Shaqra",
          "Sharurah",
          "Tabuk",
          "Taif",
          "Tanomah",
          "Thadiq",
          "Tayma",
          "Turabah",
          "Turaif",
          "Umluj",
          "Wadi Al-Dawasir",
          "Yanbu",
          "Zulfi",
        ]
      : [
          "أبها",
          "أبقيق",
          "عفيف",
          "الأحساء (الهفوف)",
          "العقيق",
          "الباحة",
          "الدرب",
          "الغزالة",
          "الحناكية",
          "الحريق",
          "الجوف",
          "الجموم",
          "الكامل",
          "الخرج",
          "الليث",
          "المجمعة",
          "المندق",
          "النماص",
          "النعيرية",
          "القويعية",
          "القريات",
          "الشنان",
          "العلا",
          "الوجه",
          "عرعر",
          "بدر",
          "بلجرشي",
          "بقا",
          "بيشة",
          "الدمام",
          "الدوادمي",
          "الظهران",
          "ضباء",
          "دومة الجندل",
          "فرسان",
          "حفر الباطن",
          "حقل",
          "حائل",
          "جازان",
          "جدة",
          "الجبيل",
          "الخفجي",
          "خيبر",
          "الخبر",
          "خليص",
          "خميس مشيط",
          "المدينة المنورة",
          "مكة",
          "محايل",
          "نجران",
          "القطيف",
          "رابغ",
          "رفحاء",
          "رنية",
          "رجال ألمع",
          "الرياض",
          "رماح",
          "صبيا",
          "صامطة",
          "شقراء",
          "شرورة",
          "سكاكا",
          "تبوك",
          "الطائف",
          "تنومة",
          "ثادق",
          "تيماء",
          "تربة",
          "طريف",
          "أملج",
          "وادي الدواسر",
          "ينبع",
          "الزلفي",
        ].sort((a, b) => a.localeCompare(b, "ar", { sensitivity: "base" }));
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: specialization || "",
    region: region || "",
    city: city || "",
    doctorName: doctorName || "",
  });

  const toggleDropdown = (key: "specialization" | "region" | "city") => {
    setIsOpen({
      specialization: false,
      region: false,
      city: false,
      [key]: !isOpen[key],
    });
  };

  useEffect(() => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };

      if (prev.specialization) {
        const indexEn = specialties.findIndex(
          (spec) => spec === prev.specialization
        );
        const indexAr = specialtiesArabic.findIndex(
          (spec) => spec === prev.specialization
        );

        if (indexEn > 1 || indexAr > 1) {
          toast.info(
            lang === "en"
              ? "This specialization is not active yet."
              : "هذا التخصص غير نشط بعد."
          );
          updatedFilters.specialization = "";
        }

        if (lang === "en" && indexEn !== -1) {
          updatedFilters.specialization = specialties[indexEn];
        } else if (lang === "ar" && indexAr !== -1) {
          updatedFilters.specialization = specialtiesArabic[indexAr];
        } else {
          updatedFilters.specialization = "";
        }
      }

      if (prev.region) {
        const regionIndex = regions.findIndex(
          (region) => region === prev.region
        );
        if (regionIndex !== -1) {
          updatedFilters.region = regions[regionIndex];
        } else {
          updatedFilters.region = "";
        }
      }
      updatedFilters.city = "";
      return updatedFilters;
    });
  }, [lang]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRefs.current.specialization?.contains(event.target as Node) &&
        !dropdownRefs.current.region?.contains(event.target as Node) &&
        !dropdownRefs.current.city?.contains(event.target as Node)
      ) {
        setIsOpen({ specialization: false, region: false, city: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSelection = (
    key: "specialization" | "region" | "city",
    value: string
  ) => {
    if (key === "specialization") {
      const indexEn = specialties.findIndex((spec) => spec === value);
      const indexAr = specialtiesArabic.findIndex((spec) => spec === value);

      if (indexEn > 1 || indexAr > 1) {
      toast.info(
        lang === "en"
        ? "This specialization is not active yet."
        : "هذا التخصص غير نشط بعد."
      );
      return;
      }
    }
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    setIsOpen((prev) => ({ ...prev, [key]: false }));

    if (key === "region") {
      setSelectedFilters((prev) => ({ ...prev, city: "" }));
    }
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 py-12 px-10 justify-center bg-white transition-all w-full">
      <ToastContainer />
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.specialization = el;
        }}
      >
        <button
          onClick={() => toggleDropdown("specialization")}
          className={`flex py-2 md:px-8 w-full px-4 md:w-fit lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
            lang === "en" ? "" : "flex-row-reverse"
          }`}
        >
          {selectedFilters.specialization ||
            (lang === "en" ? "Choose Specialization" : "اختر التخصص")}
          <motion.div
            animate={{ rotate: isOpen.specialization ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MdKeyboardArrowDown className="h-5 w-5 text-custom-bluePrimary font-bold" />
          </motion.div>
        </button>
        {isOpen.specialization && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
          >
            {(lang === "en" ? specialties : specialtiesArabic).map((item) => (
              <div
                key={item}
                onClick={() => handleSelection("specialization", item)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-custom-blueLightHover"
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </div>
      {/* 
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.region = el;
        }}
      >
        <button
          onClick={() => toggleDropdown("region")}
          className={`flex py-2 md:px-8 w-full px-4 md:w-auto lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
            lang === "en" ? "" : "flex-row-reverse"
          }`}
        >
          {selectedFilters.region ||
            (lang === "en" ? "Choose Region" : "اختر المنطقة")}
          <motion.div
            animate={{ rotate: isOpen.region ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MdKeyboardArrowDown className="h-5 w-5 text-custom-bluePrimary font-bold" />
          </motion.div>
        </button>
        {isOpen.region && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full max-h-52 overflow-y-auto bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
          >
            {regions.map((region) => (
              <div
                key={region}
                onClick={() => handleSelection("region", region)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-custom-blueLightHover"
              >
                {region}
              </div>
            ))}
          </motion.div>
        )}
      </div> */}

      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.city = el;
        }}
      >
        <button
          onClick={() => {
            toggleDropdown("city");
          }}
          className={`flex py-2 md:px-8 w-full  px-4 md:w-80 lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
            lang === "en" ? "" : "flex-row-reverse"
          }`}
        >
          {selectedFilters.city ||
            (lang === "en" ? "Choose City" : "اختر المدينة")}
          <motion.div
            animate={{ rotate: isOpen.city ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MdKeyboardArrowDown className="h-5 w-5 text-custom-bluePrimary font-bold" />
          </motion.div>
        </button>
        {isOpen.city && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full max-h-52 overflow-y-auto bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
          >
            {cities.map((city) => (
              <div
                key={city}
                onClick={() => handleSelection("city", city)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-custom-blueLightHover"
              >
                {city}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div>
        <input
          type="text"
          value={selectedFilters.doctorName}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              doctorName: e.target.value,
            }))
          }
          placeholder={
            lang === "en" ? "Doctor Name (Optional)" : "اسم الطبيب (اختياري)"
          }
          className="py-2 px-4 w-full md:w-96 bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm text-custom-grayDark"
        />
      </div>

      <button
        onClick={async () => {
          await onSearch(
            selectedFilters.specialization,
            selectedFilters.region,
            selectedFilters.city,
            selectedFilters.doctorName
          );
        }}
        className="px-6 py-2 w-full md:w-48 bg-custom-bluePrimary text-white font-bold rounded-lg hover:bg-custom-blueDark transition-all"
      >
        {lang === "en" ? (main ? "Search" : "Filter") : main ? "بحث" : "تصفية"}
      </button>
    </div>
  );
};

export default Filter;
