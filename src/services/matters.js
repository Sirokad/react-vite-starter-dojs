import { apiGet, apiPost } from "./api";

export function getMatters() {
  return apiGet("/server/matters_api");
}

export function createMatter(payload) {
  return apiPost("/server/matters_api", payload);
}