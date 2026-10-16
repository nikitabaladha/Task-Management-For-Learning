import mongoose from "mongoose";
import Project from "../../models/Project.js";

const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project Id",
    });
  }

  const project = await Project.findById(projectId).populate(
    "createdBy",
    "name email role",
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const formattedProject = {
    _id: project._id,
    name: project.name,
    description: project.description,
    createdById: project.createdBy._id,
    createdByName: project.createdBy.name,
    createdByEmail: project.createdBy.email,
    createdByRole: project.createdBy.role,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };

  return res.status(200).json({
    success: true,
    message: "Project found successfully",
    data: formattedProject,
  });
  try {
  } catch (error) {
    console.error("Error fetching project by Id");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getProjectById;
