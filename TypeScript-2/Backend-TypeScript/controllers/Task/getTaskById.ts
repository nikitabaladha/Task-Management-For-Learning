import { Request, Response } from "express";
import mongoose from "mongoose";

import Task from "../../models/Task.js";

interface IPopulatedTask {
  _id: any;
  title: string;
  description?: string;
  projectId: {
    _id: any;
    name: string;
    description?: string;
  };
  assignedToId: {
    _id: any;
    name: string;
    email: string;
    role: string;
  };
  assignedById: {
    _id: any;
    name: string;
    email: string;
    role: string;
  };
  status: string;
  priority: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task Id",
      });
    }

    const task = (await Task.findById(taskId as string)
      .populate("projectId", "name description")
      .populate("assignedToId", "name email role")
      .populate(
        "assignedById",
        "name email role",
      )) as unknown as IPopulatedTask | null;

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const formattedTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      projectId: task.projectId._id,
      projectName: task.projectId.name,
      projectDescription: task.projectId.description,
      priority: task.priority,
      status: task.status,
      assignedToId: task.assignedToId._id,
      assignedToName: task.assignedToId.name,
      assignedToEmail: task.assignedToId.email,
      assignedToRole: task.assignedToId.role,
      assignedById: task.assignedById._id,
      assignedByName: task.assignedById.name,
      assignedByEmail: task.assignedById.email,
      assignedByRole: task.assignedById.role,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: formattedTask,
    });
  } catch (error) {
    console.log("Error fetching task by Id", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getTaskById;
