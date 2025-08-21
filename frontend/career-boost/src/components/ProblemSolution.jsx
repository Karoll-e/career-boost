import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Target, Zap } from "lucide-react";
import React from "react";

const ProblemSolution = () => {
  return (
    <section className="w-full px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border-red-200 rounded-full py-1">
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </Badge>
          <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
            Traditional Interview Prep{" "}
            <span className="bg-[radial-gradient(circle,#ef4444_0%,#f97316_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">
              Falls Short
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Time-Consuming Research</h3>
                  <p className="text-gray-600">
                    Spending countless hours searching for relevant questions online, 
                    only to find generic content that doesn't match your specific role.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Generic Questions</h3>
                  <p className="text-gray-600">
                    Most interview prep materials are one-size-fits-all, failing to 
                    address the specific requirements of your target position.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">No Feedback Loop</h3>
                  <p className="text-gray-600">
                    Without personalized feedback, you have no way to know if your 
                    answers are on track or how to improve them.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-8">
              <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-green-200 rounded-full py-1">
                <CheckCircle className="h-4 w-4" />
                Our Solution
              </Badge>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
                AI-Powered{" "}
                <span className="bg-[radial-gradient(circle,#22c55e_0%,#3b82f6_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">
                  Interview Prep
                </span>
              </h3>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Smart AI Generation</h3>
                  <p className="text-gray-700 mb-4">
                    Get unlimited, personalized interview questions generated specifically 
                    for your role, experience level, and focus areas.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Role-Specific Content</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Questions tailored to your exact position and industry requirements.
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Instant Explanations</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get detailed explanations and improvement tips for every question.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-800">
                  ✨ Result: Better preparation, increased confidence, and higher success rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;