import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import { useAppData } from "../context/AppDataContext";
import { formatDateTime } from "../utils/helpers";

export default function AuditLogPage() {
  const { auditLogs } = useAppData();

  const columns = [
    { key: "timestamp", label: "Timestamp", render: (value) => formatDateTime(value) },
    { key: "module", label: "Module" },
    { key: "action", label: "Action" },
    { key: "entityCode", label: "Entity" },
    { key: "performedBy", label: "Performed By" },
    { key: "details", label: "Details" },
  ];

  return (
    <div>
      <PageHeader
        title="Audit Log"
        subtitle="Full trace of user actions and system events."
      />

      <DataTable columns={columns} rows={auditLogs} emptyTitle="No audit activity yet" />
    </div>
  );
}