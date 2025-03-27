// src/services/taskService.js
import axiosInstance from '../utils/axiosInterceptor';

export const taskService = {
  getUserTasks: async (userId) => {
    const response = await axiosInstance.get(`/user/tasks/${userId}`);
    return response.data;
  },

  updateTaskStatus: async (taskId, status) => {
    const response = await axiosInstance.put(`/user/tasks/${taskId}/status`, { status });
    return response.data;
  }
};