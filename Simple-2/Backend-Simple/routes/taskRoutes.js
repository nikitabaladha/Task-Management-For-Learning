import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import createTask from "../controllers/Task/createTask.js";
import getAllTasks from "../controllers/Task/getAllTasks.js";
import getMyTasks from "../controllers/Task/getMyTasks.js";
import getTaskById from "../controllers/Task/getTaskById.js";
import updateTaskById from "../controllers/Task/updateTaskById.js";
import updateMyTaskStatus from "../controllers/Task/updateMyTaskStatus.js";
import deleteTaskById from "../controllers/Task/deleteTaskById.js";

const router = express.Router();

router.post(
  "/create-task",
  authenticateUser,
  authorizeRoles("Admin"),
  createTask,
);

router.delete(
  "/delete-task-by-id/:taskId",
  authenticateUser,
  authorizeRoles("Admin"),
  deleteTaskById,
);

router.get(
  "/get-all-tasks",
  authenticateUser,
  authorizeRoles("Admin"),
  getAllTasks,
);

router.get(
  "/get-task-by-id/:taskId",
  authenticateUser,
  authorizeRoles("Admin", "User"),
  getTaskById,
);

router.get(
  "/get-my-task",
  authenticateUser,
  authorizeRoles("User"),
  getMyTasks,
);

router.put(
  "/update-task-by-id/:taskId",
  authenticateUser,
  authorizeRoles("Admin"),
  updateTaskById,
);

router.put(
  "/update-my-task-status/:taskId",
  authenticateUser,
  authorizeRoles("User"),
  updateMyTaskStatus,
);

export default router;
