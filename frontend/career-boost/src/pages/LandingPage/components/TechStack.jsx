import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Brain, Shield, Smartphone, Code, Database } from 'lucide-react';

const TechStack = () => {
  const { t } = useTranslation();

  const technologies = [
    {
      category: t('landing.techStack.ai.category'),
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      technologies: [
        { name: 'Google Gemini AI', description: t('landing.techStack.ai.gemini') },
        { name: 'Natural Language Processing', description: t('landing.techStack.ai.nlp') },
        { name: 'Machine Learning', description: t('landing.techStack.ai.ml') }
      ]
    },
    {
      category: t('landing.techStack.frontend.category'),
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      technologies: [
        { name: 'React.js', description: t('landing.techStack.frontend.react') },
        { name: 'Tailwind CSS', description: t('landing.techStack.frontend.tailwind') },
        { name: 'Framer Motion', description: t('landing.techStack.frontend.framer') }
      ]
    },
    {
      category: t('landing.techStack.backend.category'),
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      technologies: [
        { name: 'Node.js', description: t('landing.techStack.backend.node') },
        { name: 'Express.js', description: t('landing.techStack.backend.express') },
        { name: 'MongoDB', description: t('landing.techStack.backend.mongodb') }
      ]
    },
    {
      category: t('landing.techStack.security.category'),
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      technologies: [
        { name: 'JWT Authentication', description: t('landing.techStack.security.jwt') },
        { name: 'Data Encryption', description: t('landing.techStack.security.encryption') },
        { name: 'API Security', description: t('landing.techStack.security.api') }
      ]
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
    <section id="technology" className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="font-medium">{t('landing.techStack.badge')}</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('landing.techStack.title')}
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('landing.techStack.subtitle')}
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 ${tech.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className={`w-8 h-8 ${tech.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {tech.category}
                  </h3>
                </div>

                {/* Technologies List */}
                <div className="space-y-4">
                  {tech.technologies.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                      <h4 className="font-semibold text-white mb-2">{item.name}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`mt-6 h-1 bg-gradient-to-r ${tech.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Stats */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('landing.techStack.performance.title')}
            </h3>
            <p className="text-gray-300">
              {t('landing.techStack.performance.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '99.9%', label: t('landing.techStack.performance.uptime') },
              { value: '<200ms', label: t('landing.techStack.performance.response') },
              { value: '24/7', label: t('landing.techStack.performance.support') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Visual */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('landing.techStack.architecture.title')}
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* User */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-gray-300 text-sm">User Interface</span>
              </div>

              {/* Arrow */}
              <div className="text-gray-500">→</div>

              {/* API */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-2">
                  <Code className="w-8 h-8 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm">REST API</span>
              </div>

              {/* Arrow */}
              <div className="text-gray-500">→</div>

              {/* AI */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm">AI Engine</span>
              </div>

              {/* Arrow */}
              <div className="text-gray-500">→</div>

              {/* Database */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-2">
                  <Database className="w-8 h-8 text-orange-400" />
                </div>
                <span className="text-gray-300 text-sm">Database</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;