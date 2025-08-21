import React, { useState } from "react";
import Modal from "./Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard and close modal
  React.useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
      navigate("/dashboard");
    }
  }, [isAuthenticated, isOpen, onClose, navigate]);

  const handleSwitchToSignup = () => {
    setActiveTab("signup");
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
  };

  const handleClose = () => {
    setActiveTab("login"); // Reset to login tab when closing
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      hideHeader={true}
      maxWidth="max-w-md"
    >
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={handleSwitchToLogin}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "login"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={handleSwitchToSignup}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "signup"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "login" ? (
            <Login onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <SignUp onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
