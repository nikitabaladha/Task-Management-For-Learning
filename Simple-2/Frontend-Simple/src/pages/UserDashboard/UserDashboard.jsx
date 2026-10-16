import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyTasks } from "../../api/taskApi.jsx";

import UserDashboardHeader from "../../components/UserDashboard/UserDashboardHeader.jsx";
import UserDashboardStatistics from "../../components/UserDashboard/UserDashboardStatistics.jsx";
import UserDashboardTaskList from "../../components/UserDashboard/UserDashboardTaskList.jsx";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyTasks();

      setTasks(data.data || []);
    } catch (error) {
      setError("Failed to fetch your tasks");
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

  const handleViewTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
