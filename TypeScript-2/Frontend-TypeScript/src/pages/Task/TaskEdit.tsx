import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTaskById, updateTaskById } from "../../api/taskApi";
import { getAllProjects } from "../../api/projectApi";
import { getAllUsers } from "../../api/authApi";
import type { TaskFormData, Project, User } from "../../types";
import TaskEditForm from "../../components/Tasks/TaskEdit";
import { handleApiError } from "../../utils/errorHandler";

const TaskEditPage = () => {
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

  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      setLoading(true);

      const response = await getTaskById(taskId!);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        project: response.data.project,
        assignedTo: response.data.assignedTo,
        priority: response.data.priority,
        status: response.data.status,
      });
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

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
    fetchTask();
    fetchProjects();
    fetchUsers();
  }, [taskId]);

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
      const response = await updateTaskById(taskId!, formData);

      if (response.success) {
        toast.success("Task updated successfully!");
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
      <h2>Edit Task</h2>
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
