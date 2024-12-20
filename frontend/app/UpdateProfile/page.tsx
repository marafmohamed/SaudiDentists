"use client";
import React, { useEffect, useState } from "react";
import { useApp } from "../Context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "./styles.css";
import RegistrationForm, { FormData } from "../Components/RegistrationForm";
export default function Page() {
  const { baseUrl } = useApp();
  const router = useRouter();
  const [request, setRequest] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
    }
    const getRequest = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/dentist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
          console.log(json);
          setLoading(false);
          Cookies.remove("token");
          router.push("/");
          return json;
        }
        setRequest(json);
        setLoading(false);
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    getRequest();
  }, []);
  return (
    <div>
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      {!loading && request && (
        <div>
          <RegistrationForm initialData={request} />
        </div>
      )}
    </div>
  );
}
