const BASE = import.meta.env.VITE_API_BASE_URL; 
// exemplu în .env: VITE_API_BASE_URL=https://xxxxx.trycloudflare.com/api

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    // încearcă să citească un mesaj util
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    credentials: "include",
  });
  return parseResponse(res);
}

export async function apiPostJson(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function apiPostForm(path, formData) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    credentials: "include",
    body: formData, // FormData => nu setăm Content-Type manual
  });
  return parseResponse(res);
}

// opțional (dacă vei avea update/delete)
export async function apiPutJson(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    credentials: "include",
  });
  return parseResponse(res);
}
