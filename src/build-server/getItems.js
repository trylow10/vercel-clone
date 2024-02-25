import path from "node:path";
import { getDirName } from "./index.js";
import { glob } from "glob";

export const getAllFiles = async (repoUrl) => {
  const currentModuleDirectory = path.dirname(
    new URL(import.meta.url).pathname
  );
  const baseOutputDirectory = "../../../../trilo/output/";
  const repositoryName = await getDirName(repoUrl);
  const distDirectory = path.join(
    currentModuleDirectory,
    baseOutputDirectory,
    repositoryName,
    "dist"
  );

  try {
    const files = glob.sync("**/*", { cwd: distDirectory, nodir: true });
    const formattedFiles = files.map(
      (filePath) => `${repositoryName}/dist/${filePath}`
    );
    return formattedFiles.join("\n");
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};
