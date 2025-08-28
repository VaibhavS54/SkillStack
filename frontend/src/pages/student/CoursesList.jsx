import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Searchbar from "../../components/student/Searchbar";
import { AppContext } from "../../context/AppContext";
import Coursecard from "../../components/student/Coursecard";
import { assets } from "../../assets/assets.js";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const navigate = useNavigate();
  const { allcourses } = useContext(AppContext);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { input } = useParams();

  useEffect(() => {
    if (allcourses?.length > 0) {
      const filtered = input
        ? allcourses.filter((course) =>
            course.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        : allcourses;

      setFilteredCourses(filtered);
    }
  }, [allcourses, input]);

  return (
    <>
      <div className="md:px-36 px-6 pt-20 text-left">
        {/* Header */}
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
              Course List
            </h1>
            <p className="text-gray-500 mt-1">
              <span
                className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              /{" "}
              <span
                className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={() => navigate("/course-list")}
              >
                Course List
              </span>
            </p>
          </div>
          <Searchbar data={input} />
        </div>

        {/* Active Search Filter Tag */}
        {input && (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg my-6 shadow-sm">
            <p className="text-gray-700 font-medium">{input}</p>
            <img
              src={assets.cross_icon}
              alt="Remove filter"
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:my-16 my-10">
          {filteredCourses.map((course, index) => (
            <Coursecard key={index} course={course} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CoursesList;
