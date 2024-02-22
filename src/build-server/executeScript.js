import { exec } from "child_process";
import path from "path";
import { glob } from "glob";
import { generate } from "./generateId.js";

export const innit = (repoUrl) => {
  const id = generate(); // asd12
  const url = path.dirname(new URL(import.meta.url).pathname);
  const scriptPath = path.join(url, "tunnel.sh");
  const cloneProcess = exec(`bash ${scriptPath} ${repoUrl}`);

  cloneProcess.stdout?.on("data", (data) => {
    console.log(data.toString());
  });

  cloneProcess.stderr?.on("data", (data) => {
    console.error(data.toString());
  });

  cloneProcess.on("error", (error) => {
    console.error("Error cloning repository:", error);
    // Handle error if the cloning process fails
  });

  cloneProcess.on("close", () => {
    console.log("Repository cloned successfully.");

    // Find all package.json files within the cloned repository directory
    const packageJsonFiles = glob.sync(
      `/home/trilo/output/${id}/**/package.json`
    );

    // Iterate over each package.json file and run npm install in its directory
    packageJsonFiles.forEach((packageJsonFile) => {
      const packageDir = path.dirname(packageJsonFile);
      console.log(`Installing dependencies in ${packageDir}...`);
      const installProcess = exec(`npm install`, { cwd: packageDir });

      installProcess.stdout?.on("data", (data) => {
        console.log(data.toString());
      });

      installProcess.stderr?.on("data", (data) => {
        console.error(data.toString());
      });

      installProcess.on("error", (error) => {
        console.error(`Error installing dependencies in ${packageDir}:`, error);
        // Handle error if npm install fails
      });

      installProcess.on("close", () => {
        console.log(`Dependencies installed successfully in ${packageDir}.`);
      });
    });
  });
};
