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
  // Access payload data from request body
  const payloadData = req.body;

  // Do something with the payload data
  console.log("Payload data:", payloadData);

  // Send response
  res.status(200).send("Payload received successfully.");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
