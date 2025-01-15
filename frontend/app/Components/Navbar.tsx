"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { useApp } from "../Context";
import Cookies from "js-cookie";
import useAuth from "../Hooks/useAuth";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, dispatch, user, admin } = useApp();
  const [language, setLanguage] = useState(lang || "en"); // Track current language
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const [token, setToken] = useState<string | null>("");
  const [adminToken, setAdminToken] = useState<string | null>("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Ignore clicks on links or inside the dropdown
    if (
      target.closest("a[href]") ||
      (dropdownRef.current && dropdownRef.current.contains(target)) ||
      (dropdownButtonRef.current && dropdownButtonRef.current.contains(target))
    ) {
      return;
    }

    // Close the dropdown
    setIsOpen(false);
  };

  const closeMenuOnClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !target.closest("a[href]")
    ) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    setToken(user || "");
  }, [user]);
  useEffect(() => {
    setAdminToken(admin || "");
  }, [admin]);

  useEffect(() => {
    setToken(Cookies.get("token") || "");
    setAdminToken(Cookies.get("admin") || "");
    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("mousedown", closeMenuOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("mousedown", closeMenuOnClickOutside);
    };
  }, []);

  const toggleLanguage = (lang: "en" | "ar") => {
    dispatch({ type: "SET_LANGUAGE", payload: lang });
    setLanguage(lang);
  };
  return (
    <nav className="bg-custom-greenDark relative z-20">
      <div className="h-8 bg-custom-greenPrimary"></div>
      <div className="h-1 bg-custom-greenLight"></div>
      <div className="bg-white shadow-lg">
        <div className="md:px-8 px-6 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative cursor-pointer h-24">
              <img src="/Logos/Link.png" alt="Logo" className="w-52 " />
            </div>

            {/* Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`flex p-2 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                  language === "en" ? "" : "flex-row-reverse"
                }`}
              >
                {" "}
                <BiSolidHome className="w-4 text-custom-greenPrimary" />
                {language === "en" ? "Home" : "الرئيسية"}
              </Link>
              {!token && !adminToken && (
                <Link
                  href="/Login"
                  className={`flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                    language === "en" ? "" : "flex-row-reverse"
                  }`}
                >
                  {language === "en" ? "Sign In" : "تسجيل الدخول"}
                </Link>
              )}
              {token && (
                <>
                  <Link
                    className={` cursor-pointer flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                    href={"/UpdateProfile"}
                  >
                    {language === "en"
                      ? "Update Profile"
                      : "تعديل معلومات الحساب"}
                  </Link>
                  <div
                    onClick={() => {
                      logout();
                      setToken("");
                    }}
                    className={` cursor-pointer flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                  >
                    {language === "en" ? "Logout" : "تسجيل الخروج"}
                  </div>
                </>
              )}
              {adminToken && (
                <div
                  onClick={() => {
                    Cookies.remove("admin");
                    dispatch({ type: "LOGOUT_AD" });
                    router.push("/Adminlogin");
                    setAdminToken("");
                  }}
                  className={` cursor-pointer flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                    language === "en" ? "" : "flex-row-reverse"
                  }`}
                >
                  {language === "en" ? "Logout" : "تسجيل الخروج"}
                </div>
              )}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`flex py-2 md:px-8 w-48 md:w-auto lg:px-24 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                    language === "en" ? "" : "flex-row-reverse"
                  }`}
                >
                  {language === "en" ? "About Us" : "من نحن"}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MdKeyboardArrowDown className="h-5 w-5 text-custom-bluePrimary font-bold" />
                  </motion.div>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 w-full bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA]"
                  >
                    <Link
                      href="/AboutUs/Founder"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover"
                    >
                      {language === "en" ? "Founder" : "المؤسس"}
                    </Link>
                    <Link
                      href="/AboutUs/OurGoals"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                    >
                      {language === "en" ? "Goals" : "أهدافنا"}
                    </Link>
                    <Link
                      href="/AboutUs/ThanksAppreciation"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                    >
                      {language === "en"
                        ? "Thanks and Appreciation"
                        : "شكر وتقدير"}
                    </Link>
                    <Link
                      href="/Register"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                    >
                      {language === "en" ? "Join Us" : "انضم إلينا"}
                    </Link>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center justify-evenly gap-0">
                <button
                  onClick={() => toggleLanguage("en")}
                  className={`px-4 py-1 h-full text-sm font-semibold rounded-l-lg transition-colors border-2 ${
                    language === "en"
                      ? "bg-custom-greenDark text-white shadow-inner border-custom-greenPrimary"
                      : "bg-custom-grayLight text-custom-dark border-custom-grayLight"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => toggleLanguage("ar")}
                  className={`px-5 h-full py-1 text-sm font-semibold rounded-r-lg transition-colors border-2 ${
                    language === "ar"
                      ? "bg-custom-greenDark text-white shadow-inner border-custom-greenPrimary"
                      : "bg-custom-grayLight text-custom-dark border-custom-grayLight"
                  }`}
                >
                  عربي
                </button>
              </div>
            </div>

            {/* Hamburger Icon (Mobile) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-custom-greenDark focus:outline-none"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
            </div>

            {isMenuOpen && (
              <div
                className="fixed inset-0 z-10 bg-black bg-opacity-40"
                onClick={toggleMenu}
              ></div>
            )}

            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: isMenuOpen ? 0 : "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 bg-white text-custom-greenDark shadow-lg z-20 pb-8 px-4"
            >
              <div className="flex items-center justify-end px-6 py-6">
                <button
                  onClick={toggleMenu}
                  className="text-custom-greenDark focus:outline-none"
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <FaTimes className="h-6 w-6" />
                    ) : (
                      <FaBars className="h-6 w-6" />
                    )}
                  </motion.div>
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={`flex p-2 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                    language === "en" ? "" : "flex-row-reverse"
                  }`}
                >
                  <BiSolidHome className="w-4 text-custom-greenPrimary" />
                  {language === "en" ? "Home" : "الرئيسية"}
                </Link>
                {!token && !adminToken && (
                  <Link
                    href="/Login"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={`flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                  >
                    {language === "en" ? "Sign In" : "تسجيل الدخول"}
                  </Link>
                )}
                {token && (
                  <div
                    onClick={() => {
                      logout();
                      setToken("");
                    }}
                    className={` cursor-pointer flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                  >
                    {language === "en" ? "Logout" : "تسجيل الخروج"}
                  </div>
                )}
                {adminToken && (
                  <div
                    onClick={() => {
                      Cookies.remove("admin");
                      dispatch({ type: "LOGOUT_AD" });
                      router.push("/Adminlogin");
                      setAdminToken("");
                    }}
                    className={` cursor-pointer flex p-2 px-4 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                  >
                    {language === "en" ? "Logout" : "تسجيل الخروج"}
                  </div>
                )}
                <div className="relative">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      toggleDropdown(e);
                    }}
                    ref={dropdownButtonRef}
                    className={`flex py-2 w-full font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center ${
                      language === "en" ? "" : "flex-row-reverse"
                    }`}
                  >
                    {language === "en" ? "About Us" : "من نحن"}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MdKeyboardArrowDown className="h-5 w-5 text-custom-bluePrimary font-bold" />
                    </motion.div>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 w-full bg-white text-gray-700 shadow-lg mt-1 rounded-lg border border-[#AAAAAA]"
                    >
                      <Link
                        href="/AboutUs/Founder"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover "
                      >
                        {language === "en" ? "Founder" : "المؤسس"}
                      </Link>
                      <Link
                        href="/AboutUs/OurGoals"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                      >
                        {language === "en" ? "Goals" : "أهدافنا"}
                      </Link>
                      <Link
                        href="/AboutUs/ThanksAppreciation"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                      >
                        {language === "en"
                          ? "Thanks and Appreciation"
                          : "شكر وتقدير"}
                      </Link>
                      <Link
                        href="/Register"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 text-sm flex items-center justify-center font-bold hover:bg-custom-blueLightHover border-t border-t-[#AAAAAA]"
                      >
                        {language === "en" ? "Join Us" : "انضم إلينا"}
                      </Link>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center w-fit mx-auto justify-evenly gap-0">
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={`px-4 py-1 h-full text-sm font-semibold rounded-l-lg transition-colors border-2 ${
                      language === "en"
                        ? "bg-custom-greenDark text-white shadow-inner border-custom-greenPrimary"
                        : "bg-custom-grayLight text-custom-dark border-custom-grayLight"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => toggleLanguage("ar")}
                    className={`px-5 h-full py-1 text-sm font-semibold rounded-r-lg transition-colors border-2 ${
                      language === "ar"
                        ? "bg-custom-greenDark text-white shadow-inner border-custom-greenPrimary"
                        : "bg-custom-grayLight text-custom-dark border-custom-grayLight"
                    }`}
                  >
                    عربي
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
