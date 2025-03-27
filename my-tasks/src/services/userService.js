
import axiosInstance from '../utils/axiosInterceptor';

export const userService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  },

  getAllTasks: async () => {
    const response = await axiosInstance.get('/admin/tasks');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`);
    return response.data;
  },

  getUserProfile: async (userId) => {
    const response = await axiosInstance.get(`/user/profile/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId, userData) => {
    const response = await axiosInstance.put(`/user/profile/${userId}`, userData);
    return response.data;
  }
};