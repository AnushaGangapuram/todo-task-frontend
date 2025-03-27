// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { taskService } from '../../services/taskService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await userService.getAllUsers();
        const taskList = await userService.getAllTasks();
        setUsers(userList);
        setTasks(taskList);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>System Overview</Card.Header>
            <Card.Body>
              <p>Total Users: {users.length}</p>
              <p>Total Tasks: {tasks.length}</p>
              <p>Active Users: {users.filter(u => u.enabled).length}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Recent Users</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(u => (
                    <tr key={u.id}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.roles[0]?.rolename || 'USER'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;