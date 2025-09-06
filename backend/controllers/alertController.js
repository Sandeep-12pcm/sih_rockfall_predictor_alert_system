const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Route: send SMS
app.post("/api/send-sms", async (req, res) => {
  try {
    const result = await client.messages.create({
      body: "⚠️ Rockfall High Risk Detected!",
      from: process.env.TWILIO_PHONE,
      to: "+917303042793",
    });

    console.log(`📲 SMS sent: ${result.sid}`);
    res.json({ success: true, sid: result.sid });
  } catch (err) {
    console.error("❌ SMS error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});
