import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

// Layout Components
import AdminLayout from "../components/Layout/AdminLayout";
import UserLayout from "../components/Layout/UserLayout";

// Auth Pages
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

// User Pages
import UserDashboard from "../pages/UserDashboard/UserDashboard";

// Project Pages
import ProjectList from "../pages/Project/ProjectList";
import ProjectCreate from "../pages/Project/ProjectCreate";
import ProjectView from "../pages/Project/ProjectView";
import ProjectEdit from "../pages/Project/ProjectEdit";

// Task Pages
import TaskList from "../pages/Task/TaskList";
import TaskCreate from "../pages/Task/TaskCreate";
import TaskView from "../pages/Task/TaskView";
import TaskEdit from "../pages/Task/TaskEdit";

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("Admin" | "User")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "User")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
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
