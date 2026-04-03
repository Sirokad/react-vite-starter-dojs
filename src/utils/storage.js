const DATA_KEY = "legal_mgmt_system_data";
const USER_KEY = "legal_mgmt_current_user";

export function loadData() {
  const raw = localStorage.getItem(DATA_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function loadCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}