import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import LogoIcon from "../assets/Logo";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "./Cards/ProfileInfoCard";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: null,
  });

  const handleCTA = () => {
    if (!user) {
      setAuthModal({ isOpen: true, type: "login" });
    } else {
      navigate("/dashboard");
    }
  };

  useBodyScrollLock(authModal.isOpen);

  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-sm mx-auto rounded-xl">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-2 cursor-pointer">
          <LogoIcon className="h-8 w-8" />
          <p className="logo-text text-2xl hidden sm:block">CareerBoost</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <Sun />
          </Button>
          
          {user ? (
            <ProfileInfoCard/>
          ) : (
            <>
              <Button
                variant="outline"
                className=""
                onClick={() => setAuthModal({ isOpen: true, type: "login" })}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setAuthModal({ isOpen: true, type: "signup" })}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, type: null })}
        hideHeader
      >
        {authModal.type === "login" && (
          <Login
            onClose={() => setAuthModal({ isOpen: false, type: null })}
            onSwitchToSignup={() =>
              setAuthModal({ isOpen: true, type: "signup" })
            }
          />
        )}

        {authModal.type === "signup" && (
          <SignUp
            onClose={() => setAuthModal({ isOpen: false, type: null })}
            onSwitchToLogin={() =>
              setAuthModal({ isOpen: true, type: "login" })
            }
          />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;