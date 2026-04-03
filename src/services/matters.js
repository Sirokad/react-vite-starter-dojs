import { apiGet, apiPost } from "./api";

export async function getMatters() {
  const result = await apiGet("/server/matters_api");
  return result.data || [];
}

export async function createMatter(payload) {
  const result = await apiPost("/server/matters_api", payload);
  return result.data;
}