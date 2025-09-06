const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'fixmyarea992@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password-here'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send contact form email endpoint
router.post('/send-contact-email', async (req, res) => {
  try {
    const { name, email, subject, message, to } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'fixmyarea992@gmail.com',
      to: to || 'fixmyarea992@gmail.com',
      subject: `FixMyArea Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #4f46e5; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This message was sent from the FixMyArea contact form.
          </p>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

module.exports = router;
