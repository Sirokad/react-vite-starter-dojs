export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
      <p>{subtitle}</p>
    </div>
  );
}