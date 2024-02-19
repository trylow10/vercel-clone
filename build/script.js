import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_API_TOKEN;
const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || "https://t.me/trylow_github_bot";

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook endpoint for receiving GitHub events
app.post("/", handleGithubEvent);

// Telegram bot message handler
bot.on("message", handleMessage);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Handle incoming GitHub events
function handleGithubEvent(req, res) {
  const githubEvent = req.headers["x-github-event"];
  const data = req.body;

  switch (githubEvent) {
    case "push":
      handlePushEvent(data);
      break;
    case "pull_request":
      handlePullRequestEvent(data);
      break;
    case "create":
      handleCreateEvent(data);
      break;
    case "delete":
      handleDeleteEvent(data);
      break;
    case "pull_request_review":
      handlePullRequestReviewEvent(data);
      break;
    case "issues":
      handleIssuesEvent(data);
      break;
    case "issue_comment":
      handleIssueCommentEvent(data);
      break;
    default:
      console.log(`Unhandled event: ${githubEvent}`);
  }

  res.status(200).send("OK");
}

// Handle incoming Telegram messages
function handleMessage(msg) {
  let chatId = msg.chat.id;

  let messageText = msg.text;

  if (messageText === "/start") {
    sendTelegramMessage("welcome user", chatId);
  }
}

// Send message to Telegram
function sendTelegramMessage(message, chatId = TELEGRAM_CHAT_ID) {
  bot
    .sendMessage(chatId, message)
    .then(() =>
      console.log(
        `Message sent to Telegram id: ${chatId} and message is:  ${message}`
      )
    )
    .catch((error) =>
      console.error("Error sending message to Telegram:", error.message)
    );
}

// Event handling functions for GitHub events
function handlePushEvent(data) {
  const repository = data.repository.full_name;
  const branch = data.ref.replace("refs/heads/", "");
  const commits = data.commits.length;
  const message = `Push event in ${repository}\nBranch: ${branch}\nCommits: ${commits}`;
  sendTelegramMessage(message);
}

function handlePullRequestEvent(data) {
  const repository = data.repository.full_name;
  const action = data.action;
  const pullRequest = data.pull_request;
  const message = `Pull request ${action} in ${repository}\nTitle: ${pullRequest.title}\nURL: ${pullRequest.html_url}`;
  sendTelegramMessage(message);
}

function handleCreateEvent(data) {
  const repository = data.repository.full_name;
  const refType = data.ref_type;
  const ref = data.ref;
  const message = `New ${refType} created in ${repository}\n${refType}: ${ref}`;
  sendTelegramMessage(message);
}

function handleDeleteEvent(data) {
  const repository = data.repository.full_name;
  const refType = data.ref_type;
  const ref = data.ref;
  const message = `${refType} deleted in ${repository}\n${refType}: ${ref}`;
  sendTelegramMessage(message);
}

function handlePullRequestReviewEvent(data) {
  const repository = data.repository.full_name;
  const action = data.action;
  const pullRequest = data.pull_request;
  const review = data.review;
  const message = `Pull request review ${action} in ${repository}\nTitle: ${pullRequest.title}\nReview by: ${review.user.login}`;
  sendTelegramMessage(message);
}

function handleIssuesEvent(data) {
  const repository = data.repository.full_name;
  const action = data.action;
  const issue = data.issue;
  const message = `Issue ${action} in ${repository}\nTitle: ${issue.title}\nURL: ${issue.html_url}`;
  sendTelegramMessage(message);
}

function handleIssueCommentEvent(data) {
  const repository = data.repository.full_name;
  const action = data.action;
  const comment = data.comment;
  const issue = data.issue;
  const message = `Comment ${action} on issue in ${repository}\nTitle: ${issue.title}\nComment by: ${comment.user.login}`;
  sendTelegramMessage(message);
}
