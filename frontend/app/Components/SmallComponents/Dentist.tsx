import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Popconfirm from "./PopConfirm";
import { useApp } from "@/app/Context";
import Popup, { RequestData } from "./RequestPopup";
interface RequestProp {
  data: RequestData;
  setDemands: () => void;
}

const Dentist: React.FC<RequestProp> = ({ data, setDemands }) => {
  const { baseUrl, lang } = useApp();
  const [lauding, setLauding] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isEnglish, setIsEnglish] = useState(lang === "en");
  const handleAccept = async () => {
    try {
      setLauding(true);
      const cookie = Cookies.get("admin");
      if (!cookie) {
        console.log("no cookie");
        return;
      }
      const response = await fetch(`${baseUrl}/api/dentist/DeleteAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({ dentistId: data._id }),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        console.log(json);
        setLauding(false);
        return json;
      }
      setLauding(false);
      setDemands();
    } catch (error) {
      console.log(error);
      setLauding(false);
    }
  };

  const toggleDetails = () => {
    setShowPopUp(true);
  };
  useEffect(() => {
    setIsEnglish(lang === "en");
  }, [lang]);
  return (
    <>
      {showPopUp && <Popup onClose={() => setShowPopUp(false)} data={data} />}
      <div className="bg-custom-grayLight rounded-lg w-full flex flex-wrap items-center justify-between px-5 py-3 border-b my-8 ">
        <div className="flex items-center gap-4">
          <img
            src={
              data.profilePicture
                ? data.profilePicture
                : data.gender === "male"
                ? "/Images/Default-ProfileMale.jpg"
                : "/Images/Default-ProfileFemale.jpg"
            }
            alt="Profile"
            className="w-12 h-12"
          />
          <div className="flex flex-col gap-1">
            <h1 className={`font-semibold text-[0.875rem] text-custom-dark`}>
              {isEnglish
                ? `${data.firstName} ${data.lastName}`
                : `${data.lastName} ${data.firstName}`}
            </h1>
            <p className={`font-medium text-[0.875rem] text-custom-grayDark`}>
              {data.email}
            </p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <p
            className="text-custom-bluePrimary hover:underline cursor-pointer"
            onClick={toggleDetails}
          >
            {isEnglish ? "see details" : "عرض التفاصيل"}
          </p>
          <Popconfirm title="Are you sure?" onConfirm={handleAccept}>
            <div className="bg-custom-grayWrite py-2 px-4 text-white rounded-lg font-semibold flex justify-center items-center gap-2">
              {lauding && <span className="loader-button" />}{" "}
              {isEnglish ? "Delete Dentist" : "احذف الطبيب"}
            </div>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default Dentist;
