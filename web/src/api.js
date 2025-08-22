const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  if (!res.ok) {
    const msg = data?.message || res.statusText || 'Request failed';
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  auth: {
    register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
    login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
    logout: () => request('/auth/logout', { method: 'POST' }),
  },
  doctors: {
    list: () => request('/doctors'),
    create: (data) => request('/doctors', { method: 'POST', body: data }),
    update: (id, data) => request(`/doctors/${id}`, { method: 'PUT', body: data }),
    remove: (id) => request(`/doctors/${id}`, { method: 'DELETE' }),
  },
  patients: {
    list: () => request('/patients'),
    create: (data) => request('/patients', { method: 'POST', body: data }),
    update: (id, data) => request(`/patients/${id}`, { method: 'PUT', body: data }),
    remove: (id) => request(`/patients/${id}`, { method: 'DELETE' }),
  },
  appointments: {
    list: () => request('/appointments'),
    create: (data) => request('/appointments', { method: 'POST', body: data }),
    update: (id, data) => request(`/appointments/${id}`, { method: 'PUT', body: data }),
    remove: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),
  }
};
