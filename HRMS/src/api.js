import { API_BASE_URL } from './config';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    const errorMessage = error.detail || error.message || JSON.stringify(error) || 'Request failed';
    throw new Error(errorMessage);
  }
  return response.json();
};

export const api = {
  getEmployees: () =>
    fetch(`${API_BASE_URL}/employees/`).then(handleResponse),
  
  createEmployee: (data) =>
    fetch(`${API_BASE_URL}/employees/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  
  updateEmployee: (id, data) =>
    fetch(`${API_BASE_URL}/employees/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  
  deleteEmployee: (id) =>
    fetch(`${API_BASE_URL}/employees/${id}/`, { method: 'DELETE' }),
  
  getAttendance: () =>
    fetch(`${API_BASE_URL}/attendance/`).then(handleResponse),
  
  createAttendance: (data) =>
    fetch(`${API_BASE_URL}/attendance/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  
  updateAttendance: (id, data) =>
    fetch(`${API_BASE_URL}/attendance/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  
  getEmployeeAttendance: (id) =>
    fetch(`${API_BASE_URL}/employees/${id}/attendance/`).then(handleResponse),
};
