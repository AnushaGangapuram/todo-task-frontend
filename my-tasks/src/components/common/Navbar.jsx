// src/components/common/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}
        >
          Task Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user?.role === 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/tasks">Manage Tasks</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link>
                <Nav.Link href="#" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
