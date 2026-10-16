import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Task Management API is running" });
});

export default app;
