const UserDashboardStatistics = ({ tasks }) => {
  return (
    <div>
      <h2>My Tasks Statistics</h2>
      <div>
        <div>
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>
        <div>
          <h3>Pending Tasks</h3>
          <p>{tasks.filter((task) => task.status === "Pending").length}</p>
        </div>
        <div>
          <h3>In Progress Tasks</h3>
          <p>{tasks.filter((task) => task.status === "In Progress").length}</p>
        </div>
        <div>
          <h3>Completed Tasks</h3>
          <p>{tasks.filter((task) => task.status === "Completed").length}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardStatistics;
