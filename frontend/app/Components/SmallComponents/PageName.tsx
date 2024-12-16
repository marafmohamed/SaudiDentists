import React from "react";

interface TitleComponentProps {
  isEnglish: boolean;
  firstWord: string;
  firstWordAr: string;
  secondWord: string;
  secondWordAr: string;
}

export default function TitleComponent({
  isEnglish,
  firstWord,
  firstWordAr,
  secondWord,
  secondWordAr,
}: TitleComponentProps) {
  return (
    <p
      className={`${
        isEnglish ? "text-left ml-6  " : "text-right mr-6"
      } mb-6 font-normal text-xl text-custom-bluePrimary`}
    >
      <span>{isEnglish ? firstWord : firstWordAr}</span>
      <span className="mx-2">/</span>
      <span className=" text-custom-greenPrimary text-opacity-[73%]">
        {isEnglish ? secondWord : secondWordAr}
      </span>
    </p>
  );
}
