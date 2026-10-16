interface AdminDashboardActionsProps {
  onManageProjects: () => void;
  onManageTasks: () => void;
}

const AdminDashboardActions = ({
  onManageProjects,
  onManageTasks,
}: AdminDashboardActionsProps) => {
  return (
    <div>
      <h2>Quick Actions</h2>
      <button onClick={onManageProjects}>Manage Projects</button>
      <button onClick={onManageTasks}>Manage Tasks</button>
    </div>
  );
};

export default AdminDashboardActions;
