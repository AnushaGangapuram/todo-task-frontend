// src/components/common/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}
          className="navbar-brand"
        >
          <span className="logo-text">Task Management</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Admin specific links */}
            {user?.role === 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/admin/users" className="nav-link">
                  Manage Users
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/tasks" className="nav-link">
                  Manage Tasks
                </Nav.Link>
              </>
            )}
            {/* User-specific links */}
            {user && (
              <>
                <Nav.Link as={Link} to="/user/profile" className="nav-link">
                  Profile
                </Nav.Link>
                <Nav.Link href="#" onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Custom Styles for Navbar */}
      <style jsx>{`
        .navbar {
          background-color: #343a40; /* Dark background for navbar */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow effect */
        }

        .navbar-brand {
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .logo-text {
          color: #fff;
        }

        .nav-link {
          font-size: 1.1rem;
          font-weight: 500;
          padding: 10px 15px;
          transition: color 0.3s ease, background-color 0.3s ease;
        }

        .nav-link:hover {
          color: #007bff;
          background-color: #f8f9fa;
        }

        .logout-btn {
          color: #dc3545; /* Red color for logout button */
          font-weight: 600;
        }

        .logout-btn:hover {
          color: #fff;
          background-color: #dc3545;
        }

        .navbar-toggler {
          border-color: #007bff;
        }

        .navbar-toggler-icon {
          background-color: #007bff;
        }

        @media (max-width: 992px) {
          .navbar-brand {
            font-size: 1.5rem;
          }

          .nav-link {
            font-size: 1rem;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default AppNavbar;
