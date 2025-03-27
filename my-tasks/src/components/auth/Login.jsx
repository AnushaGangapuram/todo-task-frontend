import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth(); // ✅ FIXED: Ensure AuthContext provides these functions
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors
    try {
      const response = await authService.login(formData.username, formData.password);
      console.log("Login Response:", response); // ✅ Debug login response

      // ✅ Store token
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      // ✅ Update Auth Context
      setUser({
        id: response.userId,
        username: response.username,
        role: response.role // Ensure correct role assignment
      });
      setIsAuthenticated(true);

      // ✅ Navigate based on role
      if (response.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
