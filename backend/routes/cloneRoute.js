import express from "express";
import { cloneWebsite } from "../services/cloneService.js";
import path from "path";

const router = express.Router();

router.post("/clone", async (req, res) => {
  const { url, model } = req.body; // model can be "gemini" or "openrouter"
  const result = await cloneWebsite(url, model || "gemini");
  res.json(result);
});

// Download route
router.get("/download", (req, res) => {
  const zipPath = path.join(process.cwd(), "cloned-react-app.zip");
  res.download(zipPath, "cloned-react-app.zip");
});

export default router;
