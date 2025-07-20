import React from "react";
import { FileText, RefreshCw } from "lucide-react";
import ActivityItem from "./ActivityItem";

const ActivitySection = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      icon: <FileText size={20} />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Frontend Developer Resume updated",
      time: "2 hours ago"
    },
    {
      id: 2,
      icon: <RefreshCw size={20} />,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      title: "React Interview Session completed",
      time: "1 day ago"
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        {displayActivities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;