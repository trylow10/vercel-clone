import "dotenv/config";
import express from "express";
import cors from "cors";
import { innit } from "./executeScript.js";
const PORT = process.env.PORT || 3001;
import { DIR_NAME } from "./getItems.js";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  repoUrl = req.body.GIT_URL;
  await innit(repoUrl);
  res.json({
    msg: `The repo named ${DIR_NAME}  is sucessfully cloned`,
  });
});

app.listen(PORT, () => {
  console.log(`server is running${PORT}`);
});
