export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid-4">
        <StatCard title="Open Matters" value="18" subtitle="Active legal cases and files" />
        <StatCard title="Contracts" value="42" subtitle="Tracked contracts" />
        <StatCard title="Pending Review" value="7" subtitle="Awaiting legal approval" />
        <StatCard title="Expiring Soon" value="5" subtitle="Within 30 days" />
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <ul>
          <li>Contract NDA-2026-001 uploaded</li>
          <li>Matter MAT-2026-010 created</li>
          <li>Supplier agreement sent for review</li>
        </ul>
      </div>
    </div>
  );
}