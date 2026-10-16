import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllTasks, getMyTasks, deleteTaskById, updateMyTaskStatus } from "../../api/taskApi.jsx";
import TaskListView from "../../components/tasks/TaskList.jsx";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      let response;
      if (user.role === "Admin") {
        response = await getAllTasks();
      } else {
        response = await getMyTasks();
      }

      setTasks(response.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleCreateTask = () => {
    const basePath = user.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/create`);
  };

  const handleViewTask = (taskId) => {
    const basePath = user.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/${taskId}`);
  };

  const handleEditTask = (taskId) => {
    const basePath = user.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskById(taskId);
        fetchTasks();
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete task");
      }
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await updateMyTaskStatus(taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task status");
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <TaskListView
        tasks={tasks}
        loading={loading}
        error={error}
        userRole={user.role}
        onCreateTask={user.role === "Admin" ? handleCreateTask : undefined}
        onViewTask={handleViewTask}
        onEditTask={user.role === "Admin" ? handleEditTask : undefined}
        onDeleteTask={user.role === "Admin" ? handleDeleteTask : undefined}
        onUpdateStatus={user.role === "User" ? handleUpdateStatus : undefined}
      />
    </>
  );
};

export default TaskListPage;
