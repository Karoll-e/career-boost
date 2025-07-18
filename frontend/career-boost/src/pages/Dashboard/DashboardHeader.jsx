import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "../../context/userContext";
import { FileText, Target, RefreshCw, Plus } from "lucide-react";
import resumeCardIllustration from "../../assets/oc-on-the-laptop.svg";
import interviewCardIllustration from "../../assets/oc-growing.svg";

// --- Componentes Individuales ---

// Saludo y Nombre
const UserGreeting = ({ name }) => (
  <div className="">
    <div className="text-4xl sm:text-5xl md:text-5xl font-bold">
      Hola,{" "}
      <span className="bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-text-shine capitalize">
        {name}
      </span>
    </div>
    <div className="text-sm mt-2 text-[17px] md:text-lg text-gray-600">
      What do you want to create today?
    </div>
  </div>
);

// Quick action card
const QuickActionCard = ({ title, description, icon }) => (
  <Card className="w-full max-w-2xl cursor-pointer hover:shadow-lg transition-shadow hover:bg-indigo-100/40">
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center space-y-3 flex-1">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Start Building</span>
          </div>
        </div>
        <img src={icon} alt="" className="size-40" />
      </div>
    </CardContent>
  </Card>
);

//  Actividad Reciente
const ActivityItem = ({ icon, bgColor, iconColor, title, time }) => (
  <div className="flex items-center space-x-4">
    <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>{icon}</div>
    <div>
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{time}</p>
    </div>
  </div>
);

const DashboardHeader = () => {
  const { user, isAuthenticated } = useUser();
  return (
    <div className=" min-h-screen p-4 sm:p-10 font-sans">
      <div className="max-w-screen mx-auto">
        {/* Sección de saludo */}
        <UserGreeting name={user.name} />

        {/* Sección de Funcionalidades */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <QuickActionCard
            icon={resumeCardIllustration}
            title="Create a new CV"
            description="Boost your career with our AI-powered resume builder"
          />
          <QuickActionCard
            icon={interviewCardIllustration}
            title="Interview Prep"
            description="Practice with mock interviews and get personalized feedback"
          />
        </div>

        {/* Sección de Actividad Reciente */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <ActivityItem
              icon={<FileText size={20} />}
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
              title="Frontend Developer Resume updated"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<RefreshCw size={20} />}
              bgColor="bg-teal-100"
              iconColor="text-teal-600"
              title="React Interview Session completed"
              time="1 day ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
