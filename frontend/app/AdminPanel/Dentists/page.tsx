"use client";
import React, { useEffect, useState } from "react";
import { useApp } from "../../Context";
import Cookies from "js-cookie";
import { RequestData } from "@/app/Components/SmallComponents/RequestPopup";
import "../styles.css";
import Dentist from "@/app/Components/SmallComponents/Dentist";
export default function Page() {
  const { baseUrl } = useApp();
  const [Dentists, setDentists] = useState<RequestData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDentists = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        return setLoading(false);
      }
      try {
        const response = await fetch(
          `${baseUrl}/api/dentist/getPaginatedDentists?page=${1}&limit=${15}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    getDentists();
  }, []);
  const handlePageClick = async (page: number) => {
    const response = await fetch(
      `${baseUrl}/api/requests/getPaginatedRequests?page=${page}&limit=${15}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const cc = await response.json();
    if (response.status !== 200) {
      console.log(cc.error);
      return;
    }
    const courses = cc.data;
    setTotalPages(cc.totalPages);
    setCurrentPage(cc.currentPage);
    if (cc.error) {
      console.log(courses.error);
      return;
    }

    setDentists(courses);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // First page
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

    // Ellipsis before the current block
    if (currentPage > 3) {
      pages.push(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Pages around the current page
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

    // Ellipsis after the current block
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Last page
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
    <div className="min-h-[500px] flex flex-col items-center py-8">
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      {!loading && Dentists.length === 0 && (
        <div className="w-full h-[500px] text-bold text-xl flex items-center justify-center ">
          {"no Requests for now "}
          {/* {"لا توجد طلبات في الان الحالي"} */}
        </div>
      )}
      {!loading &&
        Dentists.length > 0 &&
        Dentists.map((request, index) => (
          <Dentist
            key={request._id}
            data={request}
            setDemands={() =>
              setDentists(Dentists.filter((r) => r._id !== request._id))
            }
          ></Dentist>
        ))}
      <div className="flex items-center justify-center mt-auto">
        {/* Previous button */}
        <button
          className="bg-[#0D6887] text-white px-3 py-1 rounded-md mx-2 transition-opacity duration-200 disabled:opacity-50"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next button */}
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
}
