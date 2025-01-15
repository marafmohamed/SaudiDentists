import React from "react";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer>
      <div className="bg-custom-dark  text-white py-8 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <div>
            <img src="/Logos/Link.png" alt="Logo" className="w-52 mt-3" />
          </div>
          <div>
            <img src="/Images/Logo high resolution1.png" alt="Logo" className="w-52 mt-3" />
          </div>
          <div>
            <img src="/Images/log.png" alt="Logo" className="w-52 mt-3" />
          </div>
          <div>
            <img src="/Images/fj.png" alt="Logo" className="w-24 mt-3" />
          </div>
          <div className="flex flex-col  items-start gap-4 ">
            <h1 className="text-custom-greenPrimary text-xl">Contact Us</h1>
            <a
              href="mailto:info@international-dental.com"
              className="flex items-center space-x-2"
            >
              <FiMail className="h-5 w-5 md:h-6 md:w-6 text-custom-greenPrimary" />
              <span>info@sddirectory.net</span>
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-custom-greenLight"></div>
      <div className="h-8 w-full bg-custom-greenPrimary"></div>
    </footer>
  );
}
