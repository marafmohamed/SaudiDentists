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
    // "Endodontics",
    // "Periodontics",
    // "Oral and Maxillofacial Surgery",
    // "Pedodontics",
    // "Orthodontics",
    // "Restorative Dentistry",
  ];

  const specialtiesArabic = [
    "طب الأسنان التعويضي",
    "تقنية الأسنان",
    // "علاج جذور الأسنان",
    // "طب دواعم الأسنان",
    // "جراحة الفم والوجه والفكين",
    // "طب أسنان الأطفال",
    // "تقويم الأسنان",
    // "طب الأسنان الترميمي",
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

  const cities: { [key: string]: string[] } = {
    Riyadh: [
      "Riyadh",
      "Al-Kharj",
      "Al-Majmaah",
      "Al-Zulfi",
      "Wadi Al-Dawasir",
      "Dawadmi",
      "Shaqra",
      "Al-Quwayiyah",
      "Afif",
      "Thadiq",
      "Rumah",
      "Al-Hariq",
    ],
    الرياض: [
      "الرياض",
      "الخرج",
      "المجمعة",
      "الزلفي",
      "وادي الدواسر",
      "الدوادمي",
      "شقراء",
      "القويعية",
      "عفيف",
      "ثادق",
      "رماح",
      "الحريق",
    ],
    Mecca: [
      "Makkah",
      "Jeddah",
      "Taif",
      "Rabigh",
      "Al-Lith",
      "Khulais",
      "Al-Jumum",
      "Al-Kamil",
      "Ranyah",
      "Turabah",
    ],
    مكة: [
      "مكة",
      "جدة",
      "الطائف",
      "رابغ",
      "الليث",
      "خليص",
      "الجموم",
      "الكامل",
      "رنية",
      "تربة",
    ],
    Medina: ["Madinah", "Yanbu", "Al-Ula", "Badr", "Khaibar", "Al-Hanakiyah"],
    المدينة: ["المدينة المنورة", "ينبع", "العلا", "بدر", "خيبر", "الحناكية"],
    Eastern: [
      "Dammam",
      "Khobar",
      "Dhahran",
      "Al-Ahsa (Hofuf)",
      "Jubail",
      "Qatif",
      "Khafji",
      "Abqaiq",
      "Al-Nairyah",
      "Hafr Al-Batin",
    ],
    الشرقية: [
      "الدمام",
      "الخبر",
      "الظهران",
      "الأحساء (الهفوف)",
      "الجبيل",
      "القطيف",
      "الخفجي",
      "بقيق",
      "النعيرية",
      "حفر الباطن",
    ],
    Asir: [
      "Abha",
      "Khamis Mushait",
      "Al-Namas",
      "Muhayil",
      "Bisha",
      "Rijal Alma",
      "Tanomah",
    ],
    عسير: [
      "أبها",
      "خميس مشيط",
      "النماص",
      "محايل",
      "بيشة",
      "رجال ألمع",
      "تنومة",
    ],
    Tabuk: ["Tabuk", "Umluj", "Al-Wajh", "Duba", "Haql", "Tayma"],
    تبوك: ["تبوك", "أملج", "الوجه", "ضباء", "حقل", "تيماء"],
    Hail: ["Hail", "Al-Ghazalah", "Baqa", "Al-Shinan"],
    حائل: ["حائل", "الغزالة", "بقعاء", "الشنان"],
    "Northern Borders": ["Arar", "Rafha", "Turaif"],
    الحدود: ["عرعر", "رفحاء", "طريف"],
    Jazan: ["Jazan", "Sabya", "Abu Arish", "Samtah", "Al-Darb", "Farasan"],
    جازان: ["جازان", "صبيا", "أبو عريش", "صامطة", "الدرب", "فرسان"],
    Najran: ["Najran", "Sharurah", "Habuna"],
    نجران: ["نجران", "شرورة", "حبونا"],
    "Al-Baha": ["Al-Baha", "Baljurashi", "Al-Mandaq", "Al-Aqiq"],
    الباحة: ["الباحة", "بلجرشي", "المندق", "العقيق"],
    "Al-Jouf": ["Sakakah", "Al-Qurayyat", "Dumat Al-Jandal"],
    الجوف: ["سكاكا", "القريات", "دومة الجندل"],
  };
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
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    setIsOpen((prev) => ({ ...prev, [key]: false }));

    if (key === "region") {
      setSelectedFilters((prev) => ({ ...prev, city: "" }));
    }
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 py-12 px-10 bg-white transition-all w-full">
      <ToastContainer />
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.specialization = el;
        }}
      >
        <button
          onClick={() => toggleDropdown("specialization")}
          className={`flex py-2 md:px-8 w-full px-4 md:w-auto lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
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
      </div>

      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.city = el;
        }}
      >
        <button
          onClick={() => {
            if (!selectedFilters.region) {
              toast.warn(
                lang === "en"
                  ? "Please choose a region first."
                  : "يرجى اختيار المنطقة أولاً."
              );
            } else {
              toggleDropdown("city");
            }
          }}
          className={`flex py-2 md:px-8 w-full px-4 md:w-auto lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
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
        {isOpen.city && selectedFilters.region && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full max-h-52 overflow-y-auto bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
          >
            {cities[selectedFilters.region]?.map((city) => (
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

      <div className="flex-grow">
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
          className="py-2 px-4 w-full bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm text-custom-grayDark"
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
        {lang === "en" ? (main ? "Search" : "Filter") : (main ? "بحث" : "تصفية")}
      </button>
    </div>
  );
};

export default Filter;
