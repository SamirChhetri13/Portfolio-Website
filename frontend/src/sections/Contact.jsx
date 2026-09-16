import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact } from '../services/api';
import { developerInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot spam filter
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    successMessage: '',
    error: null,
    fieldErrors: {}
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (status.fieldErrors[e.target.name] || status.error) {
      setStatus((prev) => ({
        ...prev,
        error: null,
        fieldErrors: {
          ...prev.fieldErrors,
          [e.target.name]: null
        }
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Full Name must be at least 2 characters long.';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message details are required.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (status.loading) return;

    const fieldErrors = validateForm();
    if (Object.keys(fieldErrors).length > 0) {
      setStatus((prev) => ({ ...prev, fieldErrors }));
      return;
    }

    try {
      setStatus({ loading: true, success: false, successMessage: '', error: null, fieldErrors: {} });
      
      const res = await submitContact(formData);
      
      if (res.success) {
        setStatus({
          loading: false,
          success: true,
          successMessage: res.message || 'Thanks for reaching out. Your message has been sent successfully.',
          error: null,
          fieldErrors: {}
        });
        // Reset form ONLY on successful submission
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setStatus({
          loading: false,
          success: false,
          successMessage: '',
          error: res.message || 'Failed to send message. Please try again.',
          fieldErrors: {}
        });
      }
    } catch (err) {
      if (err.validationErrors) {
        const backendErrors = {};
        err.validationErrors.forEach((error) => {
          const field = error.path || error.param;
          if (field) backendErrors[field] = error.msg;
        });
        setStatus({
          loading: false,
          success: false,
          successMessage: '',
          error: 'Please fix the highlighted input errors below.',
          fieldErrors: backendErrors
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          successMessage: '',
          error: err.message || 'Failed to send message. Please check your connection and try again.',
          fieldErrors: {}
        });
      }
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-gray-50 dark:bg-gray-900/30 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Contact Me</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Have a project in mind, web development inquiries, or opportunities to discuss? Send a message directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Panel: Info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I am available for discussions on MERN stack web applications, web development projects, or full-time opportunities. Reach out via the contact form and I will respond promptly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary-500/10 text-primary-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400">Email Address</span>
                  <a href={`mailto:${developerInfo.email}`} className="text-sm font-semibold hover:text-primary-500 transition-colors">
                    {developerInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary-500/10 text-primary-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400">Location</span>
                  <span className="text-sm font-semibold">{developerInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Status Alerts */}
                <AnimatePresence>
                  {status.success && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center space-x-2.5 text-sm font-medium"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                      <span>{status.successMessage}</span>
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center space-x-2.5 text-sm font-medium"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                      <span>{status.error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-invalid={!!status.fieldErrors.name}
                    aria-describedby={status.fieldErrors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.name
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {status.fieldErrors.name && (
                    <span id="name-error" className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={!!status.fieldErrors.email}
                    aria-describedby={status.fieldErrors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {status.fieldErrors.email && (
                    <span id="email-error" className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.email}
                    </span>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-invalid={!!status.fieldErrors.subject}
                    aria-describedby={status.fieldErrors.subject ? "subject-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.subject
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="Project / MERN Stack Inquiry"
                  />
                  {status.fieldErrors.subject && (
                    <span id="subject-error" className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!status.fieldErrors.message}
                    aria-describedby={status.fieldErrors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="Tell me about your project or inquiry..."
                    required
                  />
                  {status.fieldErrors.message && (
                    <span id="message-error" className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: status.loading ? 1 : 1.01 }}
                  whileTap={{ scale: status.loading ? 1 : 0.99 }}
                  type="submit"
                  disabled={status.loading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 shadow-md shadow-primary-500/10 cursor-pointer"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
