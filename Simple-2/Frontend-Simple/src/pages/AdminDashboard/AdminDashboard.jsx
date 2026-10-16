import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllProjects } from "../../api/projectApi.jsx";
import { getAllTasks } from "../../api/taskApi.jsx";
import AdminDashboardHeader from "../../components/AdminDashboard/AdminDashboardHeader.jsx";
import AdminDashboardStatistics from "../../components/AdminDashboard/AdminDashboardStatistics.jsx";
import AdminDashboardActions from "../../components/AdminDashboard/AdminDashboardActions.jsx";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectsData, tasksData] = await Promise.all([
        getAllProjects(),
        getAllTasks(),
      ]);

      setProjects(projectsData.data || []);
      setTasks(tasksData.data || []);
    } catch (error) {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <AdminDashboardHeader user={user} onLogout={handleLogout} />
      <AdminDashboardStatistics projects={projects} tasks={tasks} />
      <AdminDashboardActions
        onManageProjects={() => navigate("/admin/projects")}
        onManageTasks={() => navigate("/admin/tasks")}
      />
    </div>
  );
};

export default AdminDashboard;
