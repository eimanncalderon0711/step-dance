import nodemailer from "nodemailer";

export const runtime = "nodejs";

type SendBookingEmailParams = {
  to: string;
  fullName: string;
  referenceNumber: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN, // a8df0a001@smtp-brevo.com
    pass: process.env.BREVO_SMTP_KEY, // SMTP KEY
  },
});

export async function sendBookingEmail({
  to,
  fullName,
  referenceNumber,
}: SendBookingEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"Step Dance" <eimanjoshua.calderon@ustp.edu.ph>`,
      to,
      subject: "Booking Confirmation 🎉",
      html: `
      <div style="font-family:Arial;padding:20px;">
        <h2>Booking Confirmed 🎉</h2>

        <p>Hello <b>${fullName}</b>,</p>

        <p>Your booking has been successfully confirmed.</p>

        <p>
          <b>Reference Number:</b><br/>
          ${referenceNumber}
        </p>

        <hr/>
        <p style="font-size:12px;color:#777;">
          Step Dance Studio
        </p>
      </div>
    `,
    });

    return info;
  } catch (error: any) {
    console.error("SMTP EMAIL ERROR:", error);

    // Log more details
    if (error.code) console.error("Error code:", error.code);
    if (error.response) console.error("SMTP response:", error.response);

    throw error;
  }
}
