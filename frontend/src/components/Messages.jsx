import React from "react";
import { Card, CardContent } from "./ui/card";

const Messages = () => {
  return (
    
    <Card >
        {/* Quick Messages */}
        <div className="flex justify-between border-b p-2">
          <h2 className="text-xl font-bold">Quick Messages</h2>
          <span className="text-blue-500 cursor-pointer">
            Unread Messages 5
          </span>
        </div>
        <div className="mt-2 space-y-2 p-2">
          {[
            { name: "Mark Stuntman", time: "10:30", image: "/user1.jpg" },
            { name: "James Clair", time: "09:30", image: "/user2.jpg" },
            { name: "Tulus Ngga", time: "09:10", image: "/user3.jpg" },
            { name: "Drew Boys", time: "08:30", image: "/user4.jpg" },
            { name: "Tobey Makuise", time: "08:01", image: "/user5.jpg" },
            { name: "Steve Nono", time: "07:30", image: "/user6.jpg" },
            { name: "Drew Boys", time: "08:30", image: "/user4.jpg" },
            { name: "Tobey Makuise", time: "08:01", image: "/user5.jpg" },
            { name: "Steve Nono", time: "07:30", image: "/user6.jpg" },
            { name: "Drew Boys", time: "08:30", image: "/user4.jpg" },
            // { name: "Tobey Makuise", time: "08:01", image: "/user5.jpg" },
            // { name: "Steve Nono", time: "07:30", image: "/user6.jpg" },
          ].map((msg, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm "
            >
              <div className="flex items-center mt-2">
                <img
                  src={msg.image}
                  alt={msg.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{msg.name}</span>
              </div>
              <span className="text-gray-500">{msg.time}</span>
            </div>
          ))}
        </div>
      </Card>
   
  );
};

export default Messages;
