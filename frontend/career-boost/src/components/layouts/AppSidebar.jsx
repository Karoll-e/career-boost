import * as React from "react"
import { useNavigate } from "react-router-dom"
import { SIDEBAR_ITEMS } from "../../utils/data"


import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"
import { useUser } from "../../context/userContext"

export function AppSidebar({
  ...props
}) {
  // Use the UserContext
  const { user, isAuthenticated, isLoading, logout } = useUser();

  // User data with fallback
  const userData = {
    name: user?.name || user?.username || "User",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || user?.profilePicture || "/avatars/default.jpg",
  };

  // Show loading state if user data is still loading
  if (isLoading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            Loading...
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <TeamSwitcher teams={SIDEBAR_ITEMS.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_ITEMS.navMain} />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser 
          user={userData} 
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}