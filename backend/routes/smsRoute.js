const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Route handler
router.post("/send-sms", async (req, res) => {
  try {
    const result = await client.messages.create({
      body: "⚠️ Rockfall High Risk Detected!",
      from: process.env.TWILIO_PHONE,
      to: "+917303042793", // test number
    });

    console.log(`📲 SMS sent: ${result.sid}`);
    res.json({ success: true, sid: result.sid });
  } catch (err) {
    console.error("❌ SMS error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
