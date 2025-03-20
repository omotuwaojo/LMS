import React, { useState } from "react";
import {
  FaHome,
  FaEnvelope,
  FaCalendarAlt,
  FaBook,
  FaClipboard,
  FaComments,
  FaBullhorn,
  FaUserTie,
  FaUserGraduate,
  FaCog,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [SidebarOpen, setSiderOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-black text-white w-64 p-5 h-[calc(100vh-60px)] overflow-y-auto space-y-3 transition-transform  duration-300 ${
          SidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64`}
      >
        {/* Close Button (Visible on small screens) */}
        <button
          onClick={() => setSiderOpen(false)}
          className="lg:hidden absolute top-5 right-5 text-gray-400"
        >
          <X size={24} />
        </button>
        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-sm font-bold">Marlin Monre</h2>
            <p className="text-xs text-gray-400">Design Lecture</p>
          </div>
          <FaBell className="ml-auto text-gray-400" />
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 ">
          <h3 className="text-gray-500 uppercase text-xs">Main</h3>
          <ul className="mt-2 space-y-3">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                {" "}
                <FaEnvelope />
                <span>Messages</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaCalendarAlt />
                <span>Schedule</span>
              </NavLink>
            </li>
          </ul>

          <h3 className="text-gray-500 uppercase text-xs mt-6">Academic</h3>
          <ul className="mt-2 space-y-3">
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaBook />
                <span>Online Course</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/assignment"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaClipboard />
                <span>Assignment</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discussion"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaComments />
                <span>Discussion</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/announcement"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaBullhorn />
                <span>Announcement</span>
              </NavLink>
            </li>
          </ul>

          <h3 className="text-gray-500 uppercase text-xs mt-6">Users</h3>
          <ul className="mt-2 space-y-3">
            <li>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaUserTie />
                <span>Teachers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaUserGraduate />
                <span>Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                  }`
                }
              >
                <FaCog />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>

          {/* Logout */}
          <div className="mt-2">
            <button className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 w-full text-red-400">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
      {/* Sidebar Toggle Button (Visible on all screens) */}
      <button
        onClick={() => setSiderOpen(!SidebarOpen)}
        className="fixed top-2 left-5 text-black lg:hidden"
      >
        {SidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
};

export default Sidebar;
