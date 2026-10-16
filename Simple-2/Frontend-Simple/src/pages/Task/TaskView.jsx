import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getTaskById, updateMyTaskStatus } from "../../api/taskApi.jsx";
import TaskViewComponent from "../../components/tasks/TaskView.jsx";

const TaskViewPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { taskId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTaskById(taskId);

      setTask(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleBack = () => {
    const basePath = user?.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks`);
  };

  const handleEdit = () => {
    const basePath = user?.role === "Admin" ? "/admin" : "/user";
    navigate(`${basePath}/tasks/edit/${taskId}`);
  };

  return (
    <div>
      <TaskViewComponent
        task={task}
        loading={loading}
        error={error}
        onBack={handleBack}
        onEdit={handleEdit}
        currentUserRole={user?.role}
      />
    </div>
  );
};

export default TaskViewPage;
