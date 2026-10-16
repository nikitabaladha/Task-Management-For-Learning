const AdminDashboardHeader = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboardHeader;
