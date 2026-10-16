import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject } from "../../api/projectApi";
import type { ProjectFormData } from "../../types";
import ProjectCreateForm from "../../components/Projects/ProjectCreate";
import { handleApiError } from "../../utils/errorHandler";

const ProjectCreate = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const response = await createProject(formData);

      if (response.success) {
        toast.success("Project created successfully!");
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
      <h2>Create New Project</h2>
      <ProjectCreateForm
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

export default ProjectCreate;
