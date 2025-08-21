import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Sparkles } from "lucide-react";
import React from "react";
import heroImg from "../assets/hero7.png";

const Hero = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6 py-32 custom-scrollbar">
      <div className="text-center max-w-2xl">
        <Badge className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-full py-1 border-none">
          <Sparkles /> AI Powered
        </Badge>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-5xl font-semibold !leading-[1.2] tracking-tight text-balance">
          Ace Interviews with{" "}
          <span className="bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-text-shine">
            AI-Powered
          </span>{" "}
          Learning
        </h1>
        <p className="mt-6 text-[17px] md:text-lg text-balance">
          Get role-specific questions, expand answers when you need them, dive
          deeper into concepts, and organize everything your way. From
          preparation to mastery — your ultimate interview toolkit is here.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
        </div>
      </div>
      <div className="" />
      <img
        src={heroImg}
        alt=""
        className="w-full max-w-screen-xl mx-auto aspect-video bg-white rounded-xl"
      />
    </div>
  );
};

export default Hero;
