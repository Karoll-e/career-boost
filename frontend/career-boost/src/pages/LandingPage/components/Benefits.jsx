import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  Award, 
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: TrendingUp,
      title: t('landing.benefits.improved.title'),
      description: t('landing.benefits.improved.description'),
      stat: '85%',
      statLabel: t('landing.benefits.improved.stat'),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Clock,
      title: t('landing.benefits.time.title'),
      description: t('landing.benefits.time.description'),
      stat: '70%',
      statLabel: t('landing.benefits.time.stat'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Target,
      title: t('landing.benefits.confidence.title'),
      description: t('landing.benefits.confidence.description'),
      stat: '92%',
      statLabel: t('landing.benefits.confidence.stat'),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      company: 'Tech Corp',
      rating: 5,
      quote: t('landing.benefits.testimonial1'),
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupXYZ',
      rating: 5,
      quote: t('landing.benefits.testimonial2'),
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'AI Solutions',
      rating: 5,
      quote: t('landing.benefits.testimonial3'),
      avatar: '👩‍🔬'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="benefits" className="py-16 lg:py-24 bg-white">
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
            <Award className="w-4 h-4" />
            <span className="font-medium">{t('landing.benefits.badge')}</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('landing.benefits.title')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('landing.benefits.subtitle')}
          </p>
        </motion.div>

        {/* Benefits Cards */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Icon & Stat */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 ${benefit.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className={`w-8 h-8 ${benefit.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                      {benefit.stat}
                    </div>
                    <div className="text-sm text-gray-500">{benefit.statLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <div className={`mt-6 h-1 bg-gradient-to-r ${benefit.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('landing.benefits.successTitle')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('landing.benefits.successSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 text-blue-700 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">{t('landing.benefits.roi.badge')}</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('landing.benefits.roi.title')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('landing.benefits.roi.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { value: '$2,500', label: t('landing.benefits.roi.prep'), icon: BookOpen },
              { value: '$15,000', label: t('landing.benefits.roi.salary'), icon: TrendingUp },
              { value: '2 weeks', label: t('landing.benefits.roi.time'), icon: Clock },
              { value: '500%', label: t('landing.benefits.roi.return'), icon: Target }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-6">
              {t('landing.benefits.roi.conclusion')}
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow group">
              {t('landing.benefits.roi.cta')}
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;