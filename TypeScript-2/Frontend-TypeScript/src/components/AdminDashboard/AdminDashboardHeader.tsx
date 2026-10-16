import type { User } from "../../types";

interface AdminDashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

const AdminDashboardHeader = ({
  user,
  onLogout,
}: AdminDashboardHeaderProps) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboardHeader;
