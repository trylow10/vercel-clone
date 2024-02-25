import "dotenv/config";
import express from "express";
import cors from "cors";
import { innit } from "./executeScript.js";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

export const getDirName = (repoUrl) => {
  return repoUrl.split("/").slice(-1)[0].replace(".git", "");
};

const handler = async (req, res) => {
  try {
    const repoUrl = req.body.GIT_URL;
    await innit(repoUrl);
    const dirName = getDirName(repoUrl);
    res.json({
      msg: dirName,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
app.post("/deploy", handler);
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
