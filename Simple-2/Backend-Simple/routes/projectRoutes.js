import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import createProject from "../controllers/Project/createProject.js";
import getAllProjects from "../controllers/Project/getAllProjects.js";
import getProjectById from "../controllers/Project/getProjectById.js";
import updateProjectById from "../controllers/Project/updateProjectById.js";
import deleteProjectById from "../controllers/Project/deleteProjectById.js";

const router = express.Router();

router.post(
  "/create-project",
  authenticateUser,
  authorizeRoles("Admin"),
  createProject,
);

router.get(
  "/get-all-projects",
  authenticateUser,
  authorizeRoles("Admin", "User"),
  getAllProjects,
);

router.get(
  "/get-project-by-id/:projectId",
  authenticateUser,
  authorizeRoles("Admin", "User"),
  getProjectById,
);

router.put(
  "/update-project-by-id/:projectId",
  authenticateUser,
  authorizeRoles("Admin"),
  updateProjectById,
);

router.delete(
  "/delete-project-by-id/:projectId",
  authenticateUser,
  authorizeRoles("Admin"),
  deleteProjectById,
);

export default router;
