import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { createMatter } from "../services/matters";

export default function MatterFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "Contract Review",
    owner: "",
    department: "Legal",
    status: "Open",
    openedDate: "",
    priority_: "Medium",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createMatter(form);

      navigate("/matters");
    } catch (err) {
      console.error(err);
      setError("Failed to save matter to Catalyst.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title="New Matter" subtitle="Create a legal matter record." />

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Matter title"
          value={form.title}
          onChange={updateField}
          required
        />

        <select name="type" value={form.type} onChange={updateField}>
          <option>Contract Review</option>
          <option>Dispute</option>
          <option>Litigation</option>
          <option>Advisory</option>
          <option>Compliance</option>
        </select>

        <input
          name="owner"
          placeholder="Owner"
          value={form.owner}
          onChange={updateField}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={updateField}
          required
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

        <input
          type="date"
          name="openedDate"
          value={form.openedDate}
          onChange={updateField}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={form.description}
          onChange={updateField}
        />

        {error && <div className="error-box">{error}</div>}

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Matter"}
          </button>
        </div>
      </form>
    </div>
  );
}