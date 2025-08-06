import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Input from "../components/Inputs/Input";
// import Input from "../components/ui/input";
import SpinnerLoader from "../components/Loader/SpinnerLoader";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { ArrowLeft } from "lucide-react";

const CreateInterviewSession = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // Should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-8 lg:mb-6 ">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div className="text-left lg:text-left">
              <h1 className="text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
                Create Interview Session
              </h1>
              <p className="text-gray-600 text-sm">
              Elevate your interview skills with AI Mock Interview that offers realistic practice sessions, and job-specific questions to transform your weaknesses into strengths. Practice anytime, anywhere—no scheduling or stress required—and walk into your real interview fully prepared and confident.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200">
          

            {/* Form Content */}
            <div className="px-4 sm:px-4 lg:px-8 py-4 lg:py-8">
              <form onSubmit={handleCreateSession} className="space-y-4">
                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <Input
                      value={formData.role}
                      onChange={({ target }) => handleChange("role", target.value)}
                      label="Target Role"
                      placeholder="e.g., Frontend Developer, UI/UX Designer, etc."
                      type="text"
                      required
                    />

                    <Input
                      value={formData.experience}
                      onChange={({ target }) => handleChange("experience", target.value)}
                      label="Years of Experience"
                      placeholder="e.g., 1 year, 3 years, 5+ years"
                      type="text"
                      required
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <Input
                      value={formData.topicsToFocus}
                      onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                      label="Topics to Focus On"
                      placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
                      type="text"
                      required
                    />

                    <Input
                      value={formData.description}
                      onChange={({ target }) => handleChange("description", target.value)}
                      label="Description (Optional)"
                      placeholder="Any specific goals or notes for this session"
                      type="text"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  {/* <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button> */}
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading && <SpinnerLoader />}
                    Create Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateInterviewSession;