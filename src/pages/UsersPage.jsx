import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { useAppData } from "../context/AppDataContext";

export default function UsersPage() {
  const { users } = useAppData();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status", render: (value) => <StatusBadge value={value} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage legal admins, reviewers, counsel, and legal coordinators."
        buttonText="New User"
        buttonLink="/users/new"
      />

      <DataTable columns={columns} rows={users} emptyTitle="No users available" />
    </div>
  );
}