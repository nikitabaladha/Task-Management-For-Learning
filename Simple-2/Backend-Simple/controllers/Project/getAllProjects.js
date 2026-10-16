import Project from "../../models/Project.js";

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    const formatedProject = projects.map((project) => ({
      _id: project._id,
      name: project.name,
      description: project.description,
      createdById: project.createdBy._id,
      createdByName: project.createdBy.name,
      createdByEmail: project.createdBy.email,
      createdByRole: project.createdBy.role,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "All projects fetched successfully",
      data: formatedProject,
    });
  } catch (error) {
    console.error("Error fetching all projects", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllProject;
