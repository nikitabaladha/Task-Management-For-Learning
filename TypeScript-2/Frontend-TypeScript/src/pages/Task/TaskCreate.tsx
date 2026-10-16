import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTask } from "../../api/taskApi";
import { getAllProjects } from "../../api/projectApi";
import { getAllUsers } from "../../api/authApi";
import type { TaskFormData, Project, User } from "../../types";
import TaskCreateForm from "../../components/Tasks/TaskCreate";
import { handleApiError } from "../../utils/errorHandler";

const TaskCreatePage = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      const response = await createTask(formData);

      if (response.success) {
        toast.success("Task created successfully!");
        navigate("/admin/tasks");
      }
    } catch (error: any) {
      toast.error(handleApiError(error));
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
