import axiosInstance from '../utils/axiosInterceptor';

export const userService = {
  // ✅ Fetch all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // ✅ Fetch all tasks (Admin only)
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/admin/tasks');
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // ✅ Delete a user (Admin only)
  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // ✅ Fetch user profile data
  getUserProfile: async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // ✅ Update user profile
  updateUserProfile: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/user/profile/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
};