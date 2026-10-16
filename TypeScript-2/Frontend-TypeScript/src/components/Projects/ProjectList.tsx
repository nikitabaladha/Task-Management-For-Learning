import type { Project } from "../../types";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onCreateProject: () => void;
  onViewProject: (projectId: string) => void;
  onEditProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectList = ({
  projects,
  loading,
  onCreateProject,
  onViewProject,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) => {
  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <div>
        <h2>Projects</h2>

        <button onClick={onCreateProject}>Create Project</button>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.createdByName || "N/A"}</td>
                <td>
                  <button onClick={() => onViewProject(project._id)}>
                    View
                  </button>
                  <button onClick={() => onEditProject(project._id)}>
                    Edit
                  </button>
                  <button onClick={() => onDeleteProject(project._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectList;
