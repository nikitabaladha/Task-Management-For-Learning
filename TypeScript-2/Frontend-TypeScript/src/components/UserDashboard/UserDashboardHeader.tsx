import type { User } from "../../types";

interface UserDashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

const UserDashboardHeader = ({ user, onLogout }: UserDashboardHeaderProps) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserDashboardHeader;
