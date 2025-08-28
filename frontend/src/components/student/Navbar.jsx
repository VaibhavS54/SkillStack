import React, { useContext } from "react";
import * as assets from "../../assets/assets.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import tutorLogo from "../../assets/tutor.png";

function Navbar() {
  const location = useLocation(); // ✅ useLocation instead of window.location
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/educator/update-role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-14 border-b py-4 
      ${isCourseListPage ? "bg-white border-gray-200" : "bg-cyan-100/70 border-gray-300"}`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={tutorLogo}
        alt="TutorGrid Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
        {user && (
          <>
            <button
              className="hover:text-blue-600 transition-colors"
              onClick={becomeEducator}
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition-colors"
            >
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-colors"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-3 text-gray-600 text-sm">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="hover:text-blue-600 transition-colors"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition-colors"
            >
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.assets.user_icon} alt="User Icon" className="w-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
