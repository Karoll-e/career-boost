import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Zap, Target, Clock } from 'lucide-react';

const ProblemSolution = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <motion.div {...fadeInUp}>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">{t('landing.problem.badge')}</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('landing.problem.title')}
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Clock,
                  text: t('landing.problem.timeConsuming')
                },
                {
                  icon: Target,
                  text: t('landing.problem.generic')
                },
                {
                  icon: AlertCircle,
                  text: t('landing.problem.noFeedback')
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">{t('landing.solution.badge')}</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('landing.solution.title')}
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: t('landing.solution.ai.title'),
                  text: t('landing.solution.ai.description')
                },
                {
                  icon: Target,
                  title: t('landing.solution.personalized.title'),
                  text: t('landing.solution.personalized.description')
                },
                {
                  icon: CheckCircle2,
                  title: t('landing.solution.explanations.title'),
                  text: t('landing.solution.explanations.description')
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution Visual */}
            <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">{t('landing.solution.resultTitle')}</span>
              </div>
              <p className="text-gray-700 font-medium">{t('landing.solution.resultDescription')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;