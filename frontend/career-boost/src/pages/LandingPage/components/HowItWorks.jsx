import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Zap, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      icon: User,
      title: t('landing.howItWorks.step1.title'),
      description: t('landing.howItWorks.step1.description'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Profile Setup</span>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 rounded px-3 py-2 text-sm">Role: Senior Developer</div>
              <div className="bg-gray-100 rounded px-3 py-2 text-sm">Experience: 5+ years</div>
              <div className="bg-gray-100 rounded px-3 py-2 text-sm">Focus: React, Node.js</div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      icon: Zap,
      title: t('landing.howItWorks.step2.title'),
      description: t('landing.howItWorks.step2.description'),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">AI Generation</span>
            </div>
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded px-3 py-2 text-sm animate-pulse">
                Generating personalized questions...
              </div>
              <div className="text-xs text-gray-500">🤖 Powered by Google Gemini AI</div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      icon: BookOpen,
      title: t('landing.howItWorks.step3.title'),
      description: t('landing.howItWorks.step3.description'),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">Practice & Learn</span>
            </div>
            <div className="space-y-2">
              <div className="bg-green-50 rounded px-3 py-2 text-sm">Q: Explain React hooks...</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-sm">Your answer here...</div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle2 className="w-3 h-3" />
                AI explanation available
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">{t('landing.howItWorks.badge')}</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('landing.howItWorks.title')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('landing.howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center`}>
                    <step.icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.visual}
                  
                  {/* Decorative Elements */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-xl opacity-10 blur-xl -z-10`}></div>
                </motion.div>
              </div>

              {/* Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 translate-y-24">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('landing.howItWorks.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('landing.howItWorks.cta.description')}
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow">
              {t('landing.howItWorks.cta.button')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;