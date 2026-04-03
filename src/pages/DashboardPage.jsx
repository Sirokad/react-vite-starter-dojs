import StatCard from "../components/common/StatCard";
import { useAppData } from "../context/AppDataContext";
import { formatDateTime } from "../utils/helpers";

export default function DashboardPage() {
  const { dashboard } = useAppData();

  return (
    <div>
      <div className="stats-grid">
        <StatCard
          title="Open Matters"
          value={dashboard.openMatters}
          subtitle="All open and in-review matters"
        />
        <StatCard
          title="Pending Documents"
          value={dashboard.pendingDocuments}
          subtitle="Awaiting review or approval"
        />
        <StatCard
          title="Active Contracts"
          value={dashboard.activeContracts}
          subtitle="Current live contractual commitments"
        />
        <StatCard
          title="Expiring in 30 Days"
          value={dashboard.expiringSoon}
          subtitle="Contracts requiring attention soon"
        />
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {dashboard.recentAuditLogs.map((log) => (
            <div key={log.id} className="activity-item">
              <div className="activity-main">
                <strong>{log.module}</strong> · {log.action} · {log.entityCode}
              </div>
              <div className="activity-meta">
                {log.performedBy} · {formatDateTime(log.timestamp)}
              </div>
              <div className="activity-details">{log.details}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}