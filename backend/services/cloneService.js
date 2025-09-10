import fs from "fs";
import path from "path";
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

    // Step 4: Create project folder temporarily in backend root
    const projectPath = path.join(process.cwd(), "cloned-react-app-temp");
    if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);

    // Step 5: Write files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(projectPath, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, content.trim());
    }

    // Step 6: Create zip with unique filename
    const zipFileName = `cloned-react-app-${Date.now()}.zip`;
    const zipPath = path.join(process.cwd(), zipFileName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(projectPath, false);
    await archive.finalize();

    console.log(`✅ React app zipped successfully at: ${zipPath}`);

    // Step 7: Clean up temporary project folder
    fs.rmSync(projectPath, { recursive: true, force: true });

    return {
      message: `React app generated and zipped successfully using ${model}!`,
      filename: zipFileName, // return only filename, not full path
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to clone and zip website", details: error.message };
  }
}
