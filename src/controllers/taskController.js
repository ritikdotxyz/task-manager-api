import { prisma } from "../config/db.js";

const addTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await prisma.Task.create({
      data: {
        title: title,
        description: description,
        status: status,
      },
    });

    res.status(201).json({
      staus: "Success",
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createAt: task.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to add task.",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return res.status(400).json({ message: "Task with this ID not found." });
    }

    return res.status(200).json({ status: "Success", data: task });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to fetch task." });
  }
};

const getTaskList = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.status(200).json({ status: "Success", data: tasks });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to fetch tasks." });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return res.status(400).json({ message: "Task with this id not found" });
    }

    const taskUpdated = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status: status,
      },
    });

    return res.status(200).json({ status: "Success", data: taskUpdated });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to update task." });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await prisma.task.delete({
      where: { id: id },
    });

    return res.status(204).json({ status: "Success", message: `${task.title} is deleted.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to delete task." });
  }
};

export { addTask, getTask, getTaskList, updateTask, deleteTask };
