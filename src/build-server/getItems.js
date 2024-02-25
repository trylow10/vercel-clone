import path from "node:path";
import fs from "node:fs";
import { getDirName } from "./index.js";

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

  const files = [];
  try {
    readDirectory(distDirectory, repositoryName, files);
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};

function readDirectory(directory, repositoryName, files) {
  const directoryContents = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of directoryContents) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      readDirectory(fullPath, repositoryName, files);
    } else {
      const filePath = `/${repositoryName}/${
        fullPath.split(`/output/${repositoryName}/`)[1]
      }`;
      files.push(filePath);
    }
  }
}
