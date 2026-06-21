import { formatInTimeZone } from "date-fns-tz";

type SendBookingEmailParams = {
  to: string;
  fullName: string;
  referenceNumber: string;
  startTime: Date;
};

export async function sendBookingEmail({
  to,
  fullName,
  referenceNumber,
  startTime,
}: SendBookingEmailParams) {

    const scheduleText = formatInTimeZone(
    startTime,
    "Asia/Manila",
    "MMMM d, yyyy, h:mm a"
  );
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

            <p>Hi <b>${fullName}</b>!,</p>

            <p>Your StepDancePH booking is <b>CONFIRMED</b>. Thank you!</p>

            <p>
              You schedule is on: ${scheduleText} 1 slot booked.<br><br>
            </p>


            <div>
              <strong>📍 Reminders:</strong>
              <ul>
                <li>Be there 15 mins before your session</li>
                <li>Wear comfy fitness attire</li>
                <li>Bring water</li>
                <li>Strictly no refund (but transferable if needed)</li>
              </ul>
            </div>

            <p>
              <b>Reference Number:</b><br>
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

    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
}