import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Shield, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Trust Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 mb-6"
              variants={fadeInUp}
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {t('landing.hero.trustBadge')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
            >
              {t('landing.hero.headline.part1')}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('landing.hero.headline.highlight')}
              </span>{' '}
              {t('landing.hero.headline.part2')}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl lg:max-w-none"
              variants={fadeInUp}
            >
              {t('landing.hero.subheadline')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                {t('landing.hero.primaryCTA')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 text-lg font-semibold group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('landing.hero.secondaryCTA')}
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>{t('landing.hero.noCreditCard')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                <span>{t('landing.hero.startIn30Seconds')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AI Interview Prep</h3>
                      <p className="text-blue-100 text-sm">Senior Developer</p>
                    </div>
                  </div>
                  <div className="text-white text-sm">15 Questions</div>
                </div>
              </div>
              
              {/* Content Preview */}
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium mb-2">
                        Explain the difference between REST and GraphQL APIs...
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm">
                        REST is an architectural style that uses HTTP methods...
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs text-gray-500">Progress: 8/15 completed</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/5 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Success Badge */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI Generated!
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;