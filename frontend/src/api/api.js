// /frontend/src/api/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Matches backend API
});

// Interceptor to attach the token to every outgoing request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;