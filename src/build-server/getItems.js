import path from "node:path";
import fs from "node:fs";
import { DIR_NAME } from "./index.js";
export const getAllFiles = async () => {
  const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);
  const distPath = path.join(
    currentModuleDir,
    "../../../../trilo/output",
    DIR_NAME,
    "dist"
  );

  try {
    readDirectory(distPath);
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};

function readDirectory(directory) {
  const distContent = fs.readdirSync(directory, { withFileTypes: true });

  for (const dirent of distContent) {
    const fullPath = path.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      readDirectory(fullPath);
    } else {
      console.log(fullPath);
    }
  }
}
