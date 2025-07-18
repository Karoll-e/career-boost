import React from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardHeader from "./dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
    </DashboardLayout>
  );
}

export default Dashboard;
