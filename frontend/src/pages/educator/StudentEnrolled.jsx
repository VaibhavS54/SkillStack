import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function StudentEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const { getToken, backendUrl, isEducator } = useContext(AppContext);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        `${backendUrl}/api/educator/enrolled-students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 text-lg font-semibold">
          Enrolled Students
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Student</th>
              <th className="px-6 py-3 font-semibold">Course</th>
              <th className="px-6 py-3 font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors border-b border-gray-200"
              >
                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt="student"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-medium text-gray-800">
                    {item.student.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.courseTitle}</td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default StudentEnrolled;
