const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const MAX_CHUNK = 9500; // pour ne pas dépasser les limites ChatGPT

const ignored = [
  "node_modules",
  ".next",
  ".git",
  ".turbo",
  ".env",
  ".DS_Store",
  "dist",
  "build",
  "coverage",
  ".vercel",
  ".cache",
];

function isIgnored(file) {
  return ignored.some((ig) => file.includes(ig));
}

function readAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);

    if (isIgnored(filePath)) return;

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(readAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

function chunkText(text, size) {
  let chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.substring(i, i + size));
  }
  return chunks;
}

function exportFiles() {
  const files = readAllFiles(ROOT);

  console.log("===== EXPORT BEGIN =====");

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const chunks = chunkText(content, MAX_CHUNK);

      chunks.forEach((chunk, i) => {
        console.log(
          `\n\n\n===== FILE: ${file} — PART ${i + 1}/${chunks.length} =====`
        );
        console.log(chunk);
      });
    } catch (error) {
      console.error(`Error reading file ${file}:`, error.message);
    }
  });

  console.log("===== EXPORT COMPLETE =====");
}



