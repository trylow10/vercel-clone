import "dotenv/config";
import express from "express";
import cors from "cors";
import { innit } from "./executeScript.js";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
export let DIR_NAME;
const handler = async(req,res) =>{
  const repoUrl = req.body.GIT_URL;
  await innit(repoUrl);
  DIR_NAME = repoUrl.split("/").slice(-1)[0].replace(".git", "");
res.json({
  msg:DIR_NAME
})

}
app.post("/deploy", handler)

app.listen(PORT, () => {
  console.log(`server is running${PORT}`);
});
