export default function StatusBadge({ value }) {
  const cls = `badge badge-${String(value).toLowerCase().replace(/\s+/g, "-")}`;
  return <span className={cls}>{value}</span>;
}