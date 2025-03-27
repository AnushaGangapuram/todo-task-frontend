import axiosInstance from '../utils/axiosInterceptor';

export const authService = {
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  registerAdmin: async (userData, adminId) => {
    const response = await axiosInstance.post(`/auth/register/admin/${adminId}`, userData);
    return response.data;
  }
};