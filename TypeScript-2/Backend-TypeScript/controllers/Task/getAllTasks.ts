import { Request, Response } from "express";

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

const getAllTasks = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = (await Task.find()
      .populate("projectId", "name description")
      .populate("assignedToId", "name email role")
      .populate("assignedById", "name email role")
      .sort({ createdAt: -1 })) as unknown as IPopulatedTask[];

    const formattedTasks = tasks.map((task) => ({
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
    }));

    return res.status(200).json({
      success: true,
      message: "All task fetched successfully",
      data: formattedTasks,
    });
  } catch (error) {
    console.error("Error fetching all tasks:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllTasks;
