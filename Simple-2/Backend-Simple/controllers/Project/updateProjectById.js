import mongoose from "mongoose";
import Project from "../../models/Project.js";
import { updateProjectValidator } from "../../validators/projectValidator.js";

const updateProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project ID",
      });
    }

    const { error, value } = updateProjectValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const project = await Project.findByIdAndUpdate(projectId, value, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email role");

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
      createdByEmail: project.createdBy.email,
      createdByRole: project.createdBy.role,
      createdByName: project.createdBy.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Project updated successfully by project Id",
      data: formattedProject,
    });
  } catch (error) {
    console.error("Error updating project by Id", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateProjectById;
