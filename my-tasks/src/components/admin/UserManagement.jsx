// src/components/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { userService } from '../../services/userService';
import { authService } from '../../services/authService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', fullname: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await userService.getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  // UserManagement.jsx
const handleCreateAdmin = async (e) => {
  e.preventDefault();

  if (!newAdmin.username || !newAdmin.email || !newAdmin.fullname || !newAdmin.password) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // Get the logged-in user ID from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  try {
    await authService.registerAdmin(newAdmin, loggedInUser.userId); // Pass the adminId
    alert("✅ Admin created successfully!");
    setShowModal(false);
    fetchUsers(); // Fetch the updated user list
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
  }
};

  

  return (
    <Container className="mt-5">
      <h2 className="mb-4">User Management</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Create Admin
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles[0]?.rolename || 'USER'}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateAdmin}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" required value={newAdmin.fullname} onChange={(e) => setNewAdmin({ ...newAdmin, fullname: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Admin
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;
