import fs from "fs";
import path from "path";
import os from "os";
import archiver from "archiver";
import { convertHTMLToReact } from "./aiService.js";

export async function cloneWebsite(url, model = "gemini") {
  try {
    // Step 1: Fetch HTML
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch HTML: ${response.status}`);
    const htmlContent = await response.text();

    // Step 2: Convert HTML to React using selected model
    console.log(`Converting HTML to React using model: ${model}`);
    const aiResponse = await convertHTMLToReact(htmlContent, model);

    // Step 3: Parse AI response into files
    const lines = aiResponse.split("\n");
    let currentFile = "";
    const files = {};

    for (let line of lines) {
      if (line.startsWith("FILE:")) {
        currentFile = line.replace("FILE:", "").trim();
        files[currentFile] = "";
      } else if (currentFile) {
        files[currentFile] += line + "\n";
      }
    }

    // Step 4: Create project folder temporarily
    const projectPath = path.join(process.cwd(), "cloned-react-app");
    if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);

    // Step 5: Write files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(projectPath, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, content.trim());
    }

    // Step 6: Zip the folder to Downloads
    const downloadsPath = path.join(os.homedir(), "Downloads");
    if (!fs.existsSync(downloadsPath)) fs.mkdirSync(downloadsPath); // ensure folder exists
    const zipFileName = `cloned-react-app-${Date.now()}.zip`;
    const zipPath = path.join(downloadsPath, zipFileName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(projectPath, false);
    await archive.finalize();

    console.log(`✅ React app zipped successfully at: ${zipPath}`);

    // Optional: Clean up temporary project folder
    fs.rmSync(projectPath, { recursive: true, force: true });

    return {
      message: `React app generated and zipped successfully using ${model}!`,
      zipPath, // absolute path to the zip in Downloads
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to clone and zip website", details: error.message };
  }
}
