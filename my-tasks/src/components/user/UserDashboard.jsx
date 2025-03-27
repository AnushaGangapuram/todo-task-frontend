// src/components/user/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/taskService';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      const fetchTasks = async () => {
        try {
          const userTasks = await taskService.getUserTasks(user.id);
          setTasks(userTasks);
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        }
      };
      fetchTasks();
    }
  }, [user?.id]);

  const handleUpdateStatus = async (taskId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === 'PENDING'
          ? 'ON_PROGRESS'
          : currentStatus === 'ON_PROGRESS'
          ? 'COMPLETED'
          : 'PENDING';

      await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const getStatusVariant = status => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'ON_PROGRESS':
        return 'info';
      case 'COMPLETED':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Welcome, {user?.username}!</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Your Tasks</Card.Header>
            <Card.Body>
              {tasks.length === 0 ? (
                <p>No tasks assigned yet.</p>
              ) : (
                tasks.map(task => (
                  <div
                    key={task.id}
                    className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded"
                  >
                    <span>{task.task}</span>
                    <Button
                      variant={getStatusVariant(task.status)}
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, task.status)}
                    >
                      {task.status.replace('_', ' ')}
                    </Button>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Task Statistics</Card.Header>
            <Card.Body>
              <p>Total Tasks: {tasks.length}</p>
              <p>Pending: {tasks.filter(t => t.status === 'PENDING').length}</p>
              <p>In Progress: {tasks.filter(t => t.status === 'ON_PROGRESS').length}</p>
              <p>Completed: {tasks.filter(t => t.status === 'COMPLETED').length}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
