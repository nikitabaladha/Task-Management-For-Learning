import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "../../api/projectApi";
import type { Project } from "../../types";
import ProjectViewComponent from "../../components/Projects/ProjectView";
import { handleApiError } from "../../utils/errorHandler";

const ProjectViewPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      setLoading(true);

      const response = await getProjectById(projectId!);

      setProject(response.data);
    } catch (error: any) {
      toast.error(handleApiError(error));
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
        onBack={handleBack}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProjectViewPage;
