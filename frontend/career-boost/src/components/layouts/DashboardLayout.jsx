import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navbar />

      {user && (
        <div className="flex-1 md:ml-0"> {/* Add left margin to account for sidebar on desktop */}
          <main className="p-4 md:p-6 lg:p-4 min-h-screen">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
