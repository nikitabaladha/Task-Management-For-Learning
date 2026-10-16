import type { User } from "../../types";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header>
      <div className="header-content">
        <h1>Task Management System</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <span className="role-badge">{user?.role}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
