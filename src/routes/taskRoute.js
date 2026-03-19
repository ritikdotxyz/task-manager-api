import express from "express";

import {
  addTask,
  getTask,
  getTaskList,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const route = express.Router();

route.get("/", getTaskList);
route.post("/", addTask);
route.get("/:id", getTask);
route.patch("/:id", updateTask);
route.delete("/:id", deleteTask);

export default route;
