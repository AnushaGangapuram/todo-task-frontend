import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Optionally, you can decode the token to verify it or extract more info if necessary
      try {
        const decoded = jwtDecode(parsedUser.accessToken);
        console.log("Decoded JWT:", decoded); // Debugging role extraction
        
        setUser({
          id: parsedUser.userId,
          username: parsedUser.username,
          role: parsedUser.role || 'USER', // Set 'USER' as a fallback role if it's missing
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
        setIsAuthenticated(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
