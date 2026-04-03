import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAppData } from "../context/AppDataContext";

export default function ContractFormPage() {
  const { createContract, matters } = useAppData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    counterparty: "",
    matterNo: matters[0]?.matterNo || "",
    effectiveDate: "",
    expiryDate: "",
    value: "",
    currency: "KWD",
    status: "Active",
    renewalNoticeDays: "60",
    owner: "",
  });

  function updateField(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createContract(form);
    navigate("/contracts");
  }

  return (
    <div>
      <PageHeader title="New Contract" subtitle="Create a contract register record." />

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="title" placeholder="Contract title" value={form.title} onChange={updateField} />
        <input
          name="counterparty"
          placeholder="Counterparty"
          value={form.counterparty}
          onChange={updateField}
        />

        <select name="matterNo" value={form.matterNo} onChange={updateField}>
          <option value="">Select matter</option>
          {matters.map((m) => (
            <option key={m.id} value={m.matterNo}>
              {m.matterNo} - {m.title}
            </option>
          ))}
        </select>

        <input type="date" name="effectiveDate" value={form.effectiveDate} onChange={updateField} />
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={updateField} />
        <input name="value" placeholder="Contract value" value={form.value} onChange={updateField} />

        <select name="currency" value={form.currency} onChange={updateField}>
          <option>KWD</option>
          <option>USD</option>
          <option>SAR</option>
          <option>AED</option>
        </select>

        <select name="status" value={form.status} onChange={updateField}>
          <option>Active</option>
          <option>Pending Approval</option>
          <option>Expired</option>
          <option>Archived</option>
        </select>

        <input
          name="renewalNoticeDays"
          placeholder="Renewal notice days"
          value={form.renewalNoticeDays}
          onChange={updateField}
        />

        <input name="owner" placeholder="Owner" value={form.owner} onChange={updateField} />

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Contract
          </button>
        </div>
      </form>
    </div>
  );
}