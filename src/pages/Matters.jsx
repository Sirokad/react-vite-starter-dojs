import { Link } from "react-router-dom";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";

const rows = [
  {
    matterNo: "MAT-2026-001",
    title: "Supplier dispute - ABC Co",
    type: "Dispute",
    owner: "Legal Team",
    status: "Open"
  },
  {
    matterNo: "MAT-2026-002",
    title: "Employment review",
    type: "Advisory",
    owner: "HR / Legal",
    status: "In Review"
  }
];

export default function Matters() {
  const columns = [
    { key: "matterNo", label: "Matter No" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "owner", label: "Owner" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge value={value} />
    }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Matters</h1>
        <Link to="/matters/new" className="btn-primary">New Matter</Link>
      </div>

      <Table columns={columns} rows={rows} />
    </div>
  );
}