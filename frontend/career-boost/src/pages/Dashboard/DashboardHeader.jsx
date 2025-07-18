import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "../../context/userContext";
import { FileText, Target, RefreshCw } from 'lucide-react';

// --- Componentes Individuales ---

// 1. Saludo y Nombre 
const UserGreeting = ({ name }) => (
  <div className="bg-orange-500 text-white p-6 rounded-xl shadow-md flex-1">
    <div className="text-5xl font-bold">Hola {name}</div>
    <div className="text-sm mt-2">What do you want to create today?</div>
  </div>
);

// 2. Tarjeta de Funcionalidad (Blanca)
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex-1">
    {/* Ajustamos el contenedor del ícono para que se vea bien */}
    <div className="text-orange-500">{icon}</div>
    <h3 className="text-xl font-semibold mt-4 text-gray-800">{title}</h3>
    <p className="text-gray-500 mt-1">{description}</p>
  </div>
);

// 3. Elemento de Actividad Reciente
const ActivityItem = ({ icon, bgColor, iconColor, title, time }) => (
  <div className="flex items-center space-x-4">
    <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{time}</p>
    </div>
  </div>
);

const DashboardHeader = () => {
  const { user, isAuthenticated} = useUser();
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans">
    <div className="max-w-7xl mx-auto">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Sección de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserGreeting name={user.name} />
      </div>

      {/* Sección de Funcionalidades */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<FileText size={32} strokeWidth={2.5} />}
          title="Resume Builder"
          description="Create and manage your professional resumes with AI-powered suggestions"
        />
        <FeatureCard
          icon={<Target size={32} strokeWidth={2.5} />}
          title="Interview Prep"
          description="Practice with mock interviews and get personalized feedback"
        />
      </div>

      {/* Sección de Actividad Reciente */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
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