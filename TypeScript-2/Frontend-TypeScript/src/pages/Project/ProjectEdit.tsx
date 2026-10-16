import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById, updateProjectById } from "../../api/projectApi";
import type { ProjectFormData } from "../../types";
import ProjectEditForm from "../../components/Projects/ProjectEdit";
import { handleApiError } from "../../utils/errorHandler";

const ProjectEditPage = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      setLoading(true);

      const response = await getProjectById(projectId!);

      setFormData({
        name: response.data.name,
        description: response.data.description,
      });
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProjectById(projectId!, formData);

      if (response.success) {
        toast.success("Project updated successfully!");
        navigate("/admin/projects");
      }
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/projects");
  };

  const handleBack = () => {
    navigate("/admin/projects");
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <ProjectEditForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        onCancel={handleCancel}
        onBack={handleBack}
      />
    </div>
  );
};

export default ProjectEditPage;
