import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";
export async function sendVerificationCode(email, verificationCode, res){
    try{
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        await sendEmail({
            email,
            subject: 'Verification Code (Library Management System)',
            message,
        });
        return res.status(200).json({
            success: true,
            message: 'Verification code sent successfully',
        })
    }
    catch(error){
        console.error('Email sending error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send verification code',
        });
    }
}