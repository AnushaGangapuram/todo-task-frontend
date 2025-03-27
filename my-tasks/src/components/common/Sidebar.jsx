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
      <Button 
        variant="primary" 
        className="m-3" 
        onClick={toggleSidebar}
        style={{
          borderRadius: '50%', 
          width: '50px', 
          height: '50px', 
          fontSize: '24px', 
          padding: '0', 
          backgroundColor: '#007bff', 
          border: 'none'
        }}
      >
        ☰
      </Button>

      {/* Bootstrap Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={toggleSidebar} backdrop="true" placement="start" style={{ width: '250px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ paddingTop: '20px' }}>
            {/* Admin Links */}
            {user?.role === 'ADMIN' ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/admin/dashboard" 
                  onClick={toggleSidebar}
                  style={{ fontWeight: 'bold', fontSize: '18px', padding: '10px 15px' }}
                  className="sidebar-nav-item"
                >
                  📊 Admin Dashboard
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/users" 
                  onClick={toggleSidebar}
                  style={{ fontWeight: 'bold', fontSize: '18px', padding: '10px 15px' }}
                  className="sidebar-nav-item"
                >
                  👥 Manage Users
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/tasks" 
                  onClick={toggleSidebar}
                  style={{ fontWeight: 'bold', fontSize: '18px', padding: '10px 15px' }}
                  className="sidebar-nav-item"
                >
                  ✅ Manage Tasks
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/user/dashboard" 
                  onClick={toggleSidebar}
                  style={{ fontWeight: 'bold', fontSize: '18px', padding: '10px 15px' }}
                  className="sidebar-nav-item"
                >
                  🏠 My Tasks
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/user/profile" 
                  onClick={toggleSidebar}
                  style={{ fontWeight: 'bold', fontSize: '18px', padding: '10px 15px' }}
                  className="sidebar-nav-item"
                >
                  ⚙ Profile Settings
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar Custom Styles */}
      <style jsx>{`
        .sidebar-nav-item {
          border-bottom: 1px solid #ddd;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .sidebar-nav-item:hover {
          background-color: #f8f9fa;
          color: #007bff;
        }

        .offcanvas-header {
          background-color: #343a40;
          color: #fff;
        }

        .offcanvas-body {
          background-color: #f1f1f1;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
