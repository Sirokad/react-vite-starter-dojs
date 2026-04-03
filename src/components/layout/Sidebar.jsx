import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Matters", path: "/matters" },
  { label: "Documents", path: "/documents" },
  { label: "Contracts", path: "/contracts" },
  { label: "Users", path: "/users" },
  { label: "Audit Log", path: "/audit-log" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-title">Legal MS</div>
        <div className="brand-subtitle">Company Legal Portal</div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}