import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAppData } from "../context/AppDataContext";

export default function UserFormPage() {
  const { createUser } = useAppData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Reviewer",
    department: "Legal",
    status: "Active",
    password: "",
  });

  function updateField(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUser(form);
    navigate("/users");
  }

  return (
    <div>
      <PageHeader title="New User" subtitle="Add a legal system user." />

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" value={form.name} onChange={updateField} />
        <input name="email" placeholder="Email" value={form.email} onChange={updateField} />

        <select name="role" value={form.role} onChange={updateField}>
          <option>Admin</option>
          <option>Reviewer</option>
          <option>Legal Officer</option>
          <option>Viewer</option>
        </select>

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={updateField}
        />

        <select name="status" value={form.status} onChange={updateField}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Temporary password"
          value={form.password}
          onChange={updateField}
        />

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}