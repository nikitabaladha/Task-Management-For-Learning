import { Request, Response } from "express";
import mongoose from "mongoose";

import Project from "../../models/Project.js";
import { updateProjectValidator } from "../../validators/projectValidator.js";

interface IPopulatedProject {
  _id: any;
  name: string;
  description?: string;
  createdBy: {
    _id: any;
    name: string;
    email: string;
    role: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const updateProjectById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
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

    const project = (await Project.findByIdAndUpdate(
      projectId as string,
      value,
      {
        new: true,
        runValidators: true,
      },
    ).populate(
      "createdBy",
      "name email role",
    )) as unknown as IPopulatedProject | null;

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
      createdEmail: project.createdBy.email,
      createdByRole: project.createdBy.role,
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
