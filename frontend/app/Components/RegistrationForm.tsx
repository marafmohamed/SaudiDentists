"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomInput from "./SmallComponents/CustomInput";
// import axios from "axios";

// Define Types
interface Location {
  area: string;
  city: string;
}

interface LocationArabic {
  areaArabic: string;
  cityArabic: string;
}

interface FormData {
  // English Fields
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  privatePhone: string;
  reservationsPhone: string;
  governmentalSector: string;
  privateSector: string;
  curriculumVitaeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  snapchatUrl: string;
  tiktokUrl: string;
  location: Location;
  profilePicture: File | null;
  locationUrl: string;
  category: string;
  title: string;
  specialty: string;

  // Arabic Fields
  usernameArabic: string;
  firstNameArabic: string;
  lastNameArabic: string;
  governmentalSectorArabic: string;
  privateSectorArabic: string;
  curriculumVitaeUrlArabic: string;
  locationArabic: LocationArabic;
  categoryArabic: string;
  titleArabic: string;
  specialtyArabic: string;
  description: string;
  descriptionArabic: string;
}

const categories: string[] = ["Category1", "Category2", "Category3"];

const specialties: string[] = [
  "Prosthodontics",
  "Dental Technology",
  "Endodontics",
  "Periodontics",
  "Oral and Maxillofacial Surgery",
  "Pedodontics",
  "Orthodontics",
  "Restorative Dentistry",
];

const specialtiesArabic: string[] = [
  "طب الأسنان التعويضي",
  "تقنية الأسنان",
  "علاج جذور الأسنان",
  "طب دواعم الأسنان",
  "جراحة الفم والوجه والفكين",
  "طب أسنان الأطفال",
  "تقويم الأسنان",
  "طب الأسنان الترميمي",
];
const cities1: string[] = ["Riyadh", "Al-Kharj", "Al-Qassim"];
const cities2: string[] = ["Mecca", "Jeddah", "Taif", "Yanbu", "Medina"];
const cities3: string[] = [
  "Dammam",
  "Khobar",
  "Jubail",
  "Al-Ahsa",
  "Qatif",
  "Dhahran",
];
const cities4: string[] = ["Abha", "Khamis Mushait", "Jazan", "Najran"];
const cities5: string[] = ["Tabuk"];
const arabicCities1: string[] = ["الرياض", "الخرج", "القصيم"];
const arabicCities2: string[] = ["مكة", "جدة", "الطائف", "ينبع", "المدينة"];
const arabicCities3: string[] = [
  "الدمام",
  "الخبر",
  "الجبيل",
  "الأحساء",
  "القطيف",
  "الظهران",
];
const arabicCities4: string[] = ["أبها", "خميس مشيط", "جيزان", "نجران"];
const arabicCities5: string[] = ["تبوك"];
export default function RegistrationForm() {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData>({
    // English Fields
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    privatePhone: "",
    reservationsPhone: "",
    governmentalSector: "",
    privateSector: "",
    curriculumVitaeUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    snapchatUrl: "",
    tiktokUrl: "",
    location: { area: "", city: "" },
    profilePicture: null,
    locationUrl: "",
    category: "",
    title: "",
    specialty: "",

    // Arabic Fields
    usernameArabic: "",
    firstNameArabic: "",
    lastNameArabic: "",
    governmentalSectorArabic: "",
    privateSectorArabic: "",
    curriculumVitaeUrlArabic: "",
    locationArabic: { areaArabic: "", cityArabic: "" },
    categoryArabic: "",
    titleArabic: "",
    specialtyArabic: "",
    description: "",
    descriptionArabic: "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as Record<string, any>),
          [child]: value,
        },
      }));
    } else if (name.includes("locationArabic.")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Uncomment and implement actual API call
      // const response = await axios.post("/api/register", formData);
      console.log("Form Data:", formData);
      alert("Registration submitted successfully!");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting registration form.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const validateStep1 = () => {
    if (
      formData.username.trim() === "" ||
      formData.firstName.trim() === "" ||
      formData.lastName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.privatePhone.trim() === "" ||
      formData.reservationsPhone.trim() === "" ||
      formData.governmentalSector.trim() === "" ||
      formData.privateSector.trim() === "" ||
      formData.curriculumVitaeUrl.trim() === "" ||
      formData.location.area.trim() === "" ||
      formData.location.city.trim() === "" ||
      formData.profilePicture === null ||
      formData.locationUrl.trim() === "" ||
      formData.category.trim() === "" ||
      formData.title.trim() === "" ||
      formData.specialty.trim() === ""
    ) {
      setErrors([
        ...errors,
        { name: "step1", message: "Please fill in all required fields" },
      ]);
      return;
    }
    //check the phone numbers and the email and urls with regex if they are valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  };

  const isStep2Valid = (): boolean => {
    return (
      // English Fields Validation
      formData.privatePhone.trim() !== "" &&
      formData.reservationsPhone.trim() !== "" &&
      formData.governmentalSector.trim() !== "" &&
      formData.privateSector.trim() !== "" &&
      formData.curriculumVitaeUrl.trim() !== "" &&
      formData.location.area.trim() !== "" &&
      formData.location.city.trim() !== "" &&
      // Arabic Fields Validation
      formData.locationArabic.areaArabic.trim() !== "" &&
      formData.locationArabic.cityArabic.trim() !== "" &&
      formData.governmentalSectorArabic.trim() !== "" &&
      formData.privateSectorArabic.trim() !== "" &&
      formData.curriculumVitaeUrlArabic.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.descriptionArabic.trim() !== ""
    );
  };

  const renderStep1 = () => (
    <div className="flex flex-col justify-center w-full mt-3 text-[#212529]">
      <h3 className="md:text-lg font-normal text-center mb-4">
        <span className="font-bold">Note:</span>The Mobile Number Provided Must
        Be The WhatsApp Number, As All Communication Will Be Conducted Via
        WhatsApp.
      </h3>
      <form
        onSubmit={(e) => {
          //   e.preventDefault();
          //   if () {
          //     setStep(2);
          //   } else {
          //     alert("Please fill in all required fields in Step 1");
          //   }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
      >
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Username</label>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>First Name</label>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Last Name</label>
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Private Phone (Will not be displayed on the website)</label>
          <input
            name="privatePhone"
            placeholder="Private Phone"
            value={formData.privatePhone}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex items-center justify-between  max-w-full">
          <div className="flex flex-col justify-start items-start w-[30%] gap-2">
            <label>categories</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-start items-start w-[30%] gap-2">
            <label>Titel</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">Select title</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-start w-[30%] gap-2">
            <label>Specialty</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">Select Specialty</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Reservations Phone (Will be displayed)</label>
          <PhoneInput
            international
            value={phoneValue}
            onChange={setPhoneValue}
            className="px-2 w-[90%]"
            inputComponent={CustomInput}
            placeholder="Reservations Phone"
          />
        </div>
        <div className="flex items-center justify-between  gap-4 max-w-full">
          <div className="flex flex-col justify-start items-start w-1/2 gap-2">
            <label>Area</label>
            <select
              name="location.area"
              value={formData.location.area}
              onChange={handleChange}
              className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">Select Area</option>
              <option value="Central Region">Central Region</option>
              <option value="Western Region">Western Region</option>
              <option value="Eastern Region">Eastern Region</option>
              <option value="Southern Region">Southern Region</option>
              <option value="Northern Region">Northern Region</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-start w-1/2 gap-2">
            <label>City</label>
            <select
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              //   onFocus={(e) => {
              //     if (formData.location.area === "") {
              //       alert("Please select an area first");
              //       e.preventDefault();
              //     }
              //   }}
              className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">Select City</option>
              {/* based on the option of the region choose the cities to show if none when clicked an error message */}
              {formData.location.area === "Central Region" &&
                cities1.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.location.area === "Western Region" &&
                cities2.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.location.area === "Eastern Region" &&
                cities3.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.location.area === "Southern Region" &&
                cities4.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.location.area === "Northern Region" &&
                cities5.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Governmental sector</label>
          <input
            name="governmentalSector"
            placeholder="Governmental sector"
            value={formData.governmentalSector}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Profile Picture (Your Photo)</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Private sector</label>
          <input
            name="privateSector"
            placeholder="Private sector"
            value={formData.privateSector}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Your Google location URL to your private practice</label>
          <input
            name="locationUrl"
            placeholder="Location URL"
            value={formData.locationUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              alert(
                "Please copy the link from the google map and paste it here"
              );
            }}
            className="flex justify-center items-center bg-custom-grayWrite mt-2 text-white p-2 rounded-lg"
          >
            Add another location
          </button>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Upload curriculum vitae (C.V.)</label>
          <input
            type="file"
            name="curriculumVitaeUrl"
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Twitter URL</label>
          <input
            name="twitterUrl"
            placeholder="Twitter URL"
            value={formData.twitterUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>
            A concise description of your affiliation, to be featured on the
            club's website.
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Instagram URL</label>
          <input
            name="instagramUrl"
            placeholder="Instagram URL"
            value={formData.instagramUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>LinkedIn URL</label>
          <input
            name="linkedinUrl"
            placeholder="LinkedIn URL"
            value={formData.linkedinUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>{" "}
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Tiktok Url</label>
          <input
            name="tiktokUrl"
            placeholder="Tiktok URL"
            value={formData.tiktokUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Snapchat URL</label>
          <input
            name="snapchatUrl"
            placeholder="Snapchat URL"
            value={formData.snapchatUrl}
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
        </div>
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-custom-bluePrimary text-white px-4 py-2 w-80 text-lg font-bold drop-shadow-md shadow-md rounded-lg"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* English Fields */}
      <input
        name="privatePhone"
        placeholder="Private Phone"
        value={formData.privatePhone}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="reservationsPhone"
        placeholder="Reservations Phone"
        value={formData.reservationsPhone}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="governmentalSector"
        placeholder="Governmental Sector"
        value={formData.governmentalSector}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="privateSector"
        placeholder="Private Sector"
        value={formData.privateSector}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="curriculumVitaeUrl"
        placeholder="Curriculum Vitae URL"
        value={formData.curriculumVitaeUrl}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="location.area"
        placeholder="Area"
        value={formData.location.area}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="location.city"
        placeholder="City"
        value={formData.location.city}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      {/* Arabic Fields */}
      <input
        name="locationArabic.areaArabic"
        placeholder="المنطقة"
        value={formData.locationArabic.areaArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />
      <input
        name="locationArabic.cityArabic"
        placeholder="المدينة"
        value={formData.locationArabic.cityArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />
      <input
        name="governmentalSectorArabic"
        placeholder="القطاع الحكومي"
        value={formData.governmentalSectorArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />
      <input
        name="privateSectorArabic"
        placeholder="القطاع الخاص"
        value={formData.privateSectorArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />
      <input
        name="curriculumVitaeUrlArabic"
        placeholder="رابط السيرة الذاتية"
        value={formData.curriculumVitaeUrlArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />
      <textarea
        name="description"
        placeholder="A concise description of your affiliation, to be featured on the club's website"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <textarea
        name="descriptionArabic"
        placeholder="وصف موجز لانتمائك ، ليتم نشره على موقع النادي"
        value={formData.descriptionArabic}
        onChange={handleChange}
        className="border p-2 rounded text-right"
        required
      />

      {/* Optional Social Media Fields */}
      <input
        name="twitterUrl"
        placeholder="Twitter URL"
        value={formData.twitterUrl}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="instagramUrl"
        placeholder="Instagram URL"
        value={formData.instagramUrl}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="linkedinUrl"
        placeholder="LinkedIn URL"
        value={formData.linkedinUrl}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="snapchatUrl"
        placeholder="Snapchat URL"
        value={formData.snapchatUrl}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      {/* File Upload for Profile Picture */}
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileUpload}
          className="mt-1 block text-right w-1/2"
        />
      </div>
    </form>
  );

  return (
    <div className="w-full px-16 mx-auto py-8 md:py-16">
      <h1 className="text-5xl font-bold text-center mb-8">Registration Form</h1>
      {step === 1 ? renderStep1() : renderStep2()}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>
      )}
    </div>
  );
}
