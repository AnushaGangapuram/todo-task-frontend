// src/components/admin/TaskManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { userService } from '../../services/userService';
import { taskService } from '../../services/taskService';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskList = await userService.getAllTasks();
      const userList = await userService.getAllUsers();
      setTasks(taskList);
      setUsers(userList);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      await taskService.createTask(formData);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      fetchData();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Task Management</h2>
      <Button 
        variant="primary" 
        className="mb-3" 
        onClick={() => setShowModal(true)}
      >
        Create Task
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Description</th>
            <th>Assigned User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.user?.username || 'Unassigned'}</td>
              <td>{task.status}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
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
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              task: e.target.task.value,
              userId: e.target.userId.value,
              status: e.target.status.value
            };
            handleCreateTask(formData);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control type="text" name="task" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign to User</Form.Label>
              <Form.Select name="userId" required>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" required>
                <option value="">Select Status</option>
                <option value="PENDING">Pending</option>
                <option value="ON_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskManagement;