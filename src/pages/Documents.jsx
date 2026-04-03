import { Link } from "react-router-dom";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";

const rows = [
  {
    documentNo: "DOC-2026-001",
    title: "Master Service Agreement",
    category: "Contract",
    relatedMatter: "MAT-2026-001",
    status: "Pending Review"
  },
  {
    documentNo: "DOC-2026-002",
    title: "Employment Policy Review",
    category: "Policy",
    relatedMatter: "MAT-2026-002",
    status: "Approved"
  }
];

export default function Documents() {
  const columns = [
    { key: "documentNo", label: "Document No" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "relatedMatter", label: "Matter" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge value={value} />
    }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Documents</h1>
        <Link to="/documents/new" className="btn-primary">New Document</Link>
      </div>

      <Table columns={columns} rows={rows} />
    </div>
  );
}