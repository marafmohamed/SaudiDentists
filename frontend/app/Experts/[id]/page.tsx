"use client";
import React, { useEffect } from "react";
import { useApp } from "../../Context";
import { useParams, useRouter } from "next/navigation";
import { FormData } from "../../Components/RegistrationForm";
import ProfilePage from "@/app/Components/DentistProfile";
import "../styles.css";
export default function Page() {
  const { lang } = useApp();
  // get the query data
  const [dentist, setDentists] = React.useState<FormData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { baseUrl } = useApp();
  const { id } = useParams();
  useEffect(() => {
    // get the doctors for this search
    const getDentists = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/dentist/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          console.log(json);
          setLoading(false);
          return json;
        }
        setDentists(json);
        setLoading(false);

        console.log(json);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(String(error));
        }
        setLoading(false);
      }
    };
    getDentists();
  }, []);
  return (
    <div>
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      {!loading && !dentist && (
        <h1 className="text-2xl h-[500px] flex items-center justify-center text-custom-bluePrimary/50 font-semibold">
          {lang === "en" ? "No doctor found" : "لا يوجد أطباء"}
        </h1>
      )}
      {!loading && dentist && <ProfilePage data={dentist} />}
    </div>
  );
}
