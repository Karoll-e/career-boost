import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, ListCollapse, Sparkles, ExternalLink, BookOpen } from "lucide-react";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AIResponsePreview";

const InterviewPrep = () => {
  const { t } = useTranslation();
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [storedExplanations, setStoredExplanations] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Generate or Show Concept Explanation
  const handleLearnMore = async (questionId, question, forceRegenerate = false) => {
    try {
      setCurrentQuestionId(questionId);
      setErrorMsg("");
      
      // Check if explanation already exists and we're not forcing regeneration
      if (storedExplanations[questionId] && !forceRegenerate) {
        setExplanation(storedExplanations[questionId]);
        setOpenLeanMoreDrawer(true);
        return;
      }

      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplanation(response.data);
        // Store the explanation for future use
        setStoredExplanations(prev => ({
          ...prev,
          [questionId]: response.data
        }));
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg(t('interview.messages.explanationError'));
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate explanation
  const regenerateExplanation = async () => {
    if (!currentQuestionId) return;
    
    const currentQuestion = sessionData?.questions?.find(q => q._id === currentQuestionId);
    if (currentQuestion) {
      await handleLearnMore(currentQuestionId, currentQuestion.question, true);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);

      if (response.data && response.data.question) {
        // toast.success('Question Pinned Successfully')
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // Should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(t('errors.generic'));
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  // Load stored explanations from sessionStorage on component mount
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
      
      // Load stored explanations from sessionStorage
      const stored = sessionStorage.getItem(`explanations_${sessionId}`);
      if (stored) {
        try {
          setStoredExplanations(JSON.parse(stored));
        } catch (error) {
          console.error("Error parsing stored explanations:", error);
        }
      }
    }

    return () => {};
  }, [sessionId]);

  // Save explanations to sessionStorage whenever they change
  useEffect(() => {
    if (sessionId && Object.keys(storedExplanations).length > 0) {
      sessionStorage.setItem(`explanations_${sessionId}`, JSON.stringify(storedExplanations));
    }
  }, [storedExplanations, sessionId]);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="mx-auto pt-4 pb-4 px-4 md:px-0 max-w-screen-lg">
        <h2 className="text-lg font-semibold color-black">{t('interview.title')}</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-8" : "md:col-span-12"
            } `}
          >
            
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout // This is the key prop that animates position changes
                    layoutId={`question-${data._id || index}`} // Helps framer track specific items
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          handleLearnMore(data._id, data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        hasExplanation={!!storedExplanations[data._id]}
                      />

                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <ListCollapse className="text-lg" />
                              )}{" "}
                              {t('interview.loadMore')}
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => {
              setOpenLeanMoreDrawer(false);
              setCurrentQuestionId(null);
            }}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <CircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <>
                <div className="mb-4">
                  <button
                    onClick={regenerateExplanation}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-sm text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={16} />
                    {t('interview.regenerateExplanation')}
                  </button>
                </div>
                <AIResponsePreview content={explanation?.explanation} />
                
                {/* Sources Section */}
                {explanation?.sources && explanation.sources.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{t('interview.sources')}</h3>
                    </div>
                    <div className="space-y-3">
                      {explanation.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0 group-hover:text-blue-700" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                              {source.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {source.description}
                            </p>
                            <p className="text-xs text-blue-600 mt-2 font-medium truncate">
                              {source.url}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
