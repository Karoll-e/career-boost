import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Modal from "./Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import LogoIcon from "../assets/logo";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const Navbar = () => {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: null,
  });

  useBodyScrollLock(authModal.isOpen);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalType, setModalType] = useState("login"); // "login" or "signup"

  // const openModal = (type) => {
  //   setModalType(type);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const switchToLogin = () => {
  //   setModalType("login");
  // };

  // const switchToSignup = () => {
  //   setModalType("signup");
  // };

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
