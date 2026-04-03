import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAppData } from "../context/AppDataContext";

export default function DocumentFormPage() {
  const { createDocument, matters } = useAppData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Contract",
    matterNo: matters[0]?.matterNo || "",
    version: "1.0",
    status: "Draft",
    confidentiality: "Confidential",
    fileName: "",
    fileSize: 0,
    notes: "",
  });

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: file.size,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createDocument(form);
    navigate("/documents");
  }

  return (
    <div>
      <PageHeader title="New Document" subtitle="Register a legal document." />

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="title" placeholder="Document title" value={form.title} onChange={updateField} />

        <select name="category" value={form.category} onChange={updateField}>
          <option>Contract</option>
          <option>Policy</option>
          <option>Case File</option>
          <option>Memo</option>
          <option>Notice</option>
        </select>

        <select name="matterNo" value={form.matterNo} onChange={updateField}>
          <option value="">Select matter</option>
          {matters.map((m) => (
            <option key={m.id} value={m.matterNo}>
              {m.matterNo} - {m.title}
            </option>
          ))}
        </select>

        <input name="version" placeholder="Version" value={form.version} onChange={updateField} />

        <select name="status" value={form.status} onChange={updateField}>
          <option>Draft</option>
          <option>Pending Review</option>
          <option>Approved</option>
          <option>Archived</option>
        </select>

        <select name="confidentiality" value={form.confidentiality} onChange={updateField}>
          <option>Internal</option>
          <option>Restricted</option>
          <option>Confidential</option>
          <option>Highly Confidential</option>
        </select>

        <input type="file" onChange={onFileChange} />

        <textarea
          name="notes"
          placeholder="Notes"
          rows="5"
          value={form.notes}
          onChange={updateField}
        />

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Document
          </button>
        </div>
      </form>
    </div>
  );
}