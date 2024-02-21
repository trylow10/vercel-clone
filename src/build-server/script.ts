import { exec } from "node:child_process";
import "dotenv/config";
import path from "node:path";
//   if (!repoExists) {
//     child_process.execSync(
//       `git clone https://${username}:${process.env.PERSONAL_ACCESS_TOKEN}@github.com/${username}/${repo}.git repos/${username}/${repo}`
//     );
//   } else {
//     child_process.execSync(
//       `cd repos/${username}/${repo} && git pull origin ${branch} --rebase`
//     );
//   }
// };
export const innit = (repoUrl = "") => {
  const filePath = path.join(__dirname, "out");
  const nodeProcess = exec(`cd ${filePath} && npm install && npm run build`);

  nodeProcess.stdout?.on("data", (data) => {
    console.log(data.toString());
  });
  nodeProcess.on("error", (data) => {
    console.log("Error", data.toString());
  });
  nodeProcess.on("close", () => {
    console.log("build complete");
  });
};

innit();
