import { NavLink } from "react-router-dom";

const Sidebar = ({ userRole }) => {
  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/projects", label: "Projects" },
    { path: "/admin/tasks", label: "Tasks" },
  ];

  const userMenuItems = [
    { path: "/user/dashboard", label: "Dashboard" },
    { path: "/user/tasks", label: "My Tasks" },
  ];

  const menuItems = userRole === "Admin" ? adminMenuItems : userMenuItems;

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
