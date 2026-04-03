import { NavLink } from "react-router-dom";
import menu from "../../data/menu";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Legal Management</div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}