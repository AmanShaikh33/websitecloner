import express from "express";
import cors from "cors";
import cloneRoute from "./routes/cloneRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cloneRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
