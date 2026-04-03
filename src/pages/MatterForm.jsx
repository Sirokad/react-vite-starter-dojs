import { useState } from "react";

export default function MatterForm() {
  const [form, setForm] = useState({
    matterNo: "",
    title: "",
    type: "Contract",
    owner: "",
    status: "Open"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Matter submitted", form);
    alert("Matter saved locally for now");
  }

  return (
    <div>
      <h1>New Matter</h1>

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="matterNo" placeholder="Matter Number" onChange={handleChange} />
        <input name="title" placeholder="Matter Title" onChange={handleChange} />

        <select name="type" onChange={handleChange} value={form.type}>
          <option>Contract</option>
          <option>Dispute</option>
          <option>Litigation</option>
          <option>Advisory</option>
        </select>

        <input name="owner" placeholder="Owner" onChange={handleChange} />

        <select name="status" onChange={handleChange} value={form.status}>
          <option>Open</option>
          <option>In Review</option>
          <option>Closed</option>
        </select>

        <button type="submit" className="btn-primary">Save Matter</button>
      </form>
    </div>
  );
}