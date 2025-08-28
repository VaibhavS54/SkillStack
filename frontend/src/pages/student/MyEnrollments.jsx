import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import axios from "axios";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateTotalCourseTiming,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateTotalLectures,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [progressArray, setProgressArray] = useState([]);

  // Fetch user course progress
  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const totalLectures = calculateTotalLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      console.error("❌ Error fetching course progress:", error);
    }
  };

  useEffect(() => {
    if (userData) fetchUserEnrolledCourses();
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) getCourseProgress();
  }, [enrolledCourses]);

  return (
    <>
      <div className="md:px-36 px-6 md:pt-28 pt-20 pb-20">
        <h1 className="text-3xl font-bold text-gray-800">📚 My Enrollments</h1>

        {/* Table */}
        <div className="overflow-x-auto mt-10 shadow-lg rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm max-sm:hidden">
              <tr>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Completed</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index] || {
                  totalLectures: 0,
                  lectureCompleted: 0,
                };
                const percent =
                  progress.totalLectures > 0
                    ? (progress.lectureCompleted * 100) /
                      progress.totalLectures
                    : 0;

                return (
                  <tr
                    key={course._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Course Title */}
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-16 h-16 object-cover rounded-md shadow"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {course.courseTitle}
                        </p>
                        <Line
                          strokeWidth={2.5}
                          percent={percent}
                          strokeColor="#2563eb"
                          className="rounded-full mt-1"
                        />
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4 max-sm:hidden text-gray-700">
                      {calculateTotalCourseTiming(course)}
                    </td>

                    {/* Completed Lectures */}
                    <td className="px-6 py-4 max-sm:hidden text-gray-700">
                      {progress.lectureCompleted}/{progress.totalLectures}{" "}
                      Lectures
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          progress.lectureCompleted === progress.totalLectures
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {progress.lectureCompleted === progress.totalLectures
                          ? "✅ Completed"
                          : "⏳ In Progress"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;
