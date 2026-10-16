import mongoose from "mongoose";

import Task from "../../models/Task.js";
import User from "../../models/User.js";
import Project from "../../models/Project.js";

import { createTaskValidator } from "../../validators/taskValidator.js";

const createTask = async (req, res) => {
  try {
    const { error, value } = createTaskValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { title, description, projectId, assignedToId, priority } = value;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project Id",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedToId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignedTo Id",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const user = await User.findById(assignedToId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "User") {
      return res.status(400).json({
        success: false,
        message: "Task can only be assigned to a User",
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedToId,
      priority,
      assignedById: req.user._id,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.log("Error creating task", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default createTask;
