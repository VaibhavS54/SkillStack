import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Coursecard from "./Coursecard";
import { AppContext } from "../../context/AppContext";

const CourseSection = () => {
  const { allcourses } = useContext(AppContext);

  return (
    <div className="py-20 md:px-40 px-8 bg-gray-50">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        Learn from the Best
      </h2>
      <p className="text-sm md:text-base text-gray-600 mt-3 text-center max-w-2xl mx-auto">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:my-16 my-10">
        {allcourses.slice(0, 4).map((course, index) => (
          <Coursecard key={index} course={course} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          to={"/course-list"}
          onClick={() => scrollTo(0, 0)}
          className="inline-block text-indigo-600 font-medium border border-indigo-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white transition px-8 py-3 rounded-lg shadow-sm"
        >
          Show All Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
