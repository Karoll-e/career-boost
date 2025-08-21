import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Star,
  ArrowUpRight,
  CheckCircle
} from "lucide-react";
import React from "react";

const Benefits = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Developer",
      company: "Tech Corp",
      avatar: "S",
      quote: "Career-Boost helped me prepare for my senior developer interview at Google. The AI-generated questions were incredibly realistic.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager", 
      company: "StartupXYZ",
      avatar: "M",
      quote: "I landed my dream PM role thanks to the comprehensive interview practice. The explanations were particularly helpful.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "AI Solutions", 
      avatar: "E",
      quote: "The platform's personalized approach made all the difference. I felt confident and well-prepared for every question.",
      rating: 5
    }
  ];

  return (
    <section className="w-full px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-green-100 to-teal-100 text-green-700 border-green-200 rounded-full py-1">
            <Award className="h-4 w-4" />
            Proven Results
          </Badge>
          <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
            Transform Your{" "}
            <span className="bg-[radial-gradient(circle,#10b981_0%,#06b6d4_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">
              Interview Performance
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who have successfully improved their interview skills and landed their dream jobs
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-500 mb-3">improvement rate</div>
            <h3 className="text-xl font-semibold mb-3">Better Performance</h3>
            <p className="text-gray-600">
              Users report significantly better interview performance and increased confidence after using our platform.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
            <div className="text-sm text-gray-500 mb-3">time saved</div>
            <h3 className="text-xl font-semibold mb-3">Time Efficiency</h3>
            <p className="text-gray-600">
              Save hours of preparation time with AI-generated, relevant questions tailored to your specific needs.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-sm text-gray-500 mb-3">confidence boost</div>
            <h3 className="text-xl font-semibold mb-3">Increased Confidence</h3>
            <p className="text-gray-600">
              Feel more prepared and confident in interviews with comprehensive practice and expert feedback.
            </p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Success Stories
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from professionals who have transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <Badge className="bg-white/80 text-blue-700 border-blue-300 rounded-full py-1 mb-4">
              <TrendingUp className="h-4 w-4" />
              Return on Investment
            </Badge>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Calculate Your Career ROI
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how interview preparation translates to career advancement and salary growth
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { value: "$2,500", label: "Traditional prep cost", icon: Clock },
              { value: "$15,000", label: "Average salary increase", icon: TrendingUp },
              { value: "2 weeks", label: "Preparation time", icon: Clock },
              { value: "500%", label: "ROI potential", icon: Target }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Investing in proper interview preparation pays dividends throughout your career. 
              Start building your competitive advantage today.
            </p>
            <Button size="lg" className="text-base">
              Calculate Your Potential <ArrowUpRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;