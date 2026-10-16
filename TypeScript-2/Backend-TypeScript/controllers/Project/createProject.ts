import { Request, Response } from "express";

import Project from "../../models/Project.js";
import { createProjectValidator } from "../../validators/projectValidator.js";

const createProject = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { error, value } = createProjectValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name, description } = value;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user!._id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error creating project", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default createProject;
