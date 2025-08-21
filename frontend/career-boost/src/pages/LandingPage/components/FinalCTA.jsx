import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Shield, 
  CheckCircle2,
  Zap,
  Users,
  Star
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

const FinalCTA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    { icon: Sparkles, text: t('landing.finalCTA.features.aiPowered') },
    { icon: Clock, text: t('landing.finalCTA.features.quickSetup') },
    { icon: Shield, text: t('landing.finalCTA.features.secure') },
    { icon: Users, text: t('landing.finalCTA.features.community') }
  ];

  const stats = [
    { value: '10,000+', label: t('landing.finalCTA.stats.users') },
    { value: '50,000+', label: t('landing.finalCTA.stats.questions') },
    { value: '95%', label: t('landing.finalCTA.stats.success') },
    { value: '4.9/5', label: t('landing.finalCTA.stats.rating'), icon: Star }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                {stat.icon && <stat.icon className="w-6 h-6 fill-yellow-400 text-yellow-400" />}
              </div>
              <div className="text-blue-200 text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="text-center">
          {/* Main CTA Content */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="font-medium">{t('landing.finalCTA.badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t('landing.finalCTA.title.part1')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('landing.finalCTA.title.highlight')}
              </span>{' '}
              {t('landing.finalCTA.title.part2')}
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('landing.finalCTA.subtitle')}
            </p>

            {/* Features List */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <feature.icon className="w-4 h-4 text-blue-300" />
                  <span className="text-white text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-5 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              {t('landing.finalCTA.primaryButton')}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-xl font-bold hover:border-white/50 transition-all duration-300"
            >
              {t('landing.finalCTA.secondaryButton')}
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-medium">{t('landing.finalCTA.trust.secure')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-medium">{t('landing.finalCTA.trust.noCommitment')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{t('landing.finalCTA.trust.quickStart')}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Urgency Section */}
      <motion.div 
        className="mt-16 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-orange-400" />
            <span className="text-orange-300 font-semibold text-lg">
              {t('landing.finalCTA.urgency.badge')}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {t('landing.finalCTA.urgency.title')}
          </h3>
          
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('landing.finalCTA.urgency.description')}
          </p>

          {/* Countdown or Limited Time Offer */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">
              {t('landing.finalCTA.urgency.offer')}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;