import React from "react";

const ActivityItem = ({ icon, bgColor, iconColor, title, time }) => (
  <div className="flex items-center space-x-4">
    <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>{icon}</div>
    <div>
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{time}</p>
    </div>
  </div>
);

export default ActivityItem;