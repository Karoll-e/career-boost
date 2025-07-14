import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import {
  Search,
  Home,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import LogoIcon from "../../assets/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarNav,
  SidebarNavItem,
  SidebarNavLink,
  SidebarNavIcon,
  SidebarNavText,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Overview", icon: Home, path: "/dashboard" },
    { name: "Resumes", icon: FileText, path: "/resumes" },
    { name: "Interview Prep", icon: MessageSquare, path: "/interview-prep" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Logout", icon: LogOut },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Helper function to get user initials for avatar fallback
  const getUserInitials = (name) => {
    if (!name) return "CN";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Header */}
      <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="h-16 flex items-center justify-between px-4">
          {/* Left: Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 py-2 -ml-2 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            aria-label="Go to dashboard"
          >
            <LogoIcon className="h-8 w-8 flex-shrink-0" />
            <h1 className="logo-text text-lg text-gray-900 leading-tight truncate">
              CareerBoost
            </h1>
          </Link>

          {/* Right: Profile and Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors "
              aria-label={
                isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isSidebarOpen}
              type="button"
            >
              <div className="relative w-5 h-5">
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-200 ${
                    isSidebarOpen
                      ? "rotate-0 opacity-100"
                      : "rotate-90 opacity-0"
                  }`}
                />
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-200 ${
                    isSidebarOpen
                      ? "-rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Search Bar */}
      {/* <div className="md:hidden px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search sessions, resumes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div> */}

      {/* Sidebar */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-40 w-52 h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-0`}
      >
        <SidebarHeader>
          <SidebarHeaderTitle>
            <Link to="/dashboard" className="flex items-center gap-2">
              <LogoIcon className="h-8 w-8" />
              <h2 className="logo-text text-lg text-gray-900">CareerBoost</h2>
            </Link>
          </SidebarHeaderTitle>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav className="">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarNavItem key={item.name} className="flex justify-center">
                  <SidebarNavLink
                    href={item.path}
                    className={`flex flex-row items-center gap-2 ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <SidebarNavIcon>
                      <Icon size={20} className="" />
                    </SidebarNavIcon>
                    <SidebarNavText className="">{item.name}</SidebarNavText>
                  </SidebarNavLink>
                </SidebarNavItem>
              );
            })}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex gap-3 ">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.profileImageUrl} alt="user profile pic" />
              <AvatarFallback>{getUserInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight">
                {user?.name || "Loading..."}
              </span>
              <span className="leading-none text-xs text-muted-foreground">
                {user?.email || "Loading..."}
              </span>
            </div>
          </div>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarNavItem key={item.name}>
                {item.name === "Logout" ? (
                  <button
                    onClick={handleLogout}
                    className={`flex flex-row items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <SidebarNavIcon>
                      <Icon size={20} />
                    </SidebarNavIcon>
                    <SidebarNavText>{item.name}</SidebarNavText>
                  </button>
                ) : (
                  <SidebarNavLink
                    href={item.path}
                    className={`flex flex-row items-center gap-2 ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    <SidebarNavIcon>
                      <Icon size={20} />
                    </SidebarNavIcon>
                    <SidebarNavText>{item.name}</SidebarNavText>
                  </SidebarNavLink>
                )}
              </SidebarNavItem>
            );
          })}
        </SidebarFooter>
      </Sidebar>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-0 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;