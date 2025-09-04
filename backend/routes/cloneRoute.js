import express from "express";
import { cloneWebsite } from "../services/cloneService.js";
import path from "path";

const router = express.Router();

router.post("/clone", cloneWebsite);

// Download route
router.get("/download", (req, res) => {
  const zipPath = path.join(process.cwd(), "output/react-app.zip");
  res.download(zipPath, "cloned-react-app.zip");
});

export default router;
