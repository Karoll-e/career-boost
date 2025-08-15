import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/userContext";
import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Home/Dashboard";
import Dashboard from "./pages/Dashboard";
import CreateInterviewSession from "./pages/CreateInterviewSession";
import EditInterviewSession from "./pages/EditInterviewSession";
import InterviewSessions from "./pages/InterviewSessions";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import ResumeBuilder from "./pages/ResumeBuilder";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <UserProvider>
      <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100  ">
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-interview-session"
              element={
                <ProtectedRoute>
                  <CreateInterviewSession />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-interview-session/:id"
              element={
                <ProtectedRoute>
                  <EditInterviewSession />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-prep"
              element={
                <ProtectedRoute>
                  <InterviewSessions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-prep/:sessionId"
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
