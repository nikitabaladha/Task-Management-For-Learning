import type { Task } from "../../types";

interface UserDashboardTaskListProps {
  tasks: Task[];
  onViewTask: (taskId: string) => void;
}

const UserDashboardTaskList = ({
  tasks,
  onViewTask,
}: UserDashboardTaskListProps) => {
  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned to you.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Project</th>
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
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => onViewTask(task._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboardTaskList;
