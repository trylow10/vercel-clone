import { exec } from "child_process";
import path from "node:path";
import { getAllFiles } from "./getItems.js";

export const innit = async (repoUrl) => {
  // Get the current directory URL
  const url = new URL(import.meta.url).pathname;
  // Construct the script path
  const scriptPath = path.join(url, "../../tunnel.sh");

  // Execute the shell script
  const process = exec(`bash ${scriptPath} ${repoUrl}`);

  // Log stdout data
  process.stdout?.on("data", (data) => {
    console.log(data.toString());
  });

  // Log stderr data and handle accordingly
  process.stderr?.on("data", (data) => {
    console.error(data.toString());
    // Potential option: Send error to Kafka
  });

  // Handle errors during process execution
  process.on("error", (error) => {
    console.error("Error cloning repository:", error);
    // Handle error if the cloning process fails
  });

  // After process completion, get all files
  process.on("close", async () => {
    try {
      // Await the result of getAllFiles
      const files = await getAllFiles(repoUrl);
      console.log(files);
    } catch (error) {
      console.error("Error retrieving files:", error);
      // Handle error in getting files
    }
  });
};
