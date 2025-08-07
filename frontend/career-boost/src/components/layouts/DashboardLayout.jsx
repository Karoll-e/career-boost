import React from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SIDEBAR_ITEMS } from "../../utils/data";
import { useLocation } from "react-router-dom";



const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const getCurrentSectionName = () => {
    const currentItem = SIDEBAR_ITEMS.navMain.find(item => location.pathname === item.url);
    return currentItem ? currentItem.title : "Dashboard";
  };
  return (
    <SidebarProvider>
      <div className="flex gap-4"> {/* or gap-x-4 for horizontal space */}
        <AppSidebar />
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-16 py-4">
        <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold text-gray-800">
              {getCurrentSectionName()}
            </h2>
          </div>
          
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;