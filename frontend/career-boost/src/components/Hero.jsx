import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Sparkle } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6 py-32">
      <div className="text-center max-w-2xl">
        <Badge className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-full py-1 border-none">
        <Sparkle/> AI Powered
        </Badge> 

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-5xl font-semibold !leading-[1.2] tracking-tight">
          Build Professional Resumes & Master Interviews with AI
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
        Create stunning resumes with our intuitive builder and ace your interviews with AI-powered preparation. Join thousands of professionals who've already boosted their careers.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
      <div className="w-full max-w-screen-xl mx-auto aspect-video bg-accent rounded-xl" />
    </div>
  );
};

export default Hero;
