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
  const finalPaths = [];
  try {
    const filePaths = glob.sync("**/*", { cwd: distDirectory, nodir: true });
    for (const file of filePaths) {
      const finalPath = path.join(distDirectory, file);
      finalPaths.push({ relativePath: file, absolutePath: finalPath });
    }
    return finalPaths;
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};
