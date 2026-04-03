import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { formatDate } from "../utils/helpers";

export default function MattersPage() {
  const { matters } = useAppData();

  const columns = [
    { key: "matterNo", label: "Matter No" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "department", label: "Department" },
    { key: "owner", label: "Owner" },
    { key: "priority", label: "Priority" },
    { key: "openedDate", label: "Opened", render: (value) => formatDate(value) },
    { key: "status", label: "Status", render: (value) => <StatusBadge value={value} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Matters"
        subtitle="Track disputes, legal reviews, litigation, and advisory files."
        buttonText="New Matter"
        buttonLink="/matters/new"
      />

      <DataTable columns={columns} rows={matters} emptyTitle="No matters available" />
    </div>
  );
}