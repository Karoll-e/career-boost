import React from "react";
import { 
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import LogoIcon from "../assets/Logo";

const Footer = () => {
  const socialLinks = [
    { icon: Github, url: "https://github.com/career-boost", label: "GitHub" },
    { icon: Twitter, url: "https://twitter.com/careerboost", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com/company/career-boost", label: "LinkedIn" }
  ];

  return (
    <footer className="w-full bg-slate-50 border-t">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <LogoIcon className="h-8 w-8" />
            <span className="text-2xl font-semibold">CareerBoost</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            AI-powered interview preparation platform helping professionals excel in technical interviews with personalized questions and expert feedback.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-600" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            &copy; 2024 CareerBoost. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;