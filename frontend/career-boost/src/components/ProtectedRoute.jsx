import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Redirect to landing page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute; 