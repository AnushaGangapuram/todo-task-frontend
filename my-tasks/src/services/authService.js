import axiosInstance from '../utils/axiosInterceptor';

export const authService = {
  // ✅ Login User
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });

    // Store full user object in localStorage (accessToken, refreshToken, user details)
    if (response.data) {
      const user = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        userId: response.data.userId,
        username: response.data.username,
        role: response.data.role,
      };

      // Store the full user object in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      return response.data; // Return the data for further usage
    }

    return null;
  },
  // ✅ Register User
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },


    // ✅ Register a new admin
    registerAdmin: async (adminData) => {
      try {
        const response = await axiosInstance.post(`/auth/register/admin`, adminData); // ✅ Removed undefined value
        return response.data;
      } catch (error) {
        console.error("❌ Failed to register admin:", error);
        throw error;
      }
    }
  };
