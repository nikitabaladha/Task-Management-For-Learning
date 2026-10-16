import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout-container admin-layout">
      <Header user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Sidebar userRole="Admin" />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
