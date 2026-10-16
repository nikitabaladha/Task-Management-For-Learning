import mongoose from "mongoose";

import Project from "../../models/Project.js";

const deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid project Id",
      });
    }

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting project by Id", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteProjectById;
