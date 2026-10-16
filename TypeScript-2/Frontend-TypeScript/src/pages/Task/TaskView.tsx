import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getTaskById } from "../../api/taskApi";
import type { Task } from "../../types";
import TaskViewComponent from "../../components/Tasks/TaskView";
import { handleApiError } from "../../utils/errorHandler";

const TaskViewPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  const { taskId } = useParams<{ taskId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      setLoading(true);

      const response = await getTaskById(taskId!);

      setTask(response.data);
    } catch (error: any) {
      toast.error(handleApiError(error));
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
        currentUserRole={user?.role || "User"}
      />
    </div>
  );
};

export default TaskViewPage;
