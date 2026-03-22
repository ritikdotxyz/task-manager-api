import express from "express";
import { config } from "dotenv";

import { connectDB } from "./config/db.ts";
import taskRoutes from "./routes/taskRoute.ts";

config();
connectDB();

const app = express();

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
