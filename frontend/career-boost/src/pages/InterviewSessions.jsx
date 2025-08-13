import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Button } from "../components/ui/button";
import { Plus, Clock, Target, BookOpen, Trash2, TriangleAlert } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import SpinnerLoader from "../components/Loader/SpinnerLoader";
import Modal from "../components/Modal";
import DeleteAlertContent from "../components/DeleteAlertContent";
import toast from "react-hot-toast";

const InterviewSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
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

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          padding: "10px",
          border: "1px solid #bffcd9",
          background: "#ecfdf3",
          color: "#008a2e"
        },
      });
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
      toast.error("Failed to delete session", {
        duration: 2000,
        style: {
          padding: "10px",
          border: "2px solid #ffe0e1",
          background: "#fff0f0",
          color: "#e60000"
        },
      });
    }
  };

  const handleDeleteClick = (e, session) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setOpenDeleteAlert({ open: true, data: session });
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
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">
                          {formatDate(session.createdAt)}
                        </span>
                        <button
                          onClick={(e) => handleDeleteClick(e, session)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete session"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        hideHeader={true}
        maxWidth="max-w-md"
      >
        <div className="p-6">
          {/* Icon and Title */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TriangleAlert className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Interview Session
            </h3>
            <p className="text-gray-600 text-sm text-pretty">
              Are you sure you want to delete <span className="font-semibold">"{openDeleteAlert?.data?.role}"</span> session? This action <span className="font-semibold">CANNOT</span> be undone.
            </p>
          </div>

          {/* Session Details Card */}
          {openDeleteAlert?.data && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {openDeleteAlert.data.role}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>{openDeleteAlert.data.experience} experience</span>
                    <span>{openDeleteAlert.data.questions?.length || 0} questions</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setOpenDeleteAlert({ open: false, data: null });
              }}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteSession(openDeleteAlert.data)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Session
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default InterviewSessions;