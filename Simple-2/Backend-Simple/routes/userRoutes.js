import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import signup from "../controllers/User/signup.js";
import login from "../controllers/User/login.js";
import getAllUsers from "../controllers/User/getAllUsers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get(
  "/get-all-users",
  authenticateUser,
  authorizeRoles("Admin"),
  getAllUsers,
);

export default router;
