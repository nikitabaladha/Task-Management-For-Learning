import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProjects, deleteProjectById } from "../../api/projectApi.jsx";
import ProjectListView from "../../components/projects/ProjectList.jsx";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProjects();

      setProjects(response.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch projects");
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

  const handleViewProject = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  const handleEditProject = (projectId) => {
    navigate(`/admin/projects/edit/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProjectById(projectId);
        fetchProjects();
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete project");
      }
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ProjectListView
        projects={projects}
        loading={loading}
        error={error}
        onCreateProject={handleCreateProject}
        onViewProject={handleViewProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
    </>
  );
};

export default ProjectList;
