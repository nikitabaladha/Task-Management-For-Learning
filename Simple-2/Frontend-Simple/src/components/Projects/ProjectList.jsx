const ProjectList = ({
  projects,
  loading,
  error,
  onCreateProject,
  onViewProject,
  onEditProject,
  onDeleteProject,
}) => {
  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
