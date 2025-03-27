import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

// Authentication Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// User Components
import UserDashboard from "./components/user/UserDashboard";
import ProfileSettings from "./components/user/ProfileSettings";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import TaskManagement from "./components/admin/TaskManagement";

// Common UI Components
import AppNavbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Wrapper Layout Component
const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <>
      {user && <AppNavbar />}
      <div className="d-flex">
        {user && <Sidebar />}
        <div className="flex-grow-1 p-3">{children}</div>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute allowedRoles={["USER"]}>
                <Layout>
                  <UserDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute allowedRoles={["USER"]}>
                <Layout>
                  <ProfileSettings />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <Layout>
                  <UserManagement />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <Layout>
                  <TaskManagement />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Redirect based on role */}
          <Route path="/" element={<RedirectBasedOnRole />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Redirect logic based on user role
const RedirectBasedOnRole = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"} replace />;
};

export default App;
