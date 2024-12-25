"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hooks/useAuth";
import { useApp } from "../Context";

export default function Page() {
  const { ResetPassword, VerifieCode } = useAuth();
  const [Verification, setVerification] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const { lang } = useApp();
  const [isEnglish, setIsEnglish] = React.useState(lang === "en");
  useEffect(() => {
    setIsEnglish(lang === "en");
  }, [lang]);
  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const [formData, setFormData] = React.useState({
    email: "",
    VerificationCode: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<{
    email?: string;
    VerificationCode?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in errors) {
      setErrors({ ...errors, [name]: "" });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { email?: string; VerificationCode?: string } = {};

    if (!formData.email) {
      errors.email = isEnglish
        ? "Email is required"
        : "البريد الإلكتروني مطلوب";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    ResetPassword(formData.email).then((data: { error?: string }) => {
      if (data.error) {
        setErrors({
          email: isEnglish ? "Email not found" : "بريد الكتروني غير موجود",
        });
        return;
      }

      setErrors({});
      setVerification(true);
      toast.success(
        isEnglish
          ? "Verification code sent successfully"
          : "تم إرسال كود التحقق بنجاح"
      );
    });
  };

  const handleVerifieCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { VerificationCode?: string; password?: string } = {};

    if (!formData.VerificationCode) {
      errors.VerificationCode = isEnglish
        ? "Verification code is required"
        : "كود التحقق مطلوب";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    VerifieCode(
      formData.email,
      formData.VerificationCode,
      formData.password
    ).then((data: { error?: string }) => {
      if (data.error === "New password is not strong enough") {
        setErrors({
          password: isEnglish ? "Password is too weak" : "كلمة المرور ضعيفة",
        });
        return;
      } else if (data.error === "Invalid or expired OTP") {
        setErrors({
          VerificationCode: isEnglish
            ? "Invalid verification code"
            : "كود التحقق غير صحيح",
        });
        return;
      }

      setErrors({});
      toast.success(
        isEnglish
          ? "Password changed successfully"
          : "تم تغيير كلمة المرور بنجاح"
      );
      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    });
  };

  return (
    <div className={`flex flex-col items-center py-20 w-full`}>
      <ToastContainer />
      <div className="flex flex-col w-80 md:w-96 items-center gap-3 rounded-lg">
        <img src="/Logos/Link.svg" alt="logo" />
        <h1 className="text-sm font-bold text-[#52B6C9]">
          {isEnglish ? "Reset Password" : "إعادة ضبط كلمة المرور"}
        </h1>
        <p className="text-center text-sm font-bold tracking-tight mt-2 text-[#000]/[30]">
          {isEnglish
            ? "Enter your email address to reset your password"
            : "أدخل البريد الإلكتروني الخاص بك لإعادة ضبط كلمة المرور"}
        </p>
        <p className="text-center text-sm tracking-tight mt-2 text-[#000]/[30] leading-7">
          {isEnglish
            ? "We will send a verification code to your email. It will expire in 10 minutes."
            : "سوف نرسل كود التحقق إلى بريدك الإلكتروني سيفقد فعاليته خلال 10 دقائق"}
        </p>
      </div>
      {!Verification && (
        <form
          className="flex flex-col gap-4 w-96 items-center mt-8"
          onSubmit={handleSubmit}
        >
          <div
            className={`flex items-center justify-between gap-2 w-80 md:w-96 pr-2 h-11 border border-[#000]/[20%] rounded-sm hover:border-[#1890ff] transition-all ${
              errors.email
                ? "border-red-500 ring-1 ring-red-400 hover:border-[#1890ff]"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder={
                isEnglish ? "Email Address" : "عنوان البريد الإلكتروني"
              }
              value={formData.email}
              onChange={handleChange}
              className="py-2 w-[90%] pl-4 flex-grow placeholder:text-right placeholder:text-stone-300 focus:ring-0 border-none outline-none"
            />
            <svg
              className="w-5 h-5"
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="mail"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
            </svg>
          </div>

          <button className="w-80 md:w-96 h-11 bg-[#52B6C9] hover:bg-[#0c6780] transition-all text-white rounded-sm text-sm">
            {isEnglish ? "Send" : "إرسال"}
          </button>
          <Link
            href={"/Login"}
            className="text-sm text-[#0c6780] w-80 md:w-96 text-right hover:no-underline transition-all hover:text-[#1890ff] cursor-pointer underline font-bold tracking-tight underline-offset-2"
          >
            {isEnglish ? "Back to Login" : "العودة إلى تسجيل الدخول"}
          </Link>
        </form>
      )}
      {Verification && (
        <form
          className="flex flex-col gap-4 w-96 items-center mt-8"
          onSubmit={handleVerifieCode}
        >
          <div
            className={`flex items-center justify-between gap-2 w-80 md:w-96 pr-2 h-11 border border-[#000]/[20%] rounded-sm hover:border-[#1890ff] transition-all ${
              errors.VerificationCode
                ? "border-red-500 ring-1 ring-red-400 hover:border-[#1890ff]"
                : ""
            }`}
          >
            <input
              type="text"
              name="VerificationCode"
              placeholder={isEnglish ? "Verification Code" : "كود التحقق"}
              value={formData.VerificationCode}
              onChange={handleChange}
              className="py-2 w-[90%] pl-4 flex-grow placeholder:text-right placeholder:text-stone-300 focus:ring-0 border-none outline-none"
            />
            <svg
              className="w-5 h-5"
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="mail"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
            </svg>
          </div>
          {errors.VerificationCode && (
            <p className="text-red-500 text-xs font-bold text-right w-96">
              {errors.VerificationCode}
            </p>
          )}

          <div
            className={`flex items-center justify-between gap-2 w-80 md:w-96 pr-2 h-11 border border-[#000]/[20%] rounded-sm hover:border-[#1890ff] transition-all ${
              errors.password
                ? "border-red-500 ring-1 ring-red-400 hover:border-[#1890ff]"
                : ""
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={isEnglish ? "New Password" : "كلمة المرور الجديدة"}
              value={formData.password}
              onChange={handleChange}
              className="py-2 w-[90%] pl-4 flex-grow placeholder:text-right placeholder:text-stone-300 focus:ring-0 border-none outline-none"
            />
            <svg
              onClick={togglePasswordVisibility}
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="eye-invisible"
              fill="currentColor"
              aria-hidden="true"
              className="size-6 cursor-pointer"
            >
              <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
              <path
                d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 
              .47 92-112-112z"
              ></path>
            </svg>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs font-bold text-right w-96">
              {errors.password}
            </p>
          )}

          <button className="w-80 md:w-96 h-11 bg-[#52B6C9] hover:bg-[#0c6780] transition-all text-white rounded-sm text-sm">
            {isEnglish ? "Submit" : "إرسال"}
          </button>
          <Link
            href={"/Login"}
            className="text-sm text-[#0c6780] w-80 md:w-96 text-right hover:no-underline transition-all hover:text-[#1890ff] cursor-pointer underline font-bold tracking-tight underline-offset-2"
          >
            {isEnglish ? "Back to Login" : "العودة إلى تسجيل الدخول"}
          </Link>
        </form>
      )}
    </div>
  );
}
