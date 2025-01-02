import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Popconfirm from "./PopConfirm";
import { useApp } from "@/app/Context";
import Popup, { RequestData } from "./RequestPopup";
interface RequestProp {
  data: RequestData;
  setDemands: () => void;
}

const Request: React.FC<RequestProp> = ({ data, setDemands }) => {
  const { baseUrl, lang } = useApp();
  const [lauding, setLauding] = useState(false);
  const [lauding1, setLauding1] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isEnglish, setIsEnglish] = useState(lang === "en");
  useEffect(() => {
    setIsEnglish(lang === "en");
  }, [lang]);
  const handleAccept = async () => {
    try {
      setLauding(true);
      const cookie = Cookies.get("admin");
      if (!cookie) {
        console.log("no cookie");
        return;
      }
      const response = await fetch(`${baseUrl}/api/requests/AcceptRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({ requestId: data._id }),
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

  const handleRefuse = async () => {
    try {
      setLauding1(true);
      const cookie = Cookies.get("admin");
      if (!cookie) {
        console.log("no cookie");
        return;
      }
      const response = await fetch(`${baseUrl}/api/requests/RefuseRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({ requestId: data._id }),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        console.log(json);
        setLauding1(false);
        return json;
      }
      setLauding1(false);
      setDemands();
    } catch (error) {
      console.log(error);
      setLauding1(false);
    }
  };

  const toggleDetails = () => {
    setShowPopUp(true);
  };
  return (
    <>
      {showPopUp && <Popup onClose={() => setShowPopUp(false)} data={data} />}
      <div className="bg-custom-grayLight rounded-lg w-full flex flex-wrap items-center justify-between px-5 py-3 z-0 border-b my-8">
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
                : `${data.lastNameArabic} ${data.firstNameArabic}`}
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
            see details
          </p>
          <Popconfirm title="Are you sure?" onConfirm={handleRefuse}>
            <div className=" rounded-lg font-semibold py-2 px-4 border-2 border-custom-grayDark flex justify-center items-center  gap-2 text-custom-grayDark">
              {lauding1 && <span className="loader-button" />} Refuse{" "}
            </div>
          </Popconfirm>
          <Popconfirm title="Are you sure?" onConfirm={handleAccept}>
            <div className="bg-custom-greenPrimary py-2 px-4 text-white rounded-lg font-semibold flex justify-center items-center gap-2">
              {lauding && <span className="loader-button" />} Accept
            </div>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default Request;
