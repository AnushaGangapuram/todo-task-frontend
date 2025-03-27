// src/utils/axiosInterceptor.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api', // ✅ Match your backend URL
});

// ✅ Request interceptor to add token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      
      // ✅ Show a message before logging out
      alert("Session expired. Please log in again.");

      // ✅ Handle logout properly
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
