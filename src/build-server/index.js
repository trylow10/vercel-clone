import express from "express";
import cors from "cors";
import "dotenv/config";
import { innit } from "./executeScript.js";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.GIT_URL;
  await innit(repoUrl); // Call `innit` function to execute script
  res.json({
    msg: "Script execution finish",
  });
});

app.listen(PORT, () => {
  console.log(`server is running${PORT}`);
});
