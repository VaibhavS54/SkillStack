import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets.js";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const {
    averageRating,
    calculateChapterTiming,
    calculateTotalCourseTiming,
    calculateTotalLectures,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn("Login to Enroll");
      if (isAlreadyEnrolled) return toast.warn("Already Enrolled");

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-6 md:pt-32 pt-20 text-left">
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-[500px] -z-10 bg-gradient-to-b from-blue-50/70 to-transparent"></div>

        {/* Left column */}
        <div className="max-w-xl z-10 text-gray-600">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-900">
            {courseData.courseTitle}
          </h2>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* Rating & Students */}
          <div className="flex items-center space-x-2 pt-4 pb-2">
            <p>{averageRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  className="w-4 h-4"
                  src={
                    index < Math.floor(averageRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                />
              ))}
            </div>
            <p className="text-gray-500">
              {courseData.courseRatings.length} ratings
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}
            </p>
          </div>

          <p className="text-gray-800">
            Course By{" "}
            <span className="text-blue-600 font-medium">
              {courseData.educator.name}
            </span>
          </p>

          {/* Course Structure */}
          <div className="pt-10">
            <h2 className="text-xl font-semibold text-gray-900">
              Course Structure
            </h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white mb-3 rounded-lg shadow-sm"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transition-transform duration-300 ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt=""
                      />
                      <p className="font-medium text-gray-800">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} Lectures •{" "}
                      {calculateChapterTiming(chapter)}
                    </p>
                  </div>

                  {/* Chapter Lectures */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-5 pr-4 py-2 text-gray-700 border-t border-gray-200">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li
                          key={lectureIndex}
                          className="flex items-start gap-2 py-2 hover:bg-gray-50 rounded cursor-pointer transition"
                        >
                          <img
                            src={assets.play_icon}
                            alt=""
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-sm md:text-base">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-3">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                                >
                                  Preview
                                </p>
                              )}
                              <p className="text-gray-500">
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="py-20 text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900">
              Course Description
            </h3>
            <p
              className="pt-3 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* Right column */}
        <div className="max-w-sm z-10 bg-white p-4 rounded-lg shadow-md min-w-[350px] sm:min-w-[420px]">
          {/* Thumbnail / Preview */}
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt=""
              className="w-full rounded-lg"
            />
          )}

          {/* Price & Info */}
          <div className="p-3">
            <div className="flex items-center gap-2">
              <img
                className="w-4"
                src={assets.time_left_clock_icon}
                alt="time left"
              />
              <p className="text-red-500 font-medium">
                <span className="font-semibold">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <p className="text-gray-900 md:text-4xl text-2xl font-bold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(0)}
              </p>
              <p className="text-lg text-gray-400 line-through">
                {currency} {courseData.coursePrice}
              </p>
              <p className="text-lg text-green-600 font-medium">
                {courseData.discount}% off
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center text-sm md:text-base gap-5 pt-4 text-gray-600">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="rating" />
                <p>{averageRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="duration" />
                <p>{calculateTotalCourseTiming(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lessons" />
                <p>{calculateTotalLectures(courseData)} lessons</p>
              </div>
            </div>

            {/* Enroll button */}
            <button
              onClick={enrollCourse}
              className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* Expectation section */}
            <div className="p-6 rounded-lg mt-5 bg-gray-50">
              <p className="md:text-xl text-lg font-semibold text-gray-900">
                What’s included?
              </p>
              <ul className="ml-4 pt-3 text-sm md:text-base list-disc text-gray-600 space-y-1">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetail;
