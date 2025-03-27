// src/components/user/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/taskService';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userTasks = await taskService.getUserTasks(user.id);
        setTasks(userTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, [user.id]);

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Welcome, {user.username}!</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Your Tasks</Card.Header>
            <Card.Body>
              {tasks.map(task => (
                <div key={task.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                  <span>{task.task}</span>
                  <div>
                    <Button 
                      variant={task.status === 'PENDING' ? 'warning' : 
                               task.status === 'COMPLETED' ? 'success' : 'info'}
                      size="sm"
                      onClick={() => {
                        const newStatus = 
                          task.status === 'PENDING' ? 'ON_PROGRESS' :
                          task.status === 'ON_PROGRESS' ? 'COMPLETED' : 'PENDING';
                        handleUpdateStatus(task.id, newStatus);
                      }}
                    >
                      {task.status}
                    </Button>
                  </div>
                </div>
              ))}
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