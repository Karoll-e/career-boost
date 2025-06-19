import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Modal from "./Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import LogoIcon from "../assets/logo";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" or "signup"

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const switchToLogin = () => {
    setModalType("login");
  };

  const switchToSignup = () => {
    setModalType("signup");
  };

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
            onClick={() => openModal("login")}
          >
            Sign In
          </Button>
          <Button onClick={() => openModal("signup")}>Get Started</Button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={closeModal}>
        {modalType === "login" ? (
          <Login onSwitchToSignup={switchToSignup} onClose={closeModal} />
        ) : (
          <SignUp onSwitchToLogin={switchToLogin} onClose={closeModal} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
