import Task from "../../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId", "name description")
      .populate("assignedToId", "name email role")
      .populate("assignedById", "name email role")
      .sort({ createdAt: -1 });

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
    console.log("Error fetching all tasks:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllTasks;
