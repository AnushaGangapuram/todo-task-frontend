import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { taskService } from '../../services/taskService';
import { userService } from '../../services/userService';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', assignedTo: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskList = await taskService.getAllTasks();
      setTasks(taskList);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const userList = await userService.getAllUsers();
      setUsers(userList);
    } catch (error) {
      setError('Failed to fetch users. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        setSuccessMessage('Task deleted successfully!');
        fetchTasks();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.assignedTo) {
      setError('Please select a user.');
      return;
    }

    const taskData = {
      task: newTask.task,
      userId: newTask.assignedTo,
      status: 'PENDING',
    };

    try {
      await taskService.createOrAssignTask(taskData);
      setSuccessMessage('Task assigned successfully!');
      setShowModal(false);
      fetchTasks();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Task Management</h2>

      {/* ✅ Show Success & Error Messages */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Create Task
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Assigned To (Username)</th> {/* ✅ Updated to show username */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.user?.username || 'Unassigned'}</td> {/* ✅ Display username instead of userId */}
              <td>{task.status}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Task Creation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTask}>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                required
                value={newTask.task}
                onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                as="select"
                required
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} {/* ✅ Show username instead of userId */}
                  </option>
                ))}
              </Form.Control>
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
