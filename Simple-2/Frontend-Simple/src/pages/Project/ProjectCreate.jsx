import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../api/projectApi.jsx";
import ProjectCreateForm from "../../components/projects/ProjectCreate.jsx";

const ProjectCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createProject(formData);

      if (response.success) {
        navigate("/admin/projects");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create project");
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
      {error && <p>{error}</p>}
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
