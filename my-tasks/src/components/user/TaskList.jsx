// src/components/user/TaskList.jsx
import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'ON_PROGRESS': return 'info';
      case 'COMPLETED': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Your Tasks</h2>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item 
            key={task.id} 
            className="d-flex justify-content-between align-items-center"
          >
            {task.task}
            <Badge 
              bg={getStatusVariant(task.status)} 
              pill
            >
              {task.status.replace('_', ' ')}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TaskList;