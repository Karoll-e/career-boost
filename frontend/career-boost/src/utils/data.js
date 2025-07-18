import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import LogoIcon from '../assets/Logo'

export const CARD_BG = [
  { id: 1, bgcolor: 'linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)' },
  { id: 2, bgcolor: 'linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)' },
  { id: 3, bgcolor: 'linear-gradient(135deg, #eaf7ff 0%, #f3fbff 100%)' },
  { id: 4, bgcolor: 'linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)' },
  { id: 5, bgcolor: 'linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)' },
  { id: 6, bgcolor: 'linear-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)' },
  { id: 7, bgcolor: 'linear-gradient(135deg, #fff4fc 0%, #fff8fd 100%)' },
  { id: 8, bgcolor: 'linear-gradient(135deg, #e8fef3 0%, #f5fef8 100%)' },
  { id: 9, bgcolor: 'linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)' },
  { id: 10, bgcolor: 'linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)' },
];

export const SIDEBAR_ITEMS = {
  navMain:[
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Resumes",
      url: "/resumes",
      icon: FileText,
    },
    {
      title: "Interview Prep",
      url: "/interview-prep",
      icon: MessageSquare,
    },
  ],
  teams:[
    {
      name: "CareerBoost",
      logo: LogoIcon,
      plan: "Free Plan",
    },
  ]
  
};

export const APP_FEATURES = [
    {
      id: "01",
      title: "Smart Practice Sessions",
      description:
        "Practice coding questions with real-time feedback and hints tailored to your skill level.",
    },
    {
      id: "02",
      title: "Track Your Progress",
      description:
        "Monitor your improvement over time with detailed analytics and personalized reports.",
    },
    {
      id: "03",
      title: "Real Interview Simulations",
      description:
        "Simulate real-world interview environments to get familiar with pressure and timing.",
    },
    {
      id: "04",
      title: "Instant Concept Help",
      description:
        "Get AI-powered explanations and examples for tough concepts, right when you need them.",
    },
    {
      id: "05",
      title: "Organize Your Learning",
      description:
        "Bookmark questions, write notes, and revisit topics with your custom learning dashboard.",
    },
  ];
  