
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Pin, PinOff, Sparkles } from "lucide-react";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { cn } from "../../lib/utils";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  hasExplanation = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return <>
      <div className={cn(
        "rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl border group transition-all duration-200",
        isPinned 
          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-amber-100/40 ring-1 ring-amber-100" 
          : "bg-white shadow-gray-100/70 border-gray-300"
      )}>
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex items-start gap-3.5">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
                Q
              </span>
              {isPinned && (
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" title="Pinned"></div>
              )}
            </div>

            <h3
              className={cn(
                "text-xs md:text-[14px] font-medium mr-0 md:mr-20 cursor-pointer",
                isPinned ? "text-amber-900" : "text-gray-800"
              )}
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end ml-4 relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-2 text-xs font-medium px-3 py-1 mr-2 rounded text-nowrap border cursor-pointer transition-all duration-200",
                      isPinned
                        ? "text-amber-800 bg-amber-100 border-amber-200 hover:border-amber-300 hover:bg-amber-200"
                        : "text-indigo-800 bg-indigo-50 border-indigo-50 hover:border-indigo-200"
                    )}
                    onClick={onTogglePin}
                  >
                    {isPinned ? (
                      <PinOff className="text-xs" />
                    ) : (
                      <Pin className="text-xs" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white text-xs">
                  {isPinned ? "Unpin this question" : "Pin this question for easy access"}
                </TooltipContent>
              </Tooltip>


              <button
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1 mr-2 rounded text-nowrap border cursor-pointer ${
                  hasExplanation
                    ? "text-green-800 bg-green-50 border-green-100 hover:border-green-200"
                    : "text-cyan-800 bg-cyan-50 border-cyan-50 hover:border-cyan-200"
                }`}
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <Sparkles />
                <span className="hidden md:block">
                  {hasExplanation ? "View Details" : "Learn More"}
                </span>
              </button>
            </div>

            <button
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={toggleExpand}
            >
              <ChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
          >
             <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
};

export default QuestionCard;
