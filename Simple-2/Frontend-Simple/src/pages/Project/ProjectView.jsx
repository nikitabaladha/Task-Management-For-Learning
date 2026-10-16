import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/projectApi.jsx";
import ProjectViewComponent from "../../components/projects/ProjectView.jsx";

const ProjectViewPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjectById(projectId);

      setProject(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleBack = () => {
    navigate("/admin/projects");
  };

  const handleEdit = () => {
    navigate(`/admin/projects/edit/${projectId}`);
  };

  return (
    <div>
      <ProjectViewComponent
        project={project}
        loading={loading}
        error={error}
        onBack={handleBack}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProjectViewPage;
