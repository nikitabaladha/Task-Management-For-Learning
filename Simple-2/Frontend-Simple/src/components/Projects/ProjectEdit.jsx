const ProjectEdit = ({
  formData,
  onChange,
  onSubmit,
  loading,
  onCancel,
  onBack,
}) => {
  return (
    <>
      <button onClick={onBack}>Back</button>
      <form onSubmit={onSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Enter project description"
            rows="5"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Update Project"}
        </button>

        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default ProjectEdit;
