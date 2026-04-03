import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedData } from "../utils/seed";
import {
  loadData,
  saveData,
  loadCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
} from "../utils/storage";
import { generateCode, nowIso, sortByNewest } from "../utils/helpers";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [matters, setMatters] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser());

  useEffect(() => {
    const existing = loadData();

    if (!existing) {
      saveData(seedData);
      setMatters(seedData.matters);
      setDocuments(seedData.documents);
      setContracts(seedData.contracts);
      setUsers(seedData.users);
      setAuditLogs(seedData.auditLogs);
    } else {
      setMatters(existing.matters || []);
      setDocuments(existing.documents || []);
      setContracts(existing.contracts || []);
      setUsers(existing.users || []);
      setAuditLogs(existing.auditLogs || []);
    }
  }, []);

  useEffect(() => {
    if (
      matters.length ||
      documents.length ||
      contracts.length ||
      users.length ||
      auditLogs.length
    ) {
      saveData({ matters, documents, contracts, users, auditLogs });
    }
  }, [matters, documents, contracts, users, auditLogs]);

  function addAudit(module, action, entityCode, details = "") {
    const log = {
      id: crypto.randomUUID(),
      timestamp: nowIso(),
      module,
      action,
      entityCode,
      performedBy: currentUser?.name || "System",
      details,
    };
    setAuditLogs((prev) => sortByNewest([log, ...prev]));
  }

  function login(email, password) {
    const matched = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!matched) {
      return { ok: false, message: "Invalid email or password." };
    }

    const safeUser = {
      id: matched.id,
      name: matched.name,
      email: matched.email,
      role: matched.role,
      department: matched.department,
    };

    setCurrentUser(safeUser);
    saveCurrentUser(safeUser);
    addAudit("Authentication", "Login", safeUser.email, "User signed in");
    return { ok: true };
  }

  function logout() {
    if (currentUser) {
      addAudit("Authentication", "Logout", currentUser.email, "User signed out");
    }
    setCurrentUser(null);
    clearCurrentUser();
  }

  function createMatter(payload) {
    const item = {
      id: crypto.randomUUID(),
      matterNo: generateCode("MAT", matters.length + 1),
      title: payload.title,
      type: payload.type,
      owner: payload.owner,
      department: payload.department,
      status: payload.status,
      openedDate: payload.openedDate,
      priority: payload.priority,
      description: payload.description,
      createdAt: nowIso(),
    };

    setMatters((prev) => sortByNewest([item, ...prev], "createdAt"));
    addAudit("Matters", "Create", item.matterNo, `Matter created: ${item.title}`);
    return item;
  }

  function createDocument(payload) {
    const item = {
      id: crypto.randomUUID(),
      documentNo: generateCode("DOC", documents.length + 1),
      title: payload.title,
      category: payload.category,
      matterNo: payload.matterNo,
      version: payload.version || "1.0",
      status: payload.status,
      confidentiality: payload.confidentiality,
      fileName: payload.fileName || "",
      fileSize: payload.fileSize || 0,
      uploadedBy: currentUser?.name || "Unknown",
      uploadedAt: nowIso(),
      notes: payload.notes,
    };

    setDocuments((prev) => sortByNewest([item, ...prev], "uploadedAt"));
    addAudit("Documents", "Upload", item.documentNo, `Document uploaded: ${item.title}`);
    return item;
  }

  function createContract(payload) {
    const item = {
      id: crypto.randomUUID(),
      contractNo: generateCode("CON", contracts.length + 1),
      title: payload.title,
      counterparty: payload.counterparty,
      matterNo: payload.matterNo,
      effectiveDate: payload.effectiveDate,
      expiryDate: payload.expiryDate,
      value: payload.value,
      currency: payload.currency,
      status: payload.status,
      renewalNoticeDays: payload.renewalNoticeDays,
      owner: payload.owner,
      createdAt: nowIso(),
    };

    setContracts((prev) => sortByNewest([item, ...prev], "createdAt"));
    addAudit("Contracts", "Create", item.contractNo, `Contract created: ${item.title}`);
    return item;
  }

  function createUser(payload) {
    const item = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      role: payload.role,
      department: payload.department,
      status: payload.status,
      password: payload.password,
      createdAt: nowIso(),
    };

    setUsers((prev) => sortByNewest([item, ...prev], "createdAt"));
    addAudit("Users", "Create", item.email, `User created: ${item.name}`);
    return item;
  }

  const dashboard = useMemo(() => {
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    const expiringSoon = contracts.filter((c) => {
      if (!c.expiryDate) return false;
      const expiry = new Date(c.expiryDate);
      return expiry >= today && expiry <= in30Days;
    }).length;

    return {
      openMatters: matters.filter((m) => m.status !== "Closed").length,
      pendingDocuments: documents.filter((d) => d.status === "Pending Review").length,
      activeContracts: contracts.filter((c) => c.status === "Active").length,
      expiringSoon,
      recentAuditLogs: auditLogs.slice(0, 8),
    };
  }, [matters, documents, contracts, auditLogs]);

  return (
    <AppDataContext.Provider
      value={{
        matters,
        documents,
        contracts,
        users,
        auditLogs,
        currentUser,
        dashboard,
        login,
        logout,
        createMatter,
        createDocument,
        createContract,
        createUser,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used inside AppDataProvider");
  return ctx;
}