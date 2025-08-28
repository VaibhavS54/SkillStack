import React from "react";
import Searchbar from "./Searchbar";

function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full md:pt-36 pt-20
      px-6 md:px-0 text-center bg-gradient-to-b from-indigo-50 to-white gap-4"
    >
      {/* Heading */}
      <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 max-w-3xl mx-auto leading-tight">
        Welcome to <span className="text-indigo-600">TutorGrid</span>
      </h1>

      {/* Subheading */}
      <h2 className="text-lg md:text-2xl font-medium text-gray-700 max-w-2xl mx-auto">
        Empowering students and tutors through a
        <span className="text-pink-500 font-semibold">
          {" "}unified, intelligent platform
        </span>
      </h2>

      {/* Desktop description */}
      <p className="hidden md:block text-gray-500 max-w-2xl mx-auto mt-3">
        TutorGrid makes learning seamless — helping students connect with expert
        tutors and access resources for success.
      </p>

      {/* Mobile description */}
      <p className="md:hidden text-gray-500 max-w-sm mx-auto mt-2">
        Learn faster, smarter, and easier with world-class tutors.
      </p>

      {/* Searchbar */}
      <div className="mt-6 w-full max-w-lg">
        <Searchbar />
      </div>
    </div>
  );
}

export default Hero;
