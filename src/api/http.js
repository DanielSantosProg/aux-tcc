
// Pequeno wrapper para adicionar JWT no fetch automaticamente
const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:3001';

export function getToken() {
  return localStorage.getItem('token') || null;
}
export function setToken(token) {
  if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
}

export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : API_BASE + path;
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token) headers.set('Authorization', 'Bearer ' + token);
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  const resp = await fetch(url, { ...options, headers });
  if (resp.status === 401) {
    // token inválido/expirado
    setToken(null);
    throw new Error('Não autorizado. Faça login novamente.');
  }
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || ('HTTP ' + resp.status));
  }
  const ct = resp.headers.get('content-type') || '';
  return ct.includes('application/json') ? resp.json() : resp.text();
}

// Auth helpers
export async function login(email, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setToken(data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  setToken(null);
  localStorage.removeItem('user');
}

export function currentUser() {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}
