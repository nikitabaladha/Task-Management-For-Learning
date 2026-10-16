import mongoose from "mongoose";
import Task from "../../models/Task.js";

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task Id",
      });
    }

    const task = await Task.findById(taskId)
      .populate("projectId", "name description")
      .populate("assignedToId", "name email role")
      .populate("assignedById", "name email role");

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    const formatedTask = {
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
      message: "Task retrived successfully",
      data: formatedTask,
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
