import React from "react";

export interface RequestData {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  privatePhone: string;
  reservationsPhone?: string;
  governmentalSector?: string;
  privateSector?: string;
  curriculumVitaeUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  snapchatUrl?: string;
  tiktokUrl?: string;
  gender: "male" | "female";
  location: {
    area: string;
    city: string;
  };
  profilePicture: string;
  locationUrl: string[];
  category: string;
  title: string;
  specialty: string;
  firstNameArabic: string;
  lastNameArabic: string;
  governmentalSectorArabic?: string;
  privateSectorArabic?: string;
  locationArabic: {
    areaArabic: string;
    cityArabic: string;
  };
  categoryArabic: string;
  titleArabic: string;
  specialtyArabic: string;
  description: string;
  descriptionArabic: string;
}

interface PopupProps {
  data: RequestData;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ data, onClose }) => {
  console.log(data);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the popup when clicking outside
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl overflow-y-auto max-h-screen relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Profile Picture */}
        <div className="flex justify-between my-4 px-8">
          <img
            src={
              data.profilePicture
                ? data.profilePicture
                : data.gender === "male"
                ? "/Images/Default-ProfileMale.jpg"
                : "/Images/Default-ProfileFemale.jpg"
            }
            alt="Profile Picture"
            className="rounded-full w-32 h-32"
          />
          <a className="w-32" href={data.curriculumVitaeUrl} target="_blank">
            <img src="/Logos/pdf.svg" />
          </a>
        </div>

        {/* Basic Information */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-custom-dark">
            {data.firstName} {data.lastName} ({data.username})
          </h2>
          <p className="text-custom-grayDark">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="text-custom-grayDark">
            <strong>Phone:</strong> {data.privatePhone}
          </p>
          {data.reservationsPhone && (
            <p className="text-custom-grayDark">
              <strong>Reservations Phone:</strong> {data.reservationsPhone}
            </p>
          )}

          {/* Location */}
          <p className="text-custom-grayDark">
            <strong>Location:</strong> {data.location.area},{" "}
            {data.location.city}
          </p>

          {/* Sector Information */}
          <p className="text-custom-grayDark">
            <strong>Governmental Sector:</strong>{" "}
            {data.governmentalSector || "N/A"}
          </p>
          <p className="text-custom-grayDark">
            <strong>Private Sector:</strong> {data.privateSector || "N/A"}
          </p>

          {/* Specialty and Title */}
          <p className="text-custom-grayDark">
            <strong>Category:</strong> {data.category}
          </p>
          <p className="text-custom-grayDark">
            <strong>Title:</strong> {data.title}
          </p>
          <p className="text-custom-grayDark">
            <strong>Specialty:</strong> {data.specialty}
          </p>

          {/* Arabic Fields */}
          <h3 className="text-lg font-semibold text-custom-dark mt-4">
            Arabic Details
          </h3>
          <p className="text-custom-grayDark">
            <strong>Arabic Name:</strong> {data.firstNameArabic}{" "}
            {data.lastNameArabic}
          </p>
          <p className="text-custom-grayDark">
            <strong>Arabic Location:</strong> {data.locationArabic.areaArabic},{" "}
            {data.locationArabic.cityArabic}
          </p>
          <p className="text-custom-grayDark">
            <strong>Arabic Category:</strong> {data.categoryArabic}
          </p>
          <p className="text-custom-grayDark">
            <strong>Arabic Title:</strong> {data.titleArabic}
          </p>
          <p className="text-custom-grayDark">
            <strong>Arabic Specialty:</strong> {data.specialtyArabic}
          </p>

          {/* Description */}
          <p className="text-custom-grayDark">
            <strong>Description:</strong> {data.description}
          </p>
          <p className="text-custom-grayDark">
            <strong>Arabic Description:</strong> {data.descriptionArabic}
          </p>

          {/* Social Media Links */}
          <h3 className="text-lg font-semibold text-custom-dark mt-4">
            Social Media
          </h3>
          <ul className="list-none pl-0">
            {data.tiktokUrl && (
              <li className="mb-2">
                <a
                  href={data.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-bluePrimary hover:underline"
                >
                  Tiktok
                </a>
              </li>
            )}
            {data.twitterUrl && (
              <li className="mb-2">
                <a
                  href={data.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-bluePrimary hover:underline"
                >
                  Twitter
                </a>
              </li>
            )}
            {data.instagramUrl && (
              <li className="mb-2">
                <a
                  href={data.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-bluePrimary hover:underline"
                >
                  Instagram
                </a>
              </li>
            )}
            {data.linkedinUrl && (
              <li className="mb-2">
                <a
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-bluePrimary hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {data.snapchatUrl && (
              <li className="mb-2">
                <a
                  href={data.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-bluePrimary hover:underline"
                >
                  Snapchat
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Popup;
