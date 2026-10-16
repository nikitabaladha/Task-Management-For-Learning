import type { Project } from "../../types";

interface ProjectViewProps {
  project: Project | null;
  loading: boolean;
  error: string;
  onBack: () => void;
  onEdit: () => void;
}

const ProjectView = ({
  project,
  loading,
  error,
  onBack,
  onEdit,
}: ProjectViewProps) => {
  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <>
      <div>
        <div>
          <h2>Project Details</h2>
          <button onClick={onBack}>Back</button>
          <button onClick={onEdit}>Edit</button>
        </div>
        <div>
          <p>
            <strong>Project Name:</strong> {project.name}
          </p>
          <p>
            <strong>Description:</strong> {project.description || "N/A"}
          </p>
          <p>
            <strong>Created By:</strong> {project.createdByName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {project.createdByEmail || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {project.createdByRole || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
