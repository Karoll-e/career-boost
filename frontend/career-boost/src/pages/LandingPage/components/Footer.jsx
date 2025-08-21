import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  MapPin, 
  Phone,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Shield,
  Book,
  Users
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const footerSections = [
    {
      title: t('landing.footer.product.title'),
      links: [
        { label: t('landing.footer.product.features'), action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: t('landing.footer.product.howItWorks'), action: () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: t('landing.footer.product.technology'), action: () => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: t('landing.footer.product.benefits'), action: () => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }) }
      ]
    },
    {
      title: t('landing.footer.company.title'),
      links: [
        { label: t('landing.footer.company.about'), action: () => navigate('/about') },
        { label: t('landing.footer.company.careers'), action: () => navigate('/careers') },
        { label: t('landing.footer.company.blog'), action: () => navigate('/blog') },
        { label: t('landing.footer.company.press'), action: () => navigate('/press') }
      ]
    },
    {
      title: t('landing.footer.support.title'),
      links: [
        { label: t('landing.footer.support.help'), action: () => navigate('/help') },
        { label: t('landing.footer.support.contact'), action: () => navigate('/contact') },
        { label: t('landing.footer.support.status'), action: () => window.open('https://status.career-boost.com', '_blank') },
        { label: t('landing.footer.support.community'), action: () => window.open('https://community.career-boost.com', '_blank') }
      ]
    },
    {
      title: t('landing.footer.legal.title'),
      links: [
        { label: t('landing.footer.legal.privacy'), action: () => navigate('/privacy') },
        { label: t('landing.footer.legal.terms'), action: () => navigate('/terms') },
        { label: t('landing.footer.legal.security'), action: () => navigate('/security') },
        { label: t('landing.footer.legal.cookies'), action: () => navigate('/cookies') }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/career-boost', label: 'GitHub' },
    { icon: Twitter, url: 'https://twitter.com/careerboost', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com/company/career-boost', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com/careerboost', label: 'Instagram' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div 
          className="py-16 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Career-Boost</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {t('landing.footer.description')}
              </p>

              {/* Newsletter Signup */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-lg">{t('landing.footer.newsletter.title')}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {t('landing.footer.newsletter.description')}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={t('landing.footer.newsletter.placeholder')}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
              >
                <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={link.action}
                        className="text-gray-300 hover:text-white transition-colors hover:underline text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div 
            className="mt-16 pt-8 border-t border-gray-800"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{t('landing.footer.contact.address.title')}</h4>
                  <p className="text-gray-300 text-sm">
                    {t('landing.footer.contact.address.street')}<br />
                    {t('landing.footer.contact.address.city')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{t('landing.footer.contact.phone.title')}</h4>
                  <p className="text-gray-300 text-sm">{t('landing.footer.contact.phone.number')}</p>
                  <p className="text-gray-400 text-xs">{t('landing.footer.contact.phone.hours')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{t('landing.footer.contact.email.title')}</h4>
                  <p className="text-gray-300 text-sm">{t('landing.footer.contact.email.address')}</p>
                  <p className="text-gray-400 text-xs">{t('landing.footer.contact.email.response')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="py-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>&copy; 2024 Career-Boost.</span>
              <span>{t('landing.footer.copyright')}</span>
              <div className="flex items-center gap-1">
                <span>{t('landing.footer.madeWith')}</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>{t('landing.footer.forDevelopers')}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm">{t('landing.footer.badges.secure')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Book className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{t('landing.footer.badges.certified')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm">{t('landing.footer.badges.community')}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;