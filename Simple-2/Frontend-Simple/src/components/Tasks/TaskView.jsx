const TaskView = ({
  task,
  loading,
  error,
  onBack,
  onEdit,
  currentUserRole,
}) => {
  if (loading) {
    return <p>Loading task...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <>
      <div>
        <div>
          <h2>Task Details</h2>
          <button onClick={onBack}>Back</button>
          {currentUserRole === "Admin" && (
            <button onClick={onEdit}>Edit</button>
          )}
        </div>
        <div>
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description || "N/A"}
          </p>
          <p>
            <strong>Project:</strong> {task.projectName || "N/A"}
          </p>
          <p>
            <strong>Assigned To:</strong> {task.assignedToName || "N/A"} (
            {task.assignedToEmail || "N/A"})
          </p>
          <p>
            <strong>Assigned By:</strong> {task.assignedByName || "N/A"} (
            {task.assignedByEmail || "N/A"})
          </p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default TaskView;
