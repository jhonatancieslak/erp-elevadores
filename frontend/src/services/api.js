import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Request: adiciona token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: se 401/403, limpa sessão e volta ao login
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('sector');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default api;
