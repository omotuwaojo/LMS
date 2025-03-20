import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between rounded-lg items-center">
    <h1 className="text-lg font-bold">March,2025</h1>
    <div className="flex items-center space-x-4">
    <p className="text-sm text-gray-600">Total Hours Today: <span className="text-blue-500 font-semibold">8h 48mnt</span></p>
      {/* <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="rounded-full w-10 h-10"
      /> */}
    </div>
  </div>
  );
};

export default TopBar;
