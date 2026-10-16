import type { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  userRole: "Admin" | "User";
  onCreateTask?: () => void;
  onViewTask: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateStatus?: (taskId: string, newStatus: string) => void;
}

const TaskList = ({
  tasks,
  loading,
  userRole,
  onCreateTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}: TaskListProps) => {
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        {onCreateTask && <button onClick={onCreateTask}>Create Task</button>}
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.projectName || "N/A"}</td>
                <td>{task.assignedToName || "N/A"}</td>
                <td>{task.priority}</td>
                <td>
                  {userRole === "User" && onUpdateStatus ? (
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateStatus(task._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                <td>
                  <button onClick={() => onViewTask(task._id)}>View</button>
                  {userRole === "Admin" && onEditTask && (
                    <button onClick={() => onEditTask(task._id)}>Edit</button>
                  )}
                  {userRole === "Admin" && onDeleteTask && (
                    <button onClick={() => onDeleteTask(task._id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
