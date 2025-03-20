import React from "react";

const assignments = [
  {
    title: "Create UI about Food Apps using Auto-Layout in Figma",
    status: "Completed",
    score: 50,
    progress: 34,
    students: 34,
  },
  {
    title: "Drawing 3D Illustration with Motion on Blender Software",
    status: "In Progress",
    score: 100,
    progress: 38,
    students: 47,
  },
  {
    title: "Drawing 3D Illustration with Motion on Blender Software",
    status: "In Progress",
    score: 100,
    progress: 38,
    students: 47,
  },
];

const Assignment = () => {
  return (
    //   <div className="bg-white shadow-lg p-4 rounded-lg">
    //   <h2 className="text-lg font-semibold">Student's Assignment</h2>
    //   <div className="mt-4">
    //     {/* Assignment items will go here */}

    //   </div>
    // </div>

    <div className=" bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Student’s Assignment</h2>
        <span className="text-blue-500 cursor-pointer">View All</span>
      </div>
      {assignments.map((assignment, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-sm">{assignment.title}</h3>
            <span
              className={`px-1 py-1 text-sm rounded ${
                assignment.status === "Completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {assignment.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {assignment.students} Students
          </p>
          <p className="text-xs text-gray-500">Score: {assignment.score}</p>
          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div
              className={`h-2 rounded ${
                assignment.status === "Completed"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
              style={{ width: `${assignment.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assignment;
