import axiosInstance from '../utils/axiosInterceptor';

export const taskService = {
  // ✅ Fetch all tasks (Admin Only)
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/admin/tasks');
      return response.data;
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      throw error;
    }
  },

  // ✅ Fetch tasks assigned to a specific user
  getUserTasks: async (userId) => {
    try {
      const response = await axiosInstance.get(`/admin/tasks/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  },

  // ✅ Create a new task (Admin Only) 🟢 [FIXED: Function Added]
  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/admin/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // ✅ Assign a new task (Admin Only)
  assignTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/admin/tasks/assign', taskData);
      return response.data;
    } catch (error) {
      console.error("Error assigning task:", error);
      throw error;
    }
  },

  // ✅ Update task status (User Only)
  updateTaskStatus: async (taskId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/user/tasks/${taskId}/status`, { status: newStatus });
      return response.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  },

  // ✅ Delete a task (Admin Only)
  deleteTask: async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/admin/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
