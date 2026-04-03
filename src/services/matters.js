const MATTERS_API_URL = import.meta.env.VITE_MATTERS_API_URL;

export async function getMatters() {
  const response = await fetch(MATTERS_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  console.log("GET matters status:", response.status);
  console.log("GET matters response:", text);

  if (!response.ok) {
    throw new Error(`GET failed: ${response.status} - ${text}`);
  }

  const result = JSON.parse(text);
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

  const text = await response.text();
  console.log("POST matters status:", response.status);
  console.log("POST matters response:", text);

  if (!response.ok) {
    throw new Error(`POST failed: ${response.status} - ${text}`);
  }

  const result = JSON.parse(text);
  return result.data;
}