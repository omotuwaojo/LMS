import React from 'react';
import { Card, CardContent } from "./ui/card";

const Announcement = () => {
  return (
    <div >
      {/* Announcement */}
      <Card className="p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Announcement</h2>
          <span className="text-blue-500 cursor-pointer">View All</span>
        </div>
        <div className="mt-4 space-y-4">
          <div className="p-3 bg-blue-500 text-white rounded-lg">
            <h3 className="font-semibold">Gerrard Wijaya</h3>
            <p className="text-sm">Head of Design Division</p>
            <h4 className="font-bold mt-2">Schedule Change for Design Test</h4>
            <p className="text-xs">
              Present volutpat dolor, vulputate sit amet facilisis ac.
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <h3 className="font-semibold">Tioman Stewart</h3>
            <p className="text-sm">Office Bay of Design University</p>
            <h4 className="font-bold mt-2">Caution for Slippery Floor</h4>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <h3 className="font-semibold">Rizki Setyawan</h3>
            <p className="text-sm">Head of Design Department</p>
            <h4 className="font-bold mt-2">Design Festival with Senior Designer</h4>
          </div>
        </div>
      </Card>
    
  </div>
  )
}

export default Announcement;