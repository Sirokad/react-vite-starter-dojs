export function generateCode(prefix, seq) {
  return `${prefix}-${new Date().getFullYear()}-${String(seq).padStart(4, "0")}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString();
}

export function formatDateTime(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export function sortByNewest(items, field = "timestamp") {
  return [...items].sort((a, b) => new Date(b[field]) - new Date(a[field]));
}