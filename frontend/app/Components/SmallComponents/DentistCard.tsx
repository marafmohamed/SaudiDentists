import React from "react";

interface CardProps {
  name: string;
  city: string;
  profilePicture: string;
  onViewProfile: () => void;
}

const Card: React.FC<CardProps> = ({ name, city, profilePicture, onViewProfile }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center max-w-xs mx-auto">
      {/* Profile Picture */}
      <div className="absolute -top-10">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={profilePicture}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-custom-dark">{name}</h3>
        <p className="text-sm text-custom-grayDark">{city}</p>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewProfile}
        className="mt-4 px-6 py-2 bg-custom-bluePrimary text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
      >
        See Profile
      </button>
    </div>
  );
};

export default Card;
