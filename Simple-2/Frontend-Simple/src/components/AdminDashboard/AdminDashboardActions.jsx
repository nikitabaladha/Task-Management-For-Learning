const AdminDashboardActions = ({ onManageProjects, onManageTasks }) => {
  return (
    <div>
      <h2>Quick Actions</h2>
      <button onClick={onManageProjects}>Manage Projects</button>
      <button onClick={onManageTasks}>Manage Tasks</button>
    </div>
  );
};

export default AdminDashboardActions;
