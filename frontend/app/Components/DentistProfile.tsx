import React from "react";
import Image from "next/image";
import { FaSnapchat, FaInstagram, FaTiktok } from "react-icons/fa";

interface ProfilePageProps {
  name: string;
  city: string;
  bio: string;
  profilePicture: string;
  cvUrl: string;
  socialLinks: {
    snapchat?: string;
    instagram?: string;
    tiktok?: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  city,
  bio,
  profilePicture,
  cvUrl,
  socialLinks,
}) => {
  return (
    <div className="p-6 lg:p-10 bg-background">
      {/* Breadcrumb */}
      <div className="text-sm text-custom-grayDark mb-6">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        /{" "}
        <a href="/experts" className="hover:underline">
          Meet Our Experts
        </a>{" "}
        / {name}
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-6 lg:p-10">
        {/* Profile Picture */}
        <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
          <Image
            src={profilePicture}
            alt={`${name}'s profile picture`}
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="lg:w-2/3 lg:pl-8">
          <h1 className="text-2xl font-bold text-custom-dark mb-2">{name}</h1>
          <p className="text-custom-grayDark mb-4">
            <strong>City:</strong> {city}
          </p>
          <h2 className="text-lg font-semibold text-custom-bluePrimary mb-2">
            Brief Biography
          </h2>
          <p className="text-custom-grayDark mb-6">{bio}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="px-4 py-2 bg-custom-greenPrimary text-white rounded-md shadow-md hover:bg-green-600">
              Book An Appointment
            </button>
            <p className="text-custom-grayDark">No location URLs available.</p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.snapchat && (
              <a
                href={socialLinks.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaSnapchat />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaInstagram />
              </a>
            )}
            {socialLinks.tiktok && (
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-bluePrimary text-2xl hover:text-blue-600"
              >
                <FaTiktok />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* CV Section */}
      <div className="mt-10 bg-custom-grayLight p-4 rounded-md flex items-center gap-4">
        <Image
          src="/pdf-icon.png"
          alt="PDF icon"
          width={50}
          height={50}
          className="object-contain"
        />
        <div>
          <p className="text-custom-dark font-medium">{cvUrl.split("/").pop()}</p>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-bluePrimary hover:underline"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
