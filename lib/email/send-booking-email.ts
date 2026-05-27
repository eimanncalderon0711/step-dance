type SendBookingEmailParams = {
  to: string;
  fullName: string;
  referenceNumber: string;
};

export async function sendBookingEmail({
  to,
  fullName,
  referenceNumber,
}: SendBookingEmailParams) {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "Step Dance",
          email: "eimanjoshua.calderon@ustp.edu.ph",
        },
        to: [
          {
            email: to,
            name: fullName,
          },
        ],
        subject: "Booking Confirmation 🎉",
        htmlContent: `
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
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo API Error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
}