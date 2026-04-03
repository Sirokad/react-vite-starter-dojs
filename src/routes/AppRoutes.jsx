import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Matters from "../pages/Matters";
import Documents from "../pages/Documents";
import Contracts from "../pages/Contracts";
import Users from "../pages/Users";
import AuditLog from "../pages/AuditLog";
import MatterForm from "../pages/MatterForm";
import DocumentForm from "../pages/DocumentForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/matters" element={<Matters />} />
      <Route path="/matters/new" element={<MatterForm />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/documents/new" element={<DocumentForm />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/users" element={<Users />} />
      <Route path="/audit-log" element={<AuditLog />} />
    </Routes>
  );
}