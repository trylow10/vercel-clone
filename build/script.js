import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
const app = express();
// import { ngrockInnit } from "./ngrok.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const urlListner = await ngrockInnit();
// console.log(`Ingress established at: ${urlListner.url()}`);

// Add a route to handle the payload
app.all("/", (req, res) => {
  const githubEvent = req.headers["x-github-event"];

  if (githubEvent === "issues") {
    const data = req.body;
    const action = data.action;
    if (action === "opened") {
      console.log(`An issue was opened with this title: ${data.issue.title}`);
    } else if (action === "closed") {
      console.log(`An issue was closed by ${data.issue.user.login}`);
    } else {
      console.log(`Unhandled action for the issue event: ${action}`);
    }
  } else if (githubEvent === "ping") {
    console.log("GitHub sent the ping event");
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
  res.json({ githubEvent: githubEvent });
});
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
