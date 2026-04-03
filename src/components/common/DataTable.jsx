import EmptyState from "./EmptyState";

export default function DataTable({ columns, rows, emptyTitle = "No records found" }) {
  if (!rows.length) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="card table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id || row.code}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}