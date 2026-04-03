import { useAppData } from "../../context/AppDataContext";

export default function Topbar() {
  const { currentUser, logout } = useAppData();

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-title">Legal Management System</h1>
        <p className="topbar-subtitle">
          Matters, documents, contracts, legal users, and audit tracking
        </p>
      </div>

      <div className="topbar-right">
        <div className="user-chip">
          <div className="user-chip-name">{currentUser?.name}</div>
          <div className="user-chip-role">{currentUser?.role}</div>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}