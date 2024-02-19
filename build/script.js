import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_API_TOKEN; // Your Telegram Bot API Token
const bot = new TelegramBot(TELEGRAM_TOKEN);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  const githubEvent = req.headers["x-github-event"];
  const githubHookId = req.headers["x-github-hook-id"];
  console.log("====", githubHookId);

  if (githubEvent === "push") {
    const data = req.body;
    const repository = data.repository.full_name;
    const commitId = data.after;
    const branch = data.ref.replace("refs/heads/", "");
    const action = "pushed"; // Assuming the action is always "pushed" for push events

    const message = `Repository: ${repository}\nCommit ID: ${commitId}\nBranch: ${branch}\nAction: ${action}`;
    sendTelegramMessage(message);

    console.log("Push event received:", message);
  } else if (githubEvent === "ping") {
    console.log("GitHub sent the ping event");
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
  res.json({ githubEvent: githubEvent });
});

app.post("/notify-telegram", (req, res) => {
  const message = req.body.message;
  sendTelegramMessage(message);
  res.json({ status: "Message sent to Telegram" });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

function sendTelegramMessage(message) {
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
}
