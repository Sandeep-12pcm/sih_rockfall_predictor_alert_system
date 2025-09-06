import React from "react";

export default function TestSMS() {
  async function sendSMS() {
    try {
      const res = await fetch("http://localhost:5000/api/send-sms", {
        method: "POST",
      });
      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  return (
    <button
      onClick={sendSMS}
      style={{ padding: "10px 20px", background: "red", color: "white" }}
    >
      Send Test SMS
    </button>
  );
}
