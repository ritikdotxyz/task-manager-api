import express, { Router } from "express";

import {
  addTask,
  getTask,
  getTaskList,
  updateTask,
  deleteTask,
} from "../controllers/taskController.ts";

import {
  addTaskSchema,
  updateTaskSchema,
} from "../validators/taskValidators.ts";

import { validateData } from "../middlewares/validateMiddleware.ts";

const route: Router = express.Router();

route.get("/", getTaskList);
route.post("/", validateData(addTaskSchema), addTask);
route.get("/:id", getTask);
route.patch("/:id", validateData(updateTaskSchema), updateTask);
route.delete("/:id", deleteTask);

export default route;
