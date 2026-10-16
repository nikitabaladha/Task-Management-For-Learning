import mongoose from "mongoose";

import Task from "../../models/Task.js";

const deleteTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task Id",
      });
    }

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
    });
  } catch (error) {
    console.log("Error deleting task", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteTaskById;
