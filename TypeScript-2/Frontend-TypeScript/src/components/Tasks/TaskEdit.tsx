import type { TaskFormData, Project, User } from "../../types";

interface TaskEditProps {
  formData: TaskFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onCancel: () => void;
  projects: Project[];
  users: User[];
  onBack: () => void;
}

const TaskEdit = ({
  formData,
  onChange,
  onSubmit,
  loading,
  onCancel,
  projects,
  users,
  onBack,
}: TaskEditProps) => {
  return (
    <>
      <button onClick={onBack}>Back</button>
      <form onSubmit={onSubmit}>
        <div>
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Enter task description"
            rows={5}
          />
        </div>

        <div>
          <label>Project</label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={onChange}
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Assign To</label>
          <select
            name="assignedToId"
            value={formData.assignedToId}
            onChange={onChange}
          >
            <option value="">Select User</option>
            {users
              .filter((user) => user.role === "User")
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={onChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={onChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Update Task"}
        </button>

        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default TaskEdit;
