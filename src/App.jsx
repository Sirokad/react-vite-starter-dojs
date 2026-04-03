import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MattersPage from "./pages/MattersPage";
import MatterFormPage from "./pages/MatterFormPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentFormPage from "./pages/DocumentFormPage";
import ContractsPage from "./pages/ContractsPage";
import ContractFormPage from "./pages/ContractFormPage";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import AuditLogPage from "./pages/AuditLogPage";
import { useAppData } from "./context/AppDataContext";

function ProtectedRoutes() {
  const { currentUser } = useAppData();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/matters" element={<MattersPage />} />
        <Route path="/matters/new" element={<MatterFormPage />} />

        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/new" element={<DocumentFormPage />} />

        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contracts/new" element={<ContractFormPage />} />

        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<UserFormPage />} />

        <Route path="/audit-log" element={<AuditLogPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  const { currentUser } = useAppData();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}