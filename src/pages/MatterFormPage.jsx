import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAppData } from "../context/AppDataContext";

export default function MatterFormPage() {
  const { createMatter } = useAppData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "Contract Review",
    owner: "",
    department: "Legal",
    status: "Open",
    openedDate: "",
    priority: "Medium",
    description: "",
  });

  function updateField(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createMatter(form);
    navigate("/matters");
  }

  return (
    <div>
      <PageHeader title="New Matter" subtitle="Create a legal matter record." />

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="title" placeholder="Matter title" value={form.title} onChange={updateField} />

        <select name="type" value={form.type} onChange={updateField}>
          <option>Contract Review</option>
          <option>Dispute</option>
          <option>Litigation</option>
          <option>Advisory</option>
          <option>Compliance</option>
        </select>

        <input name="owner" placeholder="Owner" value={form.owner} onChange={updateField} />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={updateField}
        />

        <select name="status" value={form.status} onChange={updateField}>
          <option>Open</option>
          <option>In Review</option>
          <option>Closed</option>
        </select>

        <select name="priority" value={form.priority} onChange={updateField}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <input type="date" name="openedDate" value={form.openedDate} onChange={updateField} />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={form.description}
          onChange={updateField}
        />

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Matter
          </button>
        </div>
      </form>
    </div>
  );
}