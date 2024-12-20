"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomInput from "./SmallComponents/CustomInput";
import { BiTrash } from "react-icons/bi";
import useRequet from "../Hooks/useRequet";
import PopUpModal from "./SmallComponents/PopUpModal";
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

export interface FormData {
  _id: string;
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
  curriculumVitaeUrl: File | string | null;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  snapchatUrl: string;
  tiktokUrl: string;
  location: Location;
  profilePicture: File | string | null;
  locationUrl: string[];
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
  [key: string]: any;
}

const categories: string[] = ["Category1", "Category2", "Category3"];
const categoriesArabic: string[] = ["الفئة1", "الفئة2", "الفئة3"];
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
interface RegistrationFormProps {
  initialData?: FormData;
}
export default function RegistrationForm({
  initialData,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    _id: initialData?._id || "",
    // English Fields
    username: initialData?.username || "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    password: "",
    privatePhone: initialData?.privatePhone || "",
    reservationsPhone: initialData?.reservationsPhone || "",
    governmentalSector: initialData?.governmentalSector || "",
    privateSector: initialData?.privateSector || "",
    curriculumVitaeUrl: initialData?.curriculumVitaeUrl || null,
    twitterUrl: initialData?.twitterUrl || "",
    instagramUrl: initialData?.instagramUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    snapchatUrl: initialData?.snapchatUrl || "",
    tiktokUrl: initialData?.tiktokUrl || "",
    location: initialData?.location || { area: "", city: "" },
    profilePicture: initialData?.profilePicture || null,
    locationUrl: initialData?.locationUrl || [],
    category: initialData?.category || "",
    title: initialData?.title || "",
    specialty: initialData?.specialty || "",

    // Arabic Fields
    usernameArabic: initialData?.usernameArabic || "",
    firstNameArabic: initialData?.firstNameArabic || "",
    lastNameArabic: initialData?.lastNameArabic || "",
    governmentalSectorArabic: initialData?.governmentalSectorArabic || "",
    privateSectorArabic: initialData?.privateSectorArabic || "",
    curriculumVitaeUrlArabic: initialData?.curriculumVitaeUrlArabic || "",
    locationArabic: initialData?.locationArabic || {
      areaArabic: "",
      cityArabic: "",
    },
    categoryArabic: initialData?.categoryArabic || "",
    titleArabic: initialData?.titleArabic || "",
    specialtyArabic: initialData?.specialtyArabic || "",
    description: initialData?.description || "",
    descriptionArabic: initialData?.descriptionArabic || "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPopUPSucces, setShowPopUpSucces] = useState(false);
  const { CreateRequest } = useRequet();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;
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
    } else if (name === "profilePicture" || name === "curriculumVitaeUrl") {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async () => {
    console.log(formData);
    const errors = validateForm();
    if (errors.length > 0) {
      return;
    }

    try {
      setLoading(true);
      const CreatedRequest = await CreateRequest(formData);
      if (CreatedRequest.error) {
        alert(CreatedRequest.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      setShowPopUpSucces(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const validateStep1 = () => {
    let errors = [];
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
      formData.curriculumVitaeUrl === null ||
      formData.location.area.trim() === "" ||
      formData.location.city.trim() === "" ||
      formData.profilePicture === null ||
      formData.locationUrl.length === 0 ||
      formData.category.trim() === "" ||
      formData.title.trim() === "" ||
      formData.specialty.trim() === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }
    //check the phone numbers and the email and urls with regex if they are valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!emailRegex.test(formData.email)) {
      errors.push({ name: "email", message: "Please enter a valid email" });
    }
    for (const url of formData.locationUrl) {
      if (!urlRegex.test(url)) {
        errors.push({
          name: "locationUrl",
          message: "Please enter a valid URL for the location",
        });
      }
    }
    if (!phoneRegex.test(formData.privatePhone)) {
      errors.push({
        name: "privatePhone",
        message: "Please enter a valid phone number",
      });
    }
    if (!phoneRegex.test(formData.reservationsPhone)) {
      errors.push({
        name: "reservationsPhone",
        message: "Please enter a valid phone number",
      });
    }
    if (errors.length === 0) setStep(2);
    setErrors(errors);
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
          e.preventDefault();
          validateStep1();
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
          {errors.length > 0 && (
            <p className="text-red-500">
              {errors.find((e) => e.name === "email")?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Private Phone (Will not be displayed on the website)</label>
          <PhoneInput
            international
            value={formData.privatePhone}
            onChange={(value) =>
              handleChange({ target: { name: "privatePhone", value } } as any)
            }
            className="w-full"
            inputComponent={CustomInput}
            placeholder="Private Phone"
          />
          {errors.length > 0 && (
            <p className="text-red-500">
              {errors.find((e) => e.name === "privatePhone")?.message}
            </p>
          )}
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
            value={formData.reservationsPhone}
            onChange={(value) =>
              handleChange({
                target: { name: "reservationsPhone", value },
              } as any)
            }
            className="w-full"
            inputComponent={CustomInput}
            placeholder="Reservations Phone"
          />
          {errors.length > 0 && (
            <p className="text-red-500">
              {errors.find((e) => e.name === "reservationsPhone")?.message}
            </p>
          )}
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
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg"
          />
          {formData.profilePicture && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file:{" "}
              {formData.profilePicture instanceof File
                ? formData.profilePicture.name
                : formData.profilePicture}
            </p>
          )}
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
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
          />
          {formData.locationUrl.length > 0 &&
            formData.locationUrl.map((url, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-center"
              >
                <p className="w-[80%]">{url}</p>
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      locationUrl: prev.locationUrl.filter(
                        (_, i) => i !== index
                      ),
                    }));
                  }}
                >
                  <BiTrash className=" text-custom-dark hover:text-red-600 transition-all hover:scale-[102%]" />
                </button>
              </div>
            ))}

          <div
            onClick={() => {
              if (currentLocation === "") {
                alert("Please fill in the location URL");
                return;
              }
              setFormData((prev) => ({
                ...prev,
                locationUrl: [...prev.locationUrl, currentLocation],
              }));
              setCurrentLocation("");
            }}
            className="flex cursor-pointer justify-center items-center bg-custom-grayWrite mt-2 text-white p-2 rounded-lg"
          >
            Add another location
          </div>
          {errors.length > 0 && (
            <p className="text-red-500">
              {errors.find((e) => e.name === "locationUrl")?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label>Upload curriculum vitae (C.V.)</label>
          <input
            type="file"
            name="curriculumVitaeUrl"
            onChange={handleChange}
            className="border border-custom-grayLight bg-white p-2 w-full rounded-lg"
          />
          {formData.curriculumVitaeUrl && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file:{" "}
              {formData.curriculumVitaeUrl instanceof File
                ? formData.curriculumVitaeUrl.name
                : formData.curriculumVitaeUrl}
            </p>
          )}
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
  const validateForm = (): { name: string; message: string }[] => {
    let errors: { name: string; message: string }[] = [];
    // Add validation logic here
    return errors;
  };
  const renderStep2 = () => (
    <div className="flex flex-col justify-center  w-full mt-3 text-[#212529]">
      <h3 className="md:text-xl font-normal text-custom-greenPrimary text-center mb-4">
        الرجاء إدخال المعلومات التالية باللغة العربية
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid  grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-right"
      >
        <div className="flex flex-col justify-start items-end w-full gap-2">
          <label>قطاع العمل الحكومي</label>
          <input
            name="governmentalSectorArabic"
            placeholder="قطاع العمل الحكومي"
            value={formData.governmentalSectorArabic}
            onChange={handleChange}
            className="border border-custom-grayLight text-right bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-end w-full gap-2">
          <label>الاسم الاول</label>
          <input
            name="firstNameArabic"
            placeholder="الاسم الاول"
            value={formData.firstNameArabic}
            onChange={handleChange}
            className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-end w-full gap-2">
          <label>قطاع العمل الخاص</label>
          <input
            name="privateSectorArabic"
            placeholder="قطاع العمل الخاص"
            value={formData.privateSectorArabic}
            onChange={handleChange}
            className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex flex-col justify-start items-end w-full gap-2">
          <label>اسم العائلة</label>
          <input
            name="lastNameArabic"
            placeholder="اسم العائلة"
            value={formData.lastNameArabic}
            onChange={handleChange}
            className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div className="flex items-center justify-between text-right  max-w-full">
          <div className="flex flex-col justify-start items-end w-[30%] gap-2">
            <label>التصنيف</label>
            <select
              name="categoryArabic"
              value={formData.categoryArabic}
              onChange={handleChange}
              className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">اختر التصنيف</option>
              {categoriesArabic.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-start items-end w-[30%] gap-2">
            <label>اللقب</label>
            <select
              name="titleArabic"
              value={formData.titleArabic}
              onChange={handleChange}
              className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">اختر اللقب</option>
              <option value="دكتور">دكتور</option>
              <option value="أستاذ">أستاذ</option>
              <option value="سيد">سيد</option>
              <option value="سيدة">سيدة</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-end w-[30%] gap-2">
            <label>التخصص</label>
            <select
              name="specialtyArabic"
              value={formData.specialtyArabic}
              onChange={handleChange}
              className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">اختر التخصص</option>
              {specialtiesArabic.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center justify-between  gap-4 max-w-full">
          <div className="flex flex-col justify-start items-end w-1/2 gap-2">
            <label>المنطقة</label>
            <select
              name="locationArabic.areaArabic"
              value={formData.locationArabic.areaArabic}
              onChange={handleChange}
              className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">اختر المنطقة</option>
              <option value="منطقة الوسطى">منطقة الوسطى</option>
              <option value="منطقة الغربية">منطقة الغربية</option>
              <option value="منطقة الشرقية">منطقة الشرقية</option>
              <option value="منطقة الجنوبية">منطقة الجنوبية</option>
              <option value="منطقة الشمالية">منطقة الشمالية</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-end w-1/2 gap-2">
            <label>المدينة</label>
            <select
              name="locationArabic.cityArabic"
              value={formData.locationArabic.cityArabic}
              onChange={handleChange}
              className="border text-right border-custom-grayLight bg-white p-2 w-full rounded-lg "
              required
            >
              <option value="">اختر المدينة</option>
              {/* based on the option of the region choose the cities to show if none when clicked an error message */}
              {formData.locationArabic.areaArabic === "منطقة الوسطى" &&
                arabicCities1.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.locationArabic.areaArabic === "منطقة الغربية" &&
                arabicCities2.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.locationArabic.areaArabic === "منطقة الشرقية" &&
                arabicCities3.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.locationArabic.areaArabic === "منطقة الجنوبية" &&
                arabicCities4.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              {formData.locationArabic.areaArabic === "منطقة الشمالية" &&
                arabicCities5.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-start items-end gap-2">
          <label>نبذة عن اختصاصك</label>
          <textarea
            name="descriptionArabic"
            placeholder="نبذة عن اختصاصك"
            value={formData.descriptionArabic}
            onChange={handleChange}
            className="border text-right  border-custom-grayLight bg-white p-2 w-full rounded-lg "
            required
          />
        </div>
        <div></div>
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className={` text-white px-4 py-2 w-80 text-lg font-bold drop-shadow-md shadow-md rounded-lg ${
              loading ? " bg-custom-blueLightHover" : "bg-custom-bluePrimary"
            }`}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full px-16 mx-auto py-8 md:py-16">
      <h1 className="text-5xl font-bold text-center mb-8">Registration Form</h1>
      {step === 1 ? renderStep1() : renderStep2()}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="bg-custom-grayDark mt-4  text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>
      )}
      {showPopUPSucces && <PopUpModal />}
    </div>
  );
}
