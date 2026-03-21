import express from "express";

import {
  addTask,
  getTask,
  getTaskList,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  addTaskSchema,
  updateTaskSchema,
} from "../validators/taskValidators.js";

import { validateData } from "../middlewares/validateMiddleware.js";

const route = express.Router();

route.get("/", getTaskList);
route.post("/", validateData(addTaskSchema), addTask);
route.get("/:id", getTask);
route.patch("/:id", validateData(updateTaskSchema), updateTask);
route.delete("/:id", deleteTask);

export default route;
