import { exec } from "child_process";
import path from "path";

export const innit = async (repoUrl) => {
  try {
    // Derive the absolute path to the script file
    const url = path.dirname(new URL(import.meta.url).pathname);
    const scriptPath = path.join(url, "tunnel.sh");

    // Execute the script
    const cloneFilePath = "/home/trilo/output";
    const nodeProcess = exec(`bash ${scriptPath} ${repoUrl}`);

    nodeProcess.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    nodeProcess.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    nodeProcess.on("error", (error) => {
      console.error("Error", error);
    });

    nodeProcess.on("close", () => {
      console.log("Script execution complete");
    });

    // Install dependencies after the script execution completes
    nodeProcess.on("close", () => {
      const npmProcess = exec(`cd ${cloneFilePath} && npm install`);

      npmProcess.stdout?.on("data", (data) => {
        console.log(data.toString());
      });

      npmProcess.stderr?.on("data", (data) => {
        console.error(data.toString());
      });

      npmProcess.on("error", (error) => {
        console.error("Error", error);
      });

      npmProcess.on("close", () => {
        console.log("Dependencies installation complete");
      });
    });
  } catch (error) {
    console.error("Error executing script:", error);
    throw error; // Rethrow the error for further handling
  }
};
