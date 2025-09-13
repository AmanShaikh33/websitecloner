import express from "express";
import fs from "fs";
import path from "path";
import { cloneWebsite } from "../services/cloneService.js";

const router = express.Router();

// Clone route
router.post("/clone", async (req, res) => {
  try {
    const { url, model } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const result = await cloneWebsite(url, model || "gemini");

    if (result.error) {
      return res.status(500).json(result);
    }

    res.json({
      message: result.message,
      filename: result.filename,
    });
  } catch (err) {
    console.error("Clone error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


// Download route (with filename)
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const zipPath = path.join(process.cwd(), filename);

  if (!fs.existsSync(zipPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(zipPath, filename);
});

export default router;
