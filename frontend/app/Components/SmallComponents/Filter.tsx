import { useState, useRef, useEffect } from "react";
import { useApp } from "@/app/Context";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
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
}

const Filter = ({
  specialization,
  region,
  city,
  doctorName,
  onSearch,
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
      ? ["Central", "Western", "Eastern", "Southern", "Northern"]
      : [
          "المنطقة الوسطى",
          "المنطقة الغربية",
          "المنطقة الشرقية",
          "المنطقة الجنوبية",
          "المنطقة الشمالية",
        ];

  const regionMapping: { [key: string]: string } = {
    Central: "Central",
    "المنطقة الوسطى": "Central",
    Western: "Western",
    "المنطقة الغربية": "Western",
    Eastern: "Eastern",
    "المنطقة الشرقية": "Eastern",
    Southern: "Southern",
    "المنطقة الجنوبية": "Southern",
    Northern: "Northern",
    "المنطقة الشمالية": "Northern",
  };

  const cities = {
    Central:
      lang === "en"
        ? ["Riyadh", "Al-Kharj", "Al-Qassim"]
        : ["الرياض", "الخرج", "القصيم"],
    Western:
      lang === "en"
        ? ["Mecca", "Jeddah", "Taif", "Yanbu", "Medina"]
        : ["مكة", "جدة", "الطائف", "ينبع", "المدينة"],
    Eastern:
      lang === "en"
        ? ["Dammam", "Khobar", "Jubail", "Al-Ahsa", "Qatif", "Dhahran"]
        : ["الدمام", "الخبر", "الجبيل", "الأحساء", "القطيف", "الظهران"],
    Southern:
      lang === "en"
        ? ["Abha", "Khamis Mushait", "Jazan", "Najran"]
        : ["أبها", "خميس مشيط", "جيزان", "نجران"],
    Northern: lang === "en" ? ["Tabuk"] : ["تبوك"],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    specialization: specialization || "",
    region: region || "",
    city: city || "",
    doctorName: doctorName || "",
  });

  const toggleDropdown = (key: "specialization" | "region" | "city") => {
    setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  useEffect(() => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
  
      // Update specialization
      if (prev.specialization) {
        const indexEn = specialties.findIndex((spec) => spec === prev.specialization);
        const indexAr = specialtiesArabic.findIndex((spec) => spec === prev.specialization);
  
        if (lang === "en" && indexEn !== -1) {
          updatedFilters.specialization = specialties[indexEn];
        } else if (lang === "ar" && indexAr !== -1) {
          updatedFilters.specialization = specialtiesArabic[indexAr];
        } else {
          // If the selected value is not found, reset it
          updatedFilters.specialization = "";
        }
      }
  
      // Update region
      if (prev.region) {
        const regionIndex = regions.findIndex((region) => region === prev.region);
        if (regionIndex !== -1) {
          updatedFilters.region = regions[regionIndex];
        } else {
          // If the region is not found, reset it
          updatedFilters.region = "";
        }
      }
  
      // Update city
      if (prev.city && prev.region) {
        const regionKey = regionMapping[prev.region] as keyof typeof cities;
        const regionCities = cities[regionKey] || [];
        const cityIndex = regionCities.findIndex((city) => city === prev.city);
  
        if (cityIndex !== -1) {
          updatedFilters.city = regionCities[cityIndex];
        } else {
          // If the city is not found, reset it
          updatedFilters.city = "";
        }
      }
  
      return updatedFilters;
    });
  }, [lang]);
  

  

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
      {/* Specialization Dropdown */}
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

      {/* Region Dropdown */}
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
            className="absolute left-0 w-full bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
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

      {/* City Dropdown */}
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current.city = el;
        }}
      >
        <button
          onClick={() => toggleDropdown("city")}
          className={`flex py-2 md:px-8 w-full px-4 md:w-auto lg:px-24 font-bold text-custom-grayDark justify-between bg-custom-filterGray rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm items-center ${
            lang === "en" ? "" : "flex-row-reverse"
          }`}
          disabled={!selectedFilters.region}
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
            className="absolute left-0 w-full bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA] z-10"
          >
            {cities[
              regionMapping[selectedFilters.region] as keyof typeof cities
            ]?.map((city) => (
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

      {/* Doctor Name Input */}
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

      {/* Search Button */}
      <button
        onClick={async () => {
          if (selectedFilters.city === "" || selectedFilters.region === "") {
            alert(
              lang == "en"
                ? "Please choose a city before proceeding"
                : "الرجاء اختيار مدينة قبل المتابعة"
            );
            return;
          }
          await onSearch(
            selectedFilters.specialization,
            selectedFilters.region,
            selectedFilters.city,
            selectedFilters.doctorName
          );
        }}
        className="px-6 py-2 w-full md:w-48 bg-custom-bluePrimary text-white font-bold rounded-lg hover:bg-custom-blueDark transition-all"
      >
        {lang === "en" ? "Search" : "بحث"}
      </button>
    </div>
  );
};

export default Filter;
