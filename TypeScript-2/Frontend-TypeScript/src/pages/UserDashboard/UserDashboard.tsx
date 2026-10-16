import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getMyTasks } from "../../api/taskApi";
import type { Task } from "../../types";
import UserDashboardHeader from "../../components/UserDashboard/UserDashboardHeader";
import UserDashboardStatistics from "../../components/UserDashboard/UserDashboardStatistics";
import UserDashboardTaskList from "../../components/UserDashboard/UserDashboardTaskList";
import { handleApiError } from "../../utils/errorHandler";

const UserDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchMyTasks = async () => {
    try {
      setLoading(true);

      const data = await getMyTasks();

      setTasks(data.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewTask = (taskId: string) => {
    navigate(`/user/tasks/${taskId}`);
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <UserDashboardHeader user={user} onLogout={handleLogout} />
      <UserDashboardStatistics tasks={tasks} />
      <UserDashboardTaskList tasks={tasks} onViewTask={handleViewTask} />
    </div>
  );
};

export default UserDashboard;
