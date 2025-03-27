// src/components/admin/TaskManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { taskService } from '../../services/taskService';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', assignedTo: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskList = await taskService.getAllTasks();
      setTasks(taskList);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(newTask);
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Task Management</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Create Task
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.assignedTo}</td>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTask}>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" required value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign To (User ID)</Form.Label>
              <Form.Control type="text" required value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} />
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
