import React from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import UserGreeting from "./Dashboard/UserGreeting";
import QuickActionCard from "./Dashboard/QuickActionCard";
import ActivitySection from "./Dashboard/ActivitySection";
import { useDashboard } from "../hooks/useDashboard";
import { QUICK_ACTIONS } from "../utils/data";

function Dashboard() {
  const { user, isAuthenticated, activities, handleQuickAction } =
    useDashboard();

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-10 font-sans">
        <div className="max-w-screen mx-auto">
          {/* Greeting Section */}
          <UserGreeting name={user.name} />

          {/* Quick Actions Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 ">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionCard
                key={action.id}
                {...action}
                onAction={() => handleQuickAction(action.id)}
              />
            ))}
          </div>

          {/* Recent Activity Section */}
          <ActivitySection activities={activities} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
