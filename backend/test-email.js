require('dotenv').config();
const nodemailer = require('nodemailer');

// Test email configuration
const testEmail = async () => {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'fixmyarea992@gmail.com',
      subject: 'Test Email from FixMyArea',
      text: 'This is a test email to verify the email configuration is working.',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration is working.</p>
        <p>If you receive this, your email setup is successful!</p>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
    
    if (error.code === 'EAUTH') {
      console.log('Authentication failed. Check your Gmail App Password.');
    } else if (error.code === 'ENOTFOUND') {
      console.log('Network connection issue.');
    }
  }
};

testEmail();
