import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTaskById } from "../../api/taskApi.jsx";
import { getAllProjects } from "../../api/projectApi.jsx";
import { getAllUsers } from "../../api/authApi.jsx";
import TaskEditForm from "../../components/tasks/TaskEdit.jsx";

const TaskEditPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedToId: "",
    priority: "Medium",
    status: "Pending",
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTaskById(taskId);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        projectId: response.data.projectId,
        assignedToId: response.data.assignedToId,
        priority: response.data.priority,
        status: response.data.status,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  };

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
    fetchTask();
    fetchProjects();
    fetchUsers();
  }, [taskId]);

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
      const response = await updateTaskById(taskId, formData);

      if (response.success) {
        navigate("/admin/tasks");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task");
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
      <h2>Edit Task</h2>
      {error && <p>{error}</p>}
      <TaskEditForm
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

export default TaskEditPage;
