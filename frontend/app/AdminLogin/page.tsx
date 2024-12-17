"use client";
import { useState } from "react";
import { useApp } from "@/app/Context";
import useAuth from "../Hooks/useAuth";

export default function AdminLogin() {
  const { lang } = useApp();
  const isEnglish = lang === "en";
  const { loginAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here (like API integration)
    if (formData.email && formData.password) {
      try {
        const data = await loginAdmin(formData.email, formData.password);
        console.log(data);
        if (data.message) {
          if (data.message == "Email not found") {
            isEnglish ? setError(data.message) : setError("الحساب غير موجود");
          } else {
            isEnglish
              ? setError(data.message)
              : setError("كلمة المرور غير صحيحة");
          }
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(
        isEnglish ? "Please fill in all fields" : "الرجاء ملء جميع الحقول"
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        {/* Header */}
        <h2 className="text-2xl font-bold text-custom-bluePrimary mb-6 text-center">
          {isEnglish ? "Admin Login" : "تسجيل دخول المدير"}
        </h2>

        {/* Error Message */}
        {error && (
          <p
            className={`text-red-500 text-sm mb-4 ${
              !isEnglish && "text-right"
            }`}
          >
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              className={`block text-custom-grayWrite  font-medium mb-2 ${
                isEnglish ? "" : "text-right"
              }`}
              htmlFor="email"
            >
              {isEnglish ? "Email Address" : "البريد الإلكتروني"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bluePrimary"
              placeholder={
                isEnglish ? "Enter your email" : "أدخل بريدك الإلكتروني"
              }
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className={`block text-custom-grayWrite  font-medium mb-2 ${
                isEnglish ? "" : "text-right"
              }`}
              htmlFor="password"
            >
              {isEnglish ? "Password" : "كلمة المرور"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bluePrimary"
              placeholder={
                isEnglish ? "Enter your password" : "أدخل كلمة المرور"
              }
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-custom-bluePrimary text-white py-2 rounded-md hover:bg-custom-bluePrimary/80 transition"
            >
              {isEnglish ? "Login" : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
