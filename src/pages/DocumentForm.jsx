import { useState } from "react";

export default function DocumentForm() {
  const [form, setForm] = useState({
    documentNo: "",
    title: "",
    category: "Contract",
    relatedMatter: "",
    status: "Draft"
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Document submitted", form);
    alert("Document saved locally for now");
  }

  return (
    <div>
      <h1>New Document</h1>

      <form className="card form-grid" onSubmit={handleSubmit}>
        <input name="documentNo" placeholder="Document Number" onChange={handleChange} />
        <input name="title" placeholder="Document Title" onChange={handleChange} />

        <select name="category" onChange={handleChange} value={form.category}>
          <option>Contract</option>
          <option>Policy</option>
          <option>Case File</option>
          <option>Memo</option>
        </select>

        <input name="relatedMatter" placeholder="Related Matter" onChange={handleChange} />

        <select name="status" onChange={handleChange} value={form.status}>
          <option>Draft</option>
          <option>Pending Review</option>
          <option>Approved</option>
          <option>Archived</option>
        </select>

        <input type="file" name="file" onChange={handleChange} />

        <button type="submit" className="btn-primary">Save Document</button>
      </form>
    </div>
  );
}