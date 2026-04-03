import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { formatDate } from "../utils/helpers";

export default function ContractsPage() {
  const { contracts } = useAppData();

  const columns = [
    { key: "contractNo", label: "Contract No" },
    { key: "title", label: "Title" },
    { key: "counterparty", label: "Counterparty" },
    { key: "matterNo", label: "Matter" },
    { key: "effectiveDate", label: "Effective", render: (value) => formatDate(value) },
    { key: "expiryDate", label: "Expiry", render: (value) => formatDate(value) },
    { key: "value", label: "Value" },
    { key: "currency", label: "Currency" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status", render: (value) => <StatusBadge value={value} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Contracts"
        subtitle="Track contract lifecycle, value, expiry, and renewal timing."
        buttonText="New Contract"
        buttonLink="/contracts/new"
      />

      <DataTable columns={columns} rows={contracts} emptyTitle="No contracts available" />
    </div>
  );
}