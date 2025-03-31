import React from "react";
import { Card, CardContent } from "./ui/card";

const OnlineCourse = () => {
  return (
      <Card className="p-4">
      {/* My Online Course */}
        <div className="flex justify-between mb-2 p-2">
          <h2 className="text-xl font-bold">My Online Course</h2>
          <span className="text-blue-500 cursor-pointer">View All</span>
        </div>
    <div className="overflow-y-auto max-h-120 scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        <div className="mt-4 ">
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
          <div>
            <img src="/course2.jpg" alt="Course 2" className="rounded-lg" />
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
    </div>
      </Card>
  );
};

export default OnlineCourse;
