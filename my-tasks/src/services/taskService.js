import axiosInstance from '../utils/axiosInterceptor';

export const taskService = {
  // ✅ Fetch tasks assigned to a specific user
  getUserTasks: async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/tasks/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  },

  // ✅ Update task status (Pending → Completed)
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await axiosInstance.put(`/user/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  },

  // ✅ Delete a task (for admin or assigned user)
  deleteTask: async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/user/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
