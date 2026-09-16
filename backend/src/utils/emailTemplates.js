/**
 * Email Templates Module
 * 
 * This file provides professional, styled HTML templates for emails sent via Resend.
 * It follows the "Rich branding layout" with styled cards, brand colors (blue accent), 
 * and clear hierarchical layout.
 * 
 * Flow context:
 * - Called by backend/src/controllers/contactController.js
 * - Generates email bodies for admin notifications and sender confirmations.
 */

/**
 * Generates the HTML body for the email sent to the Administrator/Owner.
 * 
 * @param {string} name - Sender's full name 
 * @param {string} email - Sender's email address
 * @param {string} subject - Topic of the message
 * @param {string} message - Content of the message
 * @returns {string} Fully styled HTML body
 */
exports.getAdminNotificationTemplate = (name, email, subject, message) => {
  const dateStr = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Portfolio Message</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 20px;
            color: #1f2937;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e5e7eb;
          }
          .header {
            background-color: #3b82f6; /* Tailwind Blue 500 */
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 30px 20px;
          }
          .intro {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 24px;
            color: #4b5563;
          }
          .card {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .field {
            margin-bottom: 16px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 700;
            color: #9ca3af;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
          }
          .value {
            font-size: 15px;
            color: #1f2937;
            font-weight: 500;
          }
          .message-body {
            font-size: 14px;
            color: #374151;
            line-height: 1.6;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 12px 16px;
            margin-top: 6px;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
          }
          .footer a {
            color: #3b82f6;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Message from Portfolio</h1>
          </div>
          <div class="content">
            <p class="intro">You have received a new message through the contact form on your portfolio website.</p>
            
            <div class="card">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-body">${message}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Sent at ${dateStr} • Samir Chhetri Portfolio</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Generates the HTML body for the auto-reply email confirmation sent back to the Sender.
 * 
 * @param {string} name - Sender's first name / full name
 * @returns {string} Fully styled HTML body
 */
exports.getAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for reaching out!</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 20px;
            color: #1f2937;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e5e7eb;
          }
          .header {
            background-color: #3b82f6; /* Tailwind Blue 500 */
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 30px 20px;
            text-align: center;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 16px;
            color: #1f2937;
          }
          .body-text {
            font-size: 15px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 30px;
          }
          .action-btn {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff !important;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 6px;
            font-size: 15px;
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
            transition: background-color 0.2s;
          }
          .action-btn:hover {
            background-color: #2563eb;
          }
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
          .socials {
            margin-bottom: 10px;
          }
          .socials a {
            display: inline-block;
            margin: 0 10px;
            color: #9ca3af;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
          }
          .socials a:hover {
            color: #3b82f6;
          }
          .footer {
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You For Reaching Out</h1>
          </div>
          <div class="content">
            <p class="greeting">Hi ${name},</p>
            <p class="body-text">
              Thank you for reaching out! I have received your message and will review it shortly. I respond to all inquiries as quickly as possible. In the meantime, feel free to connect with me on LinkedIn!
            </p>
            
            <a href="https://www.linkedin.com/in/samir-chhetri-a35a6a349/" class="action-btn" target="_blank">Connect on LinkedIn</a>
            
            <div class="divider"></div>
            
            <div class="socials">
              <a href="https://www.linkedin.com/in/samir-chhetri-a35a6a349/" target="_blank">LinkedIn</a>
            </div>
          </div>
          <div class="footer">
            <p>Samir Chhetri • Cloud Infrastructure & DevOps Engineer • Kathmandu, Nepal</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
