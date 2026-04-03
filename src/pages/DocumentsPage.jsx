import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { formatDateTime } from "../utils/helpers";

export default function DocumentsPage() {
  const { documents } = useAppData();

  const columns = [
    { key: "documentNo", label: "Document No" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "matterNo", label: "Matter" },
    { key: "version", label: "Version" },
    { key: "confidentiality", label: "Confidentiality" },
    { key: "uploadedBy", label: "Uploaded By" },
    { key: "uploadedAt", label: "Uploaded At", render: (value) => formatDateTime(value) },
    { key: "status", label: "Status", render: (value) => <StatusBadge value={value} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Store and track legal files, supporting documents, and policy records."
        buttonText="New Document"
        buttonLink="/documents/new"
      />

      <DataTable columns={columns} rows={documents} emptyTitle="No documents available" />
    </div>
  );
}