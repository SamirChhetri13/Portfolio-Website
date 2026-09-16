/**
 * Contact Controller
 * 
 * This controller handles contact form submissions.
 * It processes the request in a clean, linear, and secure sequence:
 *   1. Check Honeypot spam field
 *   2. Apply IP-based Rate Limiting (in-memory)
 *   3. Validate inputs (via Express Validator, run in routing layer)
 *   4. Save submission to MongoDB (optional / fail-safe log)
 *   5. Send Admin Notification Email using Resend (with visitor email as replyTo)
 *   6. Send Auto-Reply Confirmation Email to the user using Resend
 *   7. Send JSON response back to the client
 */

const Contact = require('../models/Contact');
const { Resend } = require('resend');
const { getAdminNotificationTemplate, getAutoReplyTemplate } = require('../utils/emailTemplates');

// In-memory rate limiting map to track submissions by IP address
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes window
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max 3 submissions per window

/**
 * Handles the contact form submission POST request
 */
exports.submitContactForm = async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';

  try {
    const { name, email, subject, message, website } = req.body;

    // --- STEP 1: SPAM PROTECTION (Honeypot check) ---
    if (website && website.trim() !== '') {
      console.warn(`Spam attempt blocked via Honeypot from IP: ${clientIp}`);
      return res.status(201).json({
        success: true,
        message: 'Thanks for reaching out. Your message has been sent successfully.',
      });
    }

    // --- STEP 2: SPAM PROTECTION (Rate Limiting) ---
    const now = Date.now();
    let submissionTimestamps = rateLimitMap.get(clientIp) || [];
    submissionTimestamps = submissionTimestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
    
    if (submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      console.warn(`Rate limit exceeded from IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        message: 'Too many contact requests. Please wait 5 minutes before trying again.',
      });
    }

    submissionTimestamps.push(now);
    rateLimitMap.set(clientIp, submissionTimestamps);

    // --- STEP 3: DATABASE PERSISTENCE (Fail-Safe) ---
    try {
      const newContact = new Contact({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      });
      await newContact.save();
      console.log(`Saved contact submission to database for: ${email}`);
    } catch (dbError) {
      console.warn('Database save bypassed/failed:', dbError.message);
    }

    // --- STEP 4: EMAIL DISPATCH VIA RESEND ---
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_EMAIL || process.env.RECEIVER_EMAIL || 'samirchhetri075@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    
    if (!resendApiKey || resendApiKey.includes('re_123456789')) {
      console.warn('Resend API key missing or default placeholder. Skipping email dispatch.');
      return res.status(201).json({
        success: true,
        message: 'Thanks for reaching out. Your message has been sent successfully.',
      });
    }

    const resend = new Resend(resendApiKey);
    const emailSubject = subject && subject.trim() ? subject.trim() : 'Portfolio Contact Form Submission';

    // A. Send Notification to Developer/Admin
    let emailSent = false;
    try {
      const adminResult = await resend.emails.send({
        from: fromAddress,
        to: receiverEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] - ${emailSubject}`,
        html: getAdminNotificationTemplate(name, email, emailSubject, message),
      });

      if (adminResult.error) {
        console.error('Resend API returned error for admin notification:', adminResult.error);
      } else {
        emailSent = true;
        console.log(`Notification email dispatched to: ${receiverEmail}`);
      }
    } catch (emailError) {
      console.error('Failed to send admin email notification:', emailError.message);
    }

    // B. Send Auto-Reply Confirmation to Visitor
    try {
      const replyResult = await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: 'Thank you for reaching out! | Samir Chhetri',
        html: getAutoReplyTemplate(name),
      });
      if (replyResult && replyResult.error) {
        console.warn('Auto-reply warning (Resend Sandbox restriction for recipient email):', replyResult.error.message);
      } else {
        console.log(`Auto-reply email sent to visitor: ${email}`);
      }
    } catch (replyError) {
      console.warn('Auto-reply confirmation warning:', replyError.message);
    }

    // --- STEP 5: RETURN RESPONSE TO CLIENT ---
    return res.status(201).json({
      success: true,
      message: 'Thanks for reaching out. Your message has been sent successfully.',
    });

  } catch (error) {
    console.error('Submit Contact Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
};
