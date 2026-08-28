import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact } from '../services/api';
import { developerInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    fieldErrors: {}
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when editing
    if (status.fieldErrors[e.target.name] || status.error) {
      setStatus({
        ...status,
        error: null,
        fieldErrors: {
          ...status.fieldErrors,
          [e.target.name]: null
        }
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateForm();
    if (Object.keys(fieldErrors).length > 0) {
      setStatus({ ...status, fieldErrors });
      return;
    }

    try {
      setStatus({ loading: true, success: false, error: null, fieldErrors: {} });
      const res = await submitContact(formData);
      if (res.success) {
        setStatus({ loading: false, success: true, error: null, fieldErrors: {} });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      if (err.validationErrors) {
        // Express validator array mapping
        const backendErrors = {};
        err.validationErrors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setStatus({
          loading: false,
          success: false,
          error: err.message,
          fieldErrors: backendErrors
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: err.message || 'Failed to send message. Please check connection.',
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left panel info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I am open to discussions about freelance opportunities, full-time positions, or just chatting about new technologies. Fill out the form and I will get back to you soon.
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

          {/* Right panel Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Form states alert alerts */}
                {status.success && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center space-x-2.5 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Your message was sent successfully! Thanks for reaching out.</span>
                  </div>
                )}

                {status.error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center space-x-2.5 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.name
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="John Doe"
                  />
                  {status.fieldErrors.name && (
                    <span className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {status.fieldErrors.email && (
                    <span className="text-xs text-red-500 flex items-center mt-1">
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
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.subject
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="Project Inquiry"
                  />
                  {status.fieldErrors.subject && (
                    <span className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                      status.fieldErrors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {status.fieldErrors.message && (
                    <span className="text-xs text-red-500 flex items-center mt-1">
                      {status.fieldErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold transition-all duration-200 shadow-md shadow-primary-500/10 cursor-pointer"
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
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
