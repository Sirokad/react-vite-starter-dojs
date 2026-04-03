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