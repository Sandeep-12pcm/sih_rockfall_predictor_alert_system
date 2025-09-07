// src/components/SMSButton.tsx
import React from "react";

type SMSButtonProps = {
  label?: string;
  endpoint?: string;
};

export default function SMSButton({
  label = "Send Test SMS",
  endpoint = "http://localhost:5000/api/send-sms",
}: SMSButtonProps) {
  async function sendSMS() {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
      });
      const data = await res.json();
      console.log("Response:", data);
      alert("SMS sent successfully!");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  return (
    <button
      onClick={sendSMS}
      style={{
        padding: "10px 20px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
