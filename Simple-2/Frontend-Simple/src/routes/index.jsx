import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Layout Components
import AdminLayout from "../components/Layout/AdminLayout.jsx";
import UserLayout from "../components/Layout/UserLayout.jsx";

// Auth Pages
import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard.jsx";

// User Pages
import UserDashboard from "../pages/UserDashboard/UserDashboard.jsx";

// Project Pages
import ProjectList from "../pages/Project/ProjectList.jsx";
import ProjectCreate from "../pages/Project/ProjectCreate.jsx";
import ProjectView from "../pages/Project/ProjectView.jsx";
import ProjectEdit from "../pages/Project/ProjectEdit.jsx";

// Task Pages
import TaskList from "../pages/Task/TaskList.jsx";
import TaskCreate from "../pages/Task/TaskCreate.jsx";
import TaskView from "../pages/Task/TaskView.jsx";
import TaskEdit from "../pages/Task/TaskEdit.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes with Layout */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/create" element={<ProjectCreate />} />
        <Route path="projects/:projectId" element={<ProjectView />} />
        <Route path="projects/edit/:projectId" element={<ProjectEdit />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/create" element={<TaskCreate />} />
        <Route path="tasks/:taskId" element={<TaskView />} />
        <Route path="tasks/edit/:taskId" element={<TaskEdit />} />
      </Route>

      {/* User Routes with Layout */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:taskId" element={<TaskView />} />
      </Route>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
