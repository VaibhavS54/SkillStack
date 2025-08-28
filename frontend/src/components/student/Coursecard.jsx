import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Coursecard = ({ course }) => {
  const { currency, averageRating } = useContext(AppContext);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="flex flex-col bg-white rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="w-full h-44 md:h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={course.courseThumbnail}
          alt={course.courseTitle}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col space-y-2 text-left">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-sm text-gray-500">{course.educator.name}</p>

        {/* Ratings */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">
            {averageRating(course).toFixed(1)}
          </span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                className="w-4 h-4"
                src={
                  index < Math.floor(averageRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
              />
            ))}
          </div>
          <span className="text-gray-400">({course.courseRatings.length})</span>
        </div>

        {/* Price */}
        <p className="text-lg font-semibold text-indigo-600">
          {course.coursePrice === 0
            ? "Free"
            : `${currency}${(
                course.coursePrice -
                (course.coursePrice * course.discount) / 100
              ).toFixed(0)}`}
        </p>
      </div>
    </Link>
  );
};

export default Coursecard;
