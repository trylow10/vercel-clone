import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.post("/webhook", (req, res) => {
  const payload = req.body;
  console.log("Received webhook payload:", payload);
  // Process the payload here
  res.status(200).send("Webhook received successfully");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
