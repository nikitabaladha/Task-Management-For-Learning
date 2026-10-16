import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getAllProjects } from "../../api/projectApi";
import { getAllTasks } from "../../api/taskApi";
import type { Project, Task } from "../../types";
import AdminDashboardHeader from "../../components/AdminDashboard/AdminDashboardHeader";
import AdminDashboardStatistics from "../../components/AdminDashboard/AdminDashboardStatistics";
import AdminDashboardActions from "../../components/AdminDashboard/AdminDashboardActions";
import { handleApiError } from "../../utils/errorHandler";

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [projectsData, tasksData] = await Promise.all([
        getAllProjects(),
        getAllTasks(),
      ]);

      setProjects(projectsData.data || []);
      setTasks(tasksData.data || []);
    } catch (error: any) {
      toast.error(handleApiError(error));
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
