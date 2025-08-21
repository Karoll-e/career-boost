import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <Benefits />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
