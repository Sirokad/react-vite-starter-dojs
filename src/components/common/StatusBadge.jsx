export default function StatusBadge({ value }) {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return <span className={`badge badge-${slug}`}>{value}</span>;
}