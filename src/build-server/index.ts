import express from "express";
import cors from "cors";
import "dotenv/config";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", (req, res) => {
  const repoUrl = req.body.gitUrl;
  
});

app.listen(PORT, () => {
  console.log(`server is running${PORT}`);
});
