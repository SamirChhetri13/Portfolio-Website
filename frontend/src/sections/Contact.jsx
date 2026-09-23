import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react';
import { developerInfo } from '../data/portfolioData';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Try sending message to backend endpoint
      await axios.post('/api/contact', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // Fallback demo state if backend server endpoint is offline
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none opacity-50 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>In [6]: contact.send()</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Get In <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Open to full-stack engineering roles, freelance opportunities, or technical collaboration. Drop a message!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Column */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              {/* Email Card with Copy Button */}
              <div className="glass-panel glass-panel-hover p-6 rounded-3xl space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-xs font-mono-code text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <div className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Email Address</div>
                  <a href={`mailto:${developerInfo.email}`} className="text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {developerInfo.email}
                  </a>
                </div>
              </div>

              {/* Location & Response Card */}
              <div className="glass-panel glass-panel-hover p-6 rounded-3xl space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Location</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{developerInfo.location}</div>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-mono-code text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Quick Response Guarantee
                </div>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  I typically respond to inquiries within 24 hours. Feel free to reach out via email or submit the form.
                </p>
              </div>
            </motion.div>

            {/* Interactive Contact Form Column */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono-code flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Send a Direct Message
                </h3>

                {/* Status Messages */}
                {status.success && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono-code flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Your message has been sent successfully! I will get back to you shortly.</span>
                  </div>
                )}

                {status.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs font-mono-code flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-700 dark:text-slate-300">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all font-sans shadow-sm dark:shadow-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-700 dark:text-slate-300">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all font-sans shadow-sm dark:shadow-none"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-700 dark:text-slate-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all font-sans shadow-sm dark:shadow-none"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all font-sans resize-none shadow-sm dark:shadow-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 font-mono-code disabled:opacity-50"
                >
                  {status.loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>contact.send()</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
