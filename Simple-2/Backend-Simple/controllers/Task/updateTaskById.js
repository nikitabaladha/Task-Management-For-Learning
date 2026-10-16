import mongoose from "mongoose";

import Task from "../../models/Task.js";
import User from "../../models/User.js";
import Project from "../../models/Project.js";

import { updateTaskValidator } from "../../validators/taskValidator.js";

const updateTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task Id",
      });
    }

    const { error, value } = updateTaskValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (value.projectId) {
      if (!mongoose.Types.ObjectId.isValid(value.projectId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project Id",
        });
      }

      const project = await Project.findById(value.projectId);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
    }

    if (value.assignedToId) {
      if (!mongoose.Types.ObjectId.isValid(value.assignedToId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid assignedTo Id",
        });
      }

      const user = await User.findById(value.assignedToId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Assigned to user not found",
        });
      }

      if (user.role !== "User") {
        return res.status(400).json({
          success: false,
          message: "Task can only be assigned to a User",
        });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, value, {
      new: true,
      runValidators: true,
    })
      .populate("projectId", "name description")
      .populate("assignedToId", "name email role")
      .populate("assignedById", "name email role");

    const formattedTask = {
      _id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      projectId: updatedTask.projectId._id,
      projectName: updatedTask.projectId.name,
      projectDescription: updatedTask.projectId.description,
      priority: updatedTask.priority,
      status: updatedTask.status,
      assignedToId: updatedTask.assignedToId._id,
      assignedToName: updatedTask.assignedToId.name,
      assignedToEmail: updatedTask.assignedToId.email,
      assignedToRole: updatedTask.assignedToId.role,
      assignedById: updatedTask.assignedById._id,
      assignedByName: updatedTask.assignedById.name,
      assignedByEmail: updatedTask.assignedById.email,
      assignedByRole: updatedTask.assignedById.role,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: formattedTask,
    });
  } catch (error) {
    console.log("Error updating task", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateTaskById;
