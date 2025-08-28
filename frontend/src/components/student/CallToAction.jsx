import React from "react";
import { assets } from "../../assets/assets.js";

function CallToAction() {
  return (
    <div className="flex flex-col items-center gap-6 pt-16 pb-24 px-6 md:px-0 bg-gradient-to-b from-blue-50 to-white">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl text-gray-800 font-bold text-center">
        Knowledge at Your Fingertips
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-sm md:text-base max-w-2xl text-center leading-relaxed">
        Build knowledge, sharpen skills, and stay ahead — anytime, anywhere, with
        <span className="text-blue-600 font-medium"> TutorGrid's</span> dynamic learning tools.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-6 mt-6">
        <button className="px-8 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md">
          Get Started
        </button>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition duration-300">
          Learn More
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
