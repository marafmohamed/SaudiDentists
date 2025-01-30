"use client";
import React, { useEffect, Suspense, useState } from "react";
import Filter from "../Components/SmallComponents/Filter";
import { useSearchParams } from "next/navigation";
import { useApp } from "../Context";
import Card from "../Components/SmallComponents/DentistCard";
import { useRouter } from "next/navigation";
import { FormData } from "../Components/RegistrationForm";
import { motion } from "framer-motion";
import "./styles.css";

const PageContent = () => {
  const { lang } = useApp();
  const searchParams = useSearchParams();
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || ""
  );
  const [region, setRegion] = useState(searchParams.get("region") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [doctorName, setDoctorName] = useState(
    searchParams.get("doctorName") || ""
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [dentists, setDentists] = React.useState<FormData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { baseUrl } = useApp();

  useEffect(() => {
    const getDentists = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/dentist/getDoctor?specialization=${specialization}&region=${region}&city=${city}&doctorName=${doctorName}&page=${1}&limit=${10}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 30,
            },
          }
        );
        const json = await response.json();
        if (!response.ok) {
          console.log(json);
          setLoading(false);
          return json;
        }
        setDentists(json.dentists);
        setTotalPages(json.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDentists();
  }, []);

  const handlePageClick = async (page: number) => {
    console.log(specialization, region, city, doctorName, category);
    const response = await fetch(
      `${baseUrl}/api/dentist/getDoctor?specialization=${specialization}&region=${region}&city=${city}&category=${category}&doctorName=${doctorName}&page=${page}&limit=${10}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const cc = await response.json();
    if (response.status !== 200) {
      console.log(cc.error);
      return;
    }
    console.log(cc);
    setDentists(cc.dentists);
    setTotalPages(cc.totalPages);
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    pages.push(
      <button
        key={1}
        className={`px-3 py-1 rounded-md mx-1 transition-colors duration-200 ${
          currentPage === 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black"
        }`}
        onClick={() => handlePageClick(1)}
      >
        1
      </button>
    );
    if (currentPage > 3) {
      pages.push(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
    }
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 rounded-md mx-1 transition-colors duration-200 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
    }
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`px-3 py-1 rounded-md mx-1 transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full flex flex-col items-center pt-0 pb-4 md:py-4">
      <h1 className="mx-auto hidden md:block my-8 text-2xl md:text-6xl text-custom-bluePrimary/50 font-bold">
        {lang === "en" ? "Meet our experts" : "تعرف على خبرائنا"}
      </h1>
      <Filter
        specialization={specialization}
        region={region}
        city={city}
        category={category}
        doctorName={doctorName}
        onSearch={async (
          specialization,
          region,
          city,
          category,
          doctorName
        ) => {
          try {
            setSpecialization(specialization);
            setRegion(region);
            setCity(city);
            setDoctorName(doctorName);
            setCategory(category);
            setLoading(true);
            const response = await fetch(
              `${baseUrl}/api/dentist/getDoctor?specialization=${specialization}&region=${region}&city=${city}&category=${category}&doctorName=${doctorName}&page=${1}&limit=${10}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const json = await response.json();
            if (!response.ok) {
              setLoading(false);
              return json;
            }
            setDentists(json.dentists);
            setTotalPages(json.totalPages);
            setCurrentPage(1);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        }}
        main={false}
      />
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      {!loading && dentists.length === 0 && (
        <h1 className="text-2xl h-[500px] flex items-center justify-center text-custom-bluePrimary/50 font-semibold">
          {lang === "en" ? "No doctors found" : "لا يوجد أطباء"}
        </h1>
      )}
      {!loading && dentists.length > 0 && (
        <div className="w-full flex flex-wrap justify-center gap-6 p-16">
          {dentists.map((dentist: FormData, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                name={dentist.firstName + " " + dentist.lastName}
                nameArabic={
                  dentist.firstNameArabic + " " + dentist.lastNameArabic
                }
                city={dentist.location.area + " " + dentist.location.city}
                cityArabic={
                  dentist.locationArabic.areaArabic +
                  " " +
                  dentist.locationArabic.cityArabic
                }
                profilePicture={
                  typeof dentist.profilePicture === "string"
                    ? dentist.profilePicture
                    : dentist.profilePicture
                    ? URL.createObjectURL(dentist.profilePicture)
                    : ""
                }
                gender={dentist.gender}
                title={dentist.title}
                titleArabic={dentist.titleArabic}
                onViewProfile={() => router.push("/Experts/" + dentist._id)}
              />
            </motion.div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center mt-auto">
        <button
          className="bg-[#0D6887] text-white px-3 py-1 rounded-md mx-2 transition-opacity duration-200 disabled:opacity-50"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          className="bg-[#0D6887] text-white px-3 py-1 rounded-md mx-2 transition-opacity duration-200 disabled:opacity-50"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}
