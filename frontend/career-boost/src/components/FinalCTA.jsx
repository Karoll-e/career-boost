import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Sparkles, 
  Shield, 
  Clock,
  CheckCircle,
  Users,
  Star
} from "lucide-react";
import React from "react";

const FinalCTA = () => {
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "500K+", label: "Questions Generated" },
    { value: "92%", label: "Success Rate" },
    { value: "4.9/5", label: "User Rating", icon: Star }
  ];

  return (
    <section className="w-full px-6 py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                {stat.icon && <stat.icon className="w-6 h-6 fill-yellow-400 text-yellow-400" />}
              </div>
              <div className="text-blue-200 text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 rounded-full py-1 mb-6">
              <Sparkles className="h-4 w-4" />
              Join Now
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Ready to{" "}
              <span className="bg-[radial-gradient(circle,#60a5fa_0%,#a78bfa_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-text-shine">
                Transform
              </span>{" "}
              Your Career?
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have already improved their interview skills and landed better positions. Start your journey today.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: Sparkles, text: "AI-Powered Questions" },
                { icon: Clock, text: "30-Second Setup" },
                { icon: Shield, text: "Secure & Private" },
                { icon: Users, text: "Active Community" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <feature.icon className="w-4 h-4 text-blue-300" />
                  <span className="text-white text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100 px-10 py-5 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Start Free Practice
              <ArrowUpRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-xl font-semibold hover:border-white/50 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-medium">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Start in 30 seconds</span>
            </div>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-orange-400" />
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 rounded-full py-1">
                Limited Time
              </Badge>
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-3">
              Don't Miss Your Next Opportunity
            </h3>
            
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Your dream job could be one interview away. Start preparing now and give yourself the competitive edge you need.
            </p>

            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">
                Free forever for early users
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;