// import axios from "axios";
// import fs from "fs";
// import path from "path";
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");
const ACCESS_KEY = "b4f0070f-3c6a-4ac2-a5418ee9a2c6-33d5-4b76";
// const ACCESS_KEY = "4d28bc2e-1c91-477a-893a-b1f690b0ac430879d662-f0a6-4bbe-a1e7-c174dba26751"
async function cdnupload(file, name) {
  const buffer = Buffer.from(file.buffer);
  const filename = name + ".gba";

  const url = `https://storage.bunnycdn.com/shaboygames/roms/${filename}`;
  try {
    const req = await axios.put(url, buffer, {
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": "application/octet-stream",
      },
      hostname: "storage.bunnycdn.com",
      path: `/shaboygames/roms/${filename}`,
    });
    console.log(req.data);
    return req.data;
  } catch (e) {
    console.log(e);
  }
}

async function readFile(filePath) {
  const items = await fs.promises.readdir(filePath, { withFileTypes: true });
  const urls = [];
  for (const item of items) {
    const fullPath = path.join(filePath, item.name);
    if (item.isDirectory()) {
      await readFile(fullPath); // Recursively search in subdirectories
    } else if (item.isFile() && path.extname(item.name) === ".gba") {
      const fileBuffer = await fs.promises.readFile(fullPath);
      // const readStream = fs.createReadStream(fullPath);
      // const url = await uploadFile(fullPath, encodeURIComponent(path.basename(item.name, '.gba')));
      let name = path.basename(item.name, ".gba")
      name = name.replace(/(\(U\)|\(M\)|\(E\))$/, '')
      if (name.includes("(E)")) {
        name = name.replace("(E)", "")
      }
      if (name.includes("(U)")) {
        name = name.replace("(U)", "")
      }
      if (name.includes("(M3)")) {
        name = name.replace("(M3)", "")
      }
      if (name.includes("(M5)")) {
        name = name.replace("(M5)", "")
      }

      console.log(name.trim()+".gba");
      const url = await cdnupload(fileBuffer,name.trim()+".gba" ); // Assuming cdnupload is accessible
      // urls.push(url);
    }
  }
  return urls;
}

async function main() {
  const filePath = path.join(__dirname, "../../../../../../Downloads/roms");
  const urls = await readFile(filePath);
}
main();
