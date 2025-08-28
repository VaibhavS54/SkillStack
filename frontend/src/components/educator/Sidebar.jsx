import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Courses", path: "/educator/my-courses", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
  ];

  return (
    isEducator && (
      <aside className="md:w-64 w-20 border-r min-h-screen text-base border-gray-700 bg-gray-900 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-8 gap-3 cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-gray-800 border-r-[6px] border-indigo-500 text-indigo-400 font-medium"
                  : "hover:bg-gray-800 border-r-[6px] border-transparent text-gray-300"
              }`
            }
          >
            <img src={item.icon} className="h-6 w-6 invert" alt="" />
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </aside>
    )
  );
};

export default Sidebar;
