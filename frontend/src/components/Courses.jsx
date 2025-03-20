import React from "react";
import { Card, CardContent } from "./ui/card";

const OnlineCourse = () => {
  return (
    <div className=" ">
      {/* My Online Course */}
      <Card className="p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">My Online Course</h2>
          <span className="text-blue-500 cursor-pointer">View All</span>
        </div>
        <div className="mt-4">
          <div className="mb-4">
            <img src="/course1.jpg" alt="Course 1" className="rounded-lg" />
            <h3 className="font-semibold mt-2">Introduction to UX</h3>
            <p className="text-sm text-gray-500">
              Present volutpat dolor, vulputate sit amet facilisis ac.
            </p>
          </div>
          <div>
            <img src="/course2.jpg" alt="Course 2" className="rounded-lg" />
            <h3 className="font-semibold mt-2">Product Design? What's It?</h3>
            <p className="text-sm text-gray-500">
              Present volutpat dolor, vulputate sit amet facilisis ac.
            </p>
          </div>
          <div>
            <img src="/course2.jpg" alt="Course 3" className="rounded-lg" />
            <h3 className="font-semibold mt-2">Product Design? What's It?</h3>
            <p className="text-sm text-gray-500">
              Present volutpat dolor, vulputate sit amet facilisis ac.
            </p>
          </div>
          <div>
            <img src="/course2.jpg" alt="Course 2" className="rounded-lg" />
            <h3 className="font-semibold mt-2">Product Design? What's It?</h3>
            <p className="text-sm text-gray-500">
              Present volutpat dolor, vulputate sit amet facilisis ac.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnlineCourse;
