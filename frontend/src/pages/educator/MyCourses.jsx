import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

function MyCourses() {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses
  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  if (loading) return <Loading />;

  return (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        {courses.length === 0 ? (
          <div className="text-gray-500 mt-4">No courses found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="md:table-auto table-fixed w-full border-collapse">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-bold truncate">All Courses</th>
                  <th className="px-4 py-3 font-bold truncate">Earning</th>
                  <th className="px-4 py-3 font-bold truncate">Students</th>
                  <th className="px-4 py-3 font-bold truncate">Published on</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {courses.map((course) => {
                  const earning =
                    course.enrolledStudents.length *
                    (course.coursePrice -
                      (course.discount * course.coursePrice) / 100);

                  return (
                    <tr
                      key={course._id}
                      className="border-b border-gray-500/20 hover:bg-gray-50 transition"
                    >
                      {/* Thumbnail + Title */}
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <span className="truncate hidden md:block">
                          {course.courseTitle}
                        </span>
                      </td>

                      {/* Earnings */}
                      <td className="px-4 py-3">
                        {currency} {earning.toFixed(2)}
                      </td>

                      {/* Enrolled Students */}
                      <td className="px-4 py-3">
                        {course.enrolledStudents.length}
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-3">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
