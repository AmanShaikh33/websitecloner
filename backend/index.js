import express from "express";
import cors from "cors";
import cloneRoute from "./routes/cloneRoute.js";

const app = express();

app.use(cors({
  origin: "https://websitecloner.vercel.app", // allow your frontend
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

app.use("/api", cloneRoute);

app.get("/", (req, res) => {
  res.send("✅ Website Cloner Backend is running!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
