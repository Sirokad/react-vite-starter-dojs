import { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { getMatters } from "../services/matters";
import { formatDate } from "../utils/helpers";

export default function MattersPage() {
  const [matters, setMatters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMatters() {
    try {
      setLoading(true);
      setError("");
      const data = await getMatters();
      setMatters(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load matters from Catalyst.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatters();
  }, []);

  const columns = [
    { key: "matter_no", label: "Matter No" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "department", label: "Department" },
    { key: "owner", label: "Owner" },
    { key: "priority_", label: "Priority" },
    {
      key: "opened_date",
      label: "Opened",
      render: (value) => formatDate(value),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge value={value} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Matters"
        subtitle="Track disputes, legal reviews, litigation, and advisory files."
        buttonText="New Matter"
        buttonLink="/matters/new"
      />

      {loading && <div className="card">Loading matters...</div>}

      {error && <div className="card">{error}</div>}

      {!loading && !error && (
        <DataTable
          columns={columns}
          rows={matters}
          emptyTitle="No matters available"
        />
      )}
    </div>
  );
}