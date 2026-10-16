import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/taskApi.jsx";
import { getAllProjects } from "../../api/projectApi.jsx";
import { getAllUsers } from "../../api/authApi.jsx";
import TaskCreateForm from "../../components/tasks/TaskCreate.jsx";

const TaskCreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedToId: "",
    priority: "Medium",
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data || []);
    } catch (error) {
      setError("Failed to fetch projects");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

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
      const response = await createTask(formData);

      if (response.success) {
        navigate("/admin/tasks");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/tasks");
  };

  const handleBack = () => {
    navigate("/admin/tasks");
  };

  return (
    <div>
      <h2>Create New Task</h2>
      {error && <p>{error}</p>}
      <TaskCreateForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        onCancel={handleCancel}
        projects={projects}
        users={users}
        onBack={handleBack}
      />
    </div>
  );
};

export default TaskCreatePage;
