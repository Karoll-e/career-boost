import React from "react";
import { AppSidebar } from "./Navbar"; // Adjust path as needed
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex gap-4"> {/* or gap-x-4 for horizontal space */}
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;