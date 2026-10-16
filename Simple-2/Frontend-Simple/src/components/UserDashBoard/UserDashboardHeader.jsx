const UserDashboardHeader = ({ user, onLogout }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserDashboardHeader;
