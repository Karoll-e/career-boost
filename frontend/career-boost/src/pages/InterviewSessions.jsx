import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Button } from "../components/ui/button";
import { Plus, Clock, Target, BookOpen } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import SpinnerLoader from "../components/Loader/SpinnerLoader";

const InterviewSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      // Fixed: Use response.data directly, not response.data.sessions
      setSessions(response.data || []);
      console.log('Sessions loaded:', response.data); // Debug log
    } catch (error) {
      setError("Failed to load sessions");
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/interview-prep/${sessionId}`);
  };

  const handleCreateSession = () => {
    navigate("/create-interview-session");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <SpinnerLoader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Interview Prep Sessions
                </h1>
                <p className="text-gray-600">
                  Practice with AI-powered mock interviews tailored to your target role
                </p>
              </div>
              <Button
                onClick={handleCreateSession}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Create New Session
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Debug info - remove this after confirming it works */}
          <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
            Debug: Sessions count: {sessions.length}
          </div>

          {/* Sessions Grid */}
          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No sessions yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first interview practice session to get started
                </p>
                <Button
                  onClick={handleCreateSession}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Session
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  onClick={() => handleSessionClick(session._id)}
                  className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <div className="p-6">
                    {/* Session Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDate(session.createdAt)}
                      </span>
                    </div>

                    {/* Session Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {session.role}
                    </h3>

                    {/* Session Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{session.experience} experience</span>
                      </div>
                      
                      {session.topicsToFocus && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span className="truncate">{session.topicsToFocus}</span>
                        </div>
                      )}
                    </div>

                    {/* Questions Count */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {session.questions?.length || 0} questions
                      </span>
                      <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                        Start Practice →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSessions;