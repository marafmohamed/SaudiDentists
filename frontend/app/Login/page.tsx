"use client";
import { useState } from "react";
import { useApp } from "@/app/Context";
import useAuth from "../Hooks/useAuth";
import Link from "next/link";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Image from "next/image";

export default function Login() {
  const { lang } = useApp();
  const isEnglish = lang === "en";
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here (like API integration)
    if (formData.email && formData.password) {
      try {
        const data = await login(formData.email, formData.password);
        console.log(data);
        if (data.message) {
          if (data.message == "Email not found") {
            if (isEnglish) {
              setError(data.message);
            } else {
              setError("الحساب غير موجود");
            }
          } else {
            if (isEnglish) {
              setError(data.message);
            } else {
              setError("كلمة المرور غير صحيحة");
            }
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
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Image src="/Logos/Link.png" alt="Logo" width={320} height={80} className="w-80" />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        {/* Header */}
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
          <div className="relative">
            <label
              className={`block text-custom-grayWrite font-medium mb-2 ${
                isEnglish ? "" : "text-right"
              }`}
              htmlFor="password"
            >
              {isEnglish ? "Password" : "كلمة المرور"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bluePrimary"
              placeholder={
                isEnglish ? "Enter your password" : "أدخل كلمة المرور"
              }
            />
            <div
              className="absolute top-11 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <BsEye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-custom-greenPrimary text-white py-2 rounded-md hover:bg-custom-bluePrimary/80 transition"
            >
              {isEnglish ? "Login" : "تسجيل الدخول"}
            </button>
          </div>
        </form>
        <Link
          href={"/ResetPassword"}
          className="mt-4 w-80 md:w-96 text-right hover:no-underline transition-all hover:text-[#1890ff] cursor-pointer underline text-orange-400 font-thin tracking-tight underline-offset-1"
        >
          {isEnglish ? "Forgot your password?" : "هل نسيت كلمة المرور ؟"}
        </Link>
      </div>
    </section>
  );
}
