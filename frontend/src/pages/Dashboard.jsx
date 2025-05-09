import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Announcements from "../components/Announcements";
import Assignments from "../components/Assignments";
import Messages from "../components/Messages";
import Schedule from "../components/Schedule";
import Courses from "../components/Courses";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar />
      {/* <div className="flex-1 p-5">
       
        <div className="mt-5">
          <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">Here is an overview of your activities.</p>
        </div>
      </div> */}
      {/* Main Content */}
      <div className="flex-1  overflow-y-auto p-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Class Schedule - Takes more space */}
          <div className="col-span-12">
            <TopBar />
          </div>
          <div className="col-span-8 ">
            <Schedule />
          </div>

          {/* Student Assignments */}
          <div className="col-span-4">
            <Assignments />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6">
          {/* Online Courses */}
          <div className="">
            <Courses />
          </div>

          {/* Announcements */}
          <div className="">
            <Announcements />
          </div>

          {/* Quick Messages */}
          <div className="">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
