const MATTERS_API_URL = import.meta.env.VITE_MATTERS_API_URL;

export async function getMatters() {
  const response = await fetch(MATTERS_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`GET failed: ${response.status}`);
  }

  const result = await response.json();
  return result.data || [];
}

export async function createMatter(payload) {
  const response = await fetch(MATTERS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`POST failed: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}