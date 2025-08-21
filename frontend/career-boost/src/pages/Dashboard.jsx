import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { useUser } from "../context/userContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  MessageSquare, 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  Calendar,
  Timer,
  BarChart3
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

function Dashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [recentSessions, setRecentSessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated) return;
      
      try {
        // Fetch recent sessions
        const sessionsResponse = await axiosInstance.get(API_PATHS.SESSION.LIST);
        
        const sessions = sessionsResponse.data.sessions || sessionsResponse.data || [];
        
        // Get recent sessions (last 4)
        const recentSessions = sessions
          .sort((a, b) => new Date(b.lastAccessedAt || b.updatedAt) - new Date(a.lastAccessedAt || a.updatedAt))
          .slice(0, 4);
        
        setRecentSessions(recentSessions);
        
        // Calculate accurate stats
        const totalSessions = sessions.length;
        
        setStats({
          totalSessions
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        // Set empty data on error to show empty state
        setRecentSessions([]);
        setStats({
          totalSessions: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard.</div>;
  }

  const aiFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Get personalized questions based on your role and experience level",
      color: "text-purple-600"
    },
    {
      icon: Target,
      title: "Smart Feedback",
      description: "Receive detailed feedback and improvement suggestions after each session",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Instant Explanations",
      description: "Get AI explanations for complex concepts and technical questions",
      color: "text-yellow-600"
    }
  ];

  const gettingStartedSteps = [
    {
      step: 1,
      title: "Create Your First Session",
      description: "Start by creating an interview preparation session for your target role",
      action: "Get Started",
      onClick: () => navigate('/create-interview-session')
    },
    {
      step: 2,
      title: "Practice with AI",
      description: "Answer AI-generated questions and receive real-time feedback",
      action: "Learn More"
    },
    {
      step: 3,
      title: "Practice Regularly",
      description: "Keep practicing with different sessions to improve your interview skills",
      action: "View Sessions"
    }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-orange-50/50 to-amber-50 rounded-lg p-6 border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('dashboard.welcomeMessage', { name: user?.name || 'there' })}
                </h1>
                <p className="text-gray-600 text-lg">
                  {t('dashboard.welcomeSubtitle')}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.totalSessions}</div>
                  <div className="text-sm text-gray-500">{t('dashboard.stats.sessionsCreated')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start Section */}
          <Card className="border-2 border-dashed border-orange-200 bg-orange-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-600" />
                {t('dashboard.quickStart')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.quickStartDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/create-interview-session')}
                  className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
                  size="lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  {t('dashboard.startNewSession')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/interview-prep')}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <BarChart3 className="w-5 h-5" />
                  {t('dashboard.viewAllSessions')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                {t('dashboard.recentSessions')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.recentSessionsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session) => {                    
                    return (
                      <div 
                        key={session._id} 
                        className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                              <MessageSquare className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{session.role}</h3>
                              <p className="text-sm text-gray-500">
                                {session.experience} • {new Date(session.lastAccessedAt || session.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/interview-prep/${session._id}`)}
                            >
                              {t('common.continue')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{t('dashboard.noSessions')}</p>
                  <Button 
                    onClick={() => navigate('/create-interview-session')}
                    className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {t('dashboard.createFirstSession')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Overview */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                AI-Powered Features
              </CardTitle>
              <CardDescription>
                Discover how AI enhances your interview preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* Getting Started Guide */}
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                Getting Started Guide
              </CardTitle>
              <CardDescription>
                New to interview prep? Follow these steps to get the most out of CareerBoost
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gettingStartedSteps.map((stepInfo) => (
                  <div key={stepInfo.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                      {stepInfo.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{stepInfo.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{stepInfo.description}</p>
                    <Button 
                      variant={stepInfo.step === 1 ? "default" : "outline"} 
                      size="sm"
                      onClick={stepInfo.onClick}
                      className={stepInfo.step === 1 ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      {stepInfo.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
