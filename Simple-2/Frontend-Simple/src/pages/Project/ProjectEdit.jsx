import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProjectById } from "../../api/projectApi.jsx";
import ProjectEditForm from "../../components/projects/ProjectEdit.jsx";

const ProjectEditPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjectById(projectId);

      setFormData({
        name: response.data.name,
        description: response.data.description,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

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
      const response = await updateProjectById(projectId, formData);

      if (response.success) {
        navigate("/admin/projects");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update project");
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
      {error && <p>{error}</p>}
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
