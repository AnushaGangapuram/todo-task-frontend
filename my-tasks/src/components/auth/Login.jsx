import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null); // Reset previous errors
  try {
    const response = await authService.login(formData.username, formData.password);

    // Store accessToken and refreshToken in localStorage separately
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    // Also store the user data for future reference if needed
    const user = {
      userId: response.userId,
      username: response.username,
      role: response.role
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Update Auth Context
    setUser(user);
    setIsAuthenticated(true);

    // Navigate based on role
    if (response.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  } catch (error) {
    setError('Invalid credentials. Please try again.');
    console.error('Login error:', error);
  }
};

  
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Header className="text-center bg-primary text-white">Login</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
              </Form>
              <div className="mt-3 text-center">
                <p>Don't have an account? <Button variant="link" onClick={handleRegisterClick}>Register</Button></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
