import React from "react";
import { assets } from "../../assets/assets.js";

function Companies() {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Heading */}
      <h1 className="text-sm md:text-base font-medium text-gray-500 text-center tracking-wide uppercase">
        Trusted by learners from
      </h1>

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-8 md:mt-12">
        <img
          src={assets.adobe_logo}
          alt="Adobe"
          className="w-20 md:w-28 opacity-70 hover:opacity-100 transition duration-300"
        />
        <img
          src={assets.accenture_logo}
          alt="Accenture"
          className="w-20 md:w-28 opacity-70 hover:opacity-100 transition duration-300"
        />
        <img
          src={assets.microsoft_logo}
          alt="Microsoft"
          className="w-20 md:w-28 opacity-70 hover:opacity-100 transition duration-300"
        />
        <img
          src={assets.walmart_logo}
          alt="Walmart"
          className="w-20 md:w-28 opacity-70 hover:opacity-100 transition duration-300"
        />
        <img
          src={assets.paypal_logo}
          alt="Paypal"
          className="w-20 md:w-28 opacity-70 hover:opacity-100 transition duration-300"
        />
      </div>
    </div>
  );
}

export default Companies;
