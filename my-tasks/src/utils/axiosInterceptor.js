import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api', // ✅ Ensure correct backend URL
  headers: { 'Content-Type': 'application/json' }, // ✅ Default headers
});

// ✅ Attach Authorization token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No access token found in localStorage.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle authentication & authorization errors
axiosInstance.interceptors.response.use(
  (response) => response, // Return response if no error
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("🔒 Session expired. Please log in again.");
        localStorage.clear();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login"; // Redirect only if not already on login page
        }
      } else if (status === 403) {
        alert("🚫 You are not authorized to perform this action.");
      } else {
        alert(`❌ Error: ${error.response.statusText} (${status})`);
      }
    } else {
      console.error("🛑 Network error or server unreachable:", error);
      alert("⚠️ Unable to connect to the server. Please try again later.");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
