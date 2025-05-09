import React from "react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Bell, MessageSquare, Calendar } from "lucide-react";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState("20");

  const handlePrev = () => {
    setSelectedDate((prev) => Math.max(prev - 1, 17));
  };
  const handleNext = () => {
    setSelectedDate((prev) => Math.min(prev + 1, 23));
  };
  // const classes = [
  //     { title: "Design Method Theory", time: "07:00 - 08:15", students: 23, color: "bg-red-400" },
  //     { title: "Learning Figma Practice", time: "08:16 - 09:45", students: 32, color: "bg-yellow-400" },
  //     { title: "Usability Heuristics", time: "09:59 - 11:15", students: 34, color: "bg-orange-400" },
  //     { title: "Learning Figma Practice", time: "08:16 - 09:45", students: 32, color: "bg-blue-400" },
  //     { title: "Usability Heuristics", time: "09:59 - 11:15", students: 34, color: "bg-gray-400" },
  //     { title: "Learning Figma Practice", time: "08:16 - 09:45", students: 32, color: "bg-green-400" },
  //     { title: "Usability Heuristics", time: "09:59 - 11:15", students: 34, color: "bg-pink-400" },
  //   ];

  const scheduleData = [
  
    { date: "19", day: "Monday", classes: 3 },
    { date: "15", day: "Tuesday", classes: 5 },
    { date: "20", day: "Wednesday", classes: 6, active: true },
    { date: "21", day: "Thursday", classes: 3 },
    { date: "22", day: "Friday", classes: 3 },
    { date: "23", day: "Saturday", classes: 2 },
  ];

  const classData = {
    20: [
      {
        title: "Design Method Theory",
        students: 23,
        time: "07:00 - 08:15",
        color: "bg-red-400",
      },
      {
        title: "Learning Figma Practice",
        students: 32,
        time: "08:15 - 09:45",
        color: "bg-yellow-400",
      },
      {
        title: "Usability Heuristics",
        students: 34,
        time: "09:59 - 11:15",
        color: "bg-pink-400",
      },
      {
        title: "Design Method Theory",
        students: 23,
        time: "07:00 - 08:15",
        color: "bg-red-400",
      },
      {
        title: "Learning Figma Practice",
        students: 32,
        time: "08:15 - 09:45",
        color: "bg-yellow-400",
      },
      {
        title: "Usability Heuristics",
        students: 34,
        time: "09:59 - 11:15",
        color: "bg-pink-400",
      },
      {
        title: "Nirmano Theory",
        students: 14,
        time: "11:45 - 12:30",
        color: "bg-blue-400",
      },
      {
        title: "Design Thinking Theory",
        students: 41,
        time: "12:45 - 14:45",
        color: "bg-gray-600",
      },
      {
        title: "Illustration Practice",
        students: 34,
        time: "15:00 - 15:50",
        color: "bg-green-400",
      },
    ],
  };
  return (
    // <Card className="p-4">
    //     <CardContent>
    //         <h3 className="font-semibold text-lg">Class Schedule</h3>
    //   <div className="grid gap-2 mt-2">
    //     {classes.map((cls, index) => (
    //       <div key={index} className={`p-3 rounded-lg text-white ${cls.color}`}>
    //         <p className="font-bold">{cls.title}</p>
    //         <p className="text-sm">{cls.time} - {cls.students} Students</p>
    //       </div>
    //     ))}
    //   </div>
    //     </CardContent>

    // </Card>

    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-2 ml-7">
          <button onClick={handlePrev} className="p-2 bg-gray-200 rounded-full">
            <FaChevronLeft />
          </button>
          <div className="flex space-x-2  ">
            {scheduleData.map((item) => (
              <div
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`p-2 text-center cursor-pointer rounded-lg w-20 ${
                  selectedDate === item.date
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{item.day}</p>
                <p className="text-lg font-bold">{item.date}</p>
                <p className="text-xs">{item.classes}</p>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="p-2 bg-gray-200 rounded-full">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {classData[selectedDate]?.map((classItem, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-lg ${classItem.color}`}
          >
            <h3 className="text-white font-bold">{classItem.title}</h3>
            <p className="text-white text-sm">{classItem.type}</p>
            <p className="text-white text-xs">{classItem.time}</p>
            <p className="text-white text-xs">{classItem.students} Students</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
