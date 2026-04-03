const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return response.json();
}