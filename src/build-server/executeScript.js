import { exec } from "node:child_process";
import path from "node:path";
import { getAllFiles } from "./getItems.js";
import { main } from "./awsService.js";

export const innit = async (repoUrl) => {
  // Get the current directory URL
  const url = path.dirname(new URL(import.meta.url).pathname);

  const scriptPath = path.join(url, "../../", "tunnel.sh");
  const process = exec(`bash ${scriptPath} ${repoUrl}`);
  process.stdout?.on("data", (data) => {
    console.log(data.toString());
  });

  process.stderr?.on("data", (data) => {
    console.error(data.toString());
    // Potential option: Send error to Kafka
  });

  process.on("error", (error) => {
    console.error("Error cloning repository:", error);
    // Handle error if the cloning process fails will be using kafka
  });

  // After process completion, get all files
  process.on("close", async () => {
    try {
      const toBeUploaded = await getAllFiles(repoUrl);
      console.log(toBeUploaded);
      const awsOperation = await main(toBeUploaded);
    } catch (error) {
      console.error("Error retrieving files:", error);
    }
  });
};
