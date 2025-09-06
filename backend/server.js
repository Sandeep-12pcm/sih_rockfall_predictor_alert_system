const express = require("express");
const cors = require("cors");
const smsRoutes = require("./routes/smsRoute");

const app = express();

// Enable CORS for all origins (or restrict if needed)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api", smsRoutes);

app.listen(5000, () => {
  console.log("🚀 Alert backend running on http://localhost:5000");
});
