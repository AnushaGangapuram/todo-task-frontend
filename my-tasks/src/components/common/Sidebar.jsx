// src/components/common/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button variant="primary" className="m-3" onClick={toggleSidebar}>
        ☰ Menu
      </Button>

      {/* Bootstrap Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={toggleSidebar} backdrop="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {user?.role === 'ADMIN' ? (
              <>
                <Nav.Link as={Link} to="/admin/dashboard" onClick={toggleSidebar}>
                  📊 Admin Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/users" onClick={toggleSidebar}>
                  👥 Manage Users
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/tasks" onClick={toggleSidebar}>
                  ✅ Manage Tasks
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/user/dashboard" onClick={toggleSidebar}>
                  🏠 My Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="/user/profile" onClick={toggleSidebar}>
                  ⚙ Profile Settings
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
