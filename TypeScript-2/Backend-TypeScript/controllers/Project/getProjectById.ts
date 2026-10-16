import { Request, Response } from "express";
import mongoose from "mongoose";

import Project from "../../models/Project.js";

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

const getProjectById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project Id",
      });
    }

    const project = (await Project.findById(projectId as string).populate(
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
      createdByName: project.createdBy.name,
      createdEmail: project.createdBy.email,
      createdByRole: project.createdBy.role,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      data: formattedProject,
    });
  } catch (error) {
    console.error("Error fetching project by Id");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getProjectById;
