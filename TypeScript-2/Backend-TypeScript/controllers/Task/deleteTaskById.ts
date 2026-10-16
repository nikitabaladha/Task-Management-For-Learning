import { Request, Response } from "express";
import mongoose from "mongoose";

import Task from "../../models/Task.js";

const deleteTaskById = async (
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

    const task = await Task.findByIdAndDelete(taskId as string);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteTaskById;
