import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  getAllTasks,
  getMyTasks,
  deleteTaskById,
  updateMyTaskStatus,
} from "../../api/taskApi";
import type { Task } from "../../types";
import TaskListView from "../../components/Tasks/TaskList";
import { handleApiError } from "../../utils/errorHandler";

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);

      let response;
      if (user?.role === "Admin") {
        response = await getAllTasks();
      } else {
        response = await getMyTasks();
      }

      setTasks(response.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleCreateTask = () => {
    const basePath = user?.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/create`);
  };

  const handleViewTask = (taskId: string) => {
    const basePath = user?.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/${taskId}`);
  };

  const handleEditTask = (taskId: string) => {
    const basePath = user?.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskById(taskId);
        toast.success("Task deleted successfully!");
        fetchTasks();
      } catch (error: any) {
        toast.error(handleApiError(error));
      }
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateMyTaskStatus(taskId, { status: newStatus });
      toast.success("Task status updated successfully!");
      fetchTasks();
    } catch (error: any) {
      toast.error(handleApiError(error));
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <>
      <TaskListView
        tasks={tasks}
        loading={loading}
        userRole={user?.role || "User"}
        onCreateTask={user?.role === "Admin" ? handleCreateTask : undefined}
        onViewTask={handleViewTask}
        onEditTask={user?.role === "Admin" ? handleEditTask : undefined}
        onDeleteTask={user?.role === "Admin" ? handleDeleteTask : undefined}
        onUpdateStatus={user?.role === "User" ? handleUpdateStatus : undefined}
      />
    </>
  );
};

export default TaskListPage;
