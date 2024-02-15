import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  console.log("Body:" + JSON.stringify(req.body, null, 3));
  res.json({ message: "Thank you for the message" });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
