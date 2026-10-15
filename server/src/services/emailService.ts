import nodemailer from 'nodemailer';
import { IEnquiry } from '../models/Enquiry';

let transporter: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter | null => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // Graceful warning without exposing secrets
    console.warn('[EmailService] SMTP configuration is incomplete or missing. Email delivery is disabled, enquiries will be saved safely to MongoDB.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass }
  });

  return transporter;
};

export const sendEnquiryNotificationEmail = async (enquiry: IEnquiry): Promise<boolean> => {
  try {
    const mailClient = getTransporter();
    if (!mailClient) return false;

    const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || 'info@jeeteducation.com';
    const sender = process.env.EMAIL_FROM || '"JEET Web Solutions" <noreply@jeeteducation.com>';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">New Project Enquiry Received</h2>
        <p style="color: #64748b;">A new prospective client submitted a website development enquiry:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold; width: 40%;">Reference:</td>
            <td style="padding: 8px 0; color: #0284c7;">${enquiry.refNumber}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Client Name:</td>
            <td style="padding: 8px 0;">${enquiry.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Business:</td>
            <td style="padding: 8px 0;">${enquiry.businessName || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Mobile:</td>
            <td style="padding: 8px 0;"><a href="tel:${enquiry.mobile}">${enquiry.mobile}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">City:</td>
            <td style="padding: 8px 0;">${enquiry.city}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Website Type:</td>
            <td style="padding: 8px 0;">${enquiry.websiteType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Preference:</td>
            <td style="padding: 8px 0;">${enquiry.preference}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
            <td style="padding: 8px 0;">${enquiry.approxBudget || 'Flexible'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 12px; background-color: #f8fafc; border-radius: 6px;">
          <h4 style="margin: 0 0 6px 0; color: #334155;">Project Description:</h4>
          <p style="margin: 0; color: #475569; white-space: pre-wrap;">${enquiry.projectDescription}</p>
        </div>

        <p style="margin-top: 25px; font-size: 13px; color: #94a3b8;">
          Log in to the JEET Admin Dashboard to assign, quote, or advance enquiry status.
        </p>
      </div>
    `;

    await mailClient.sendMail({
      from: sender,
      to: recipient,
      subject: `[JEET Enquiry] ${enquiry.refNumber} - ${enquiry.fullName} (${enquiry.websiteType})`,
      html: htmlContent
    });

    return true;
  } catch (error) {
    console.error('[EmailService Error] Failed to send enquiry notification:', (error as Error).message);
    return false;
  }
};
