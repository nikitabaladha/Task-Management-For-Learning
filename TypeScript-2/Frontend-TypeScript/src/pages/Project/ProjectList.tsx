import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProjects, deleteProjectById } from "../../api/projectApi";
import type { Project } from "../../types";
import ProjectListView from "../../components/Projects/ProjectList";
import { handleApiError } from "../../utils/errorHandler";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await getAllProjects();

      setProjects(response.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    navigate("/admin/projects/create");
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/admin/projects/${projectId}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/admin/projects/edit/${projectId}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProjectById(projectId);
        toast.success("Project deleted successfully!");
        fetchProjects();
      } catch (error: any) {
        toast.error(handleApiError(error));
      }
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <>
      <ProjectListView
        projects={projects}
        loading={loading}
        onCreateProject={handleCreateProject}
        onViewProject={handleViewProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
    </>
  );
};

export default ProjectList;
