// src/components/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { userService } from '../../services/userService';
import { authService } from '../../services/authService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleCreateAdmin = async (formData) => {
    try {
      await authService.registerAdmin(formData, 1); // Assuming admin ID 1
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to create admin', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">User Management</h2>
      <Button 
        variant="primary" 
        className="mb-3" 
        onClick={() => {
          setSelectedUser(null);
          setShowModal(true);
        }}
      >
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
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
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
          <Form onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              username: e.target.username.value,
              email: e.target.email.value,
              fullname: e.target.fullname.value,
              password: e.target.password.value
            };
            handleCreateAdmin(formData);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullname" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
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