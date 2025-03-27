import axiosInstance from '../utils/axiosInterceptor';

export const authService = {
  // ✅ Login User
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
  },

  // ✅ Register User
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  // ✅ Register Admin (Admin only)
  registerAdmin: async (userData, adminId) => {
    const response = await axiosInstance.post(`/auth/register/admin/${adminId}`, userData);
    return response.data;
  }
};
