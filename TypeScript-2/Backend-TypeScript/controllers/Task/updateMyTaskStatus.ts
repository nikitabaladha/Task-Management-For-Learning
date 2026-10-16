import { Request, Response } from "express";
import mongoose from "mongoose";

import Task from "../../models/Task.js";
import { updateMyTaskValidator } from "../../validators/taskValidator.js";

const updateMyTaskStatus = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task Id",
      });
    }

    const { error, value } = updateMyTaskValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      assignedToId: req.user!._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = value.status;

    await task.save();
    
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        _id: task._id,
        title: task.title,
        status: task.status,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating task", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateMyTaskStatus;
