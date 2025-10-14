export function generateVerificationOtpEmailTemplate(verificationCode) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
      
      <!-- Header -->
      <div style="background-color: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.2);">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">
          📚 Library Management System
        </h1>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #667eea; text-align: center; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
          Verify Your Email Address
        </h2>
        
        <p style="color: #555555; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
          Hello! 👋<br/>
          Thank you for registering with us. Please use the verification code below to complete your registration.
        </p>
        
        <!-- Verification Code Box -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);">
          <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 500;">
            Your Verification Code
          </p>
          <h1 style="color: #ffffff; font-size: 42px; margin: 0; letter-spacing: 8px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
            ${verificationCode}
          </h1>
        </div>
        
        <!-- Important Notice -->
        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; border-radius: 5px; margin: 25px 0;">
          <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.6;">
            ⚠️ <strong>Important:</strong> This code will expire in <strong>15 minutes</strong>. Please do not share this code with anyone.
          </p>
        </div>
        
        <p style="color: #666666; font-size: 14px; line-height: 1.6; text-align: center; margin-top: 25px;">
          If you did not request this verification code, please ignore this email or contact our support team.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px 30px; text-align: center;">
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          Thank you for choosing us! 💜
        </p>
        <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; line-height: 1.5;">
          This is an automated email. Please do not reply to this message.<br/>
          © 2025 Library Management System. All rights reserved.
        </p>
      </div>
      
    </div>
  `;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
      <div style="background-color: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.2);">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">
          📚 Library Management System
        </h1>
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          Click the button below to reset your password:
        </p>
        <a href="${resetPasswordUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: 500; display: inline-block; margin-top: 20px;">
          Reset Password
        </a>
        <br/>
        <h6 style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          If the button does not work, you can copy and paste the link below into your browser:
        </h6>
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          ${resetPasswordUrl}
        </p>
        <br/>
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          The link will expire in <strong>15 minutes</strong>. Please do not share this link with anyone.
        </p>
      </div>
      <div style="background-color: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.2);">
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          If you did not request a password reset, please ignore this email.
        </p>
      </div>
      <div style="background-color: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.2);">
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
          Thank you for choosing us! 💜
        </p>
        <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; line-height: 1.5;">
          © ${new Date().getFullYear()} Library Management System. All rights reserved.
        </p>
      </div>
    </div>
  `;
}
