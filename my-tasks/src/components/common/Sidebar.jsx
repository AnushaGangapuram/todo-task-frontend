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
      <Button 
        variant="primary" 
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
      >
        ☰
      </Button>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={show} onHide={toggleSidebar} backdrop="true" placement="start" className="custom-sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sidebar-title">Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* Admin Links */}
            {user?.role === 'ADMIN' ? (
              <>
                <Nav.Link as={Link} to="/admin/dashboard" onClick={toggleSidebar} className="sidebar-item">
                  📊 Admin Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/users" onClick={toggleSidebar} className="sidebar-item">
                  👥 Manage Users
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/tasks" onClick={toggleSidebar} className="sidebar-item">
                  ✅ Manage Tasks
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/user/dashboard" onClick={toggleSidebar} className="sidebar-item">
                  🏠 My Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="/user/profile" onClick={toggleSidebar} className="sidebar-item">
                  ⚙ Profile Settings
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar Custom Styles */}
      <style jsx>{`
        .sidebar-toggle-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 22px;
          padding: 0;
          background: #007bff;
          border: none;
          color: white;
          transition: 0.3s;
        }

        .sidebar-toggle-btn:hover {
          background: #0056b3;
        }

        .custom-sidebar {
          width: 260px;
          background: #343a40;
          color: white;
        }

        .sidebar-title {
          font-weight: bold;
          font-size: 20px;
          color: #fff;
        }

        .sidebar-item {
          font-size: 18px;
          padding: 12px 15px;
          font-weight: 500;
          color: #ddd;
          transition: all 0.3s ease;
        }

        .sidebar-item:hover {
          background: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
