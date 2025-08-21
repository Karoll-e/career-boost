import React from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Clock, HelpCircle, Calendar, Target, Sparkles, TrendingUp } from "lucide-react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative max-w-screen-lg mx-auto overflow-hidden rounded-xl">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20"></div>
      </div>
      
      {/* Floating background elements */}
      <div className="absolute top-6 right-12 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 right-8 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-lg"></div>
      <div className="absolute top-12 right-32 w-16 h-16 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-md animate-pulse"></div>

      <div className="container mx-auto px-4 md:px-6 py-8 relative z-10">
        {/* Main content */}
        <div className="mb-6">
          {/* Role title with icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {role}
              </h1>
            </div>
          </div>

          {/* Topics section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-gray-700">{t('interview.focusAreas')}</span>
            </div>
            <p className="text-gray-800 text-base leading-relaxed bg-white/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/60 shadow-sm">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Stats cards in horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Experience card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('interview.experience')}</p>
                <p className="text-md font-bold text-gray-900">
                  {experience} {experience == 1 ? t('interview.year') : t('interview.years')}
                </p>
              </div>
            </div>
          </div>

          {/* Questions card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('sessions.questions')}</p>
                <p className="text-lg font-bold text-gray-900">
                  {questions} Q&A
                </p>
              </div>
            </div>
          </div>

          {/* Last updated card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('profile.lastUpdated')}</p>
                <p className="text-sm font-bold text-gray-900">
                  {lastUpdated}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Progress indicator */}
        {/* <div className="mt-6 pt-4 border-t border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Session Ready</span>
            </div>
            <div className="text-xs text-gray-500">
              Prepared for {role.toLowerCase()} interview
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RoleInfoHeader;
