import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export async function sendSMSAlert(to: string, message: string) {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    });
  } catch (err) {
    console.error("SMS send error:", err);
  }
}
