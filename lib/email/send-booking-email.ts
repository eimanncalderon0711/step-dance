import nodemailer from "nodemailer";

type SendBookingEmailParams = {
  to: string;
  fullName: string;
  referenceNumber: string;
};

export async function sendBookingEmail({ to, fullName, referenceNumber }: SendBookingEmailParams) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  try {
    // Verify SMTP connection first
    await transporter.verify();
    console.log("SMTP connection verified");

    const info = await transporter.sendMail({
      from: `"Step Dance" <noreply@${process.env.YOUR_DOMAIN}>`, // Use a subdomain
      to,
      subject: "Booking Confirmation 🎉",
      html: `...`,
    });

    console.log("Email sent with ID:", info.messageId);
    console.log("Accepted recipients:", info.accepted);
    console.log("Rejected recipients:", info.rejected);
    
    return info;
  } catch (error: any) {
    console.error("SMTP EMAIL ERROR:", error);
    
    // Log more details
    if (error.code) console.error("Error code:", error.code);
    if (error.response) console.error("SMTP response:", error.response);
    
    throw error;
  }
}