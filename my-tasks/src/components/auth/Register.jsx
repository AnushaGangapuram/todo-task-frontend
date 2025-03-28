import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'fullname':
        errorMsg = value.length < 3 ? 'Full Name must be at least 3 characters' : '';
        break;
      case 'username':
        errorMsg = /^[a-zA-Z0-9]+$/.test(value) && value.length >= 4
          ? '' : 'Username must be at least 4 characters (letters/numbers only)';
        break;
      case 'email':
        errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
        break;
      case 'password':
        errorMsg = value.length >= 6 && /\d/.test(value)
          ? '' : 'Password must be at least 6 characters and contain a number';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateForm(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (Object.values(errors).some(err => err) || Object.values(formData).some(field => field === '')) {
      setError('Please fix the errors before submitting.');
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData);
      setSuccess('User successfully registered. Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container>
        <Card className="shadow-lg border-0 mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-3 text-primary">Create an Account</h2>
            <p className="text-center text-muted">Register to access your tasks</p>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {success && <Alert variant="success" className="text-center">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="rounded-2"
                  placeholder="Enter your full name"
                  isInvalid={!!errors.fullname}
                />
                <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="rounded-2"
                  placeholder="Choose a username"
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-2"
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-2"
                  placeholder="Create a password"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button 
                variant="primary"
                type="submit"
                className="w-100 rounded-2 fw-bold"
                style={{ fontSize: '1.1rem' }}
                disabled={loading || Object.values(errors).some(err => err) || Object.values(formData).some(field => field === '')}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p className="mb-1 text-muted">Already have an account?</p>
              <Button variant="link" onClick={() => navigate('/login')} className="fw-bold">
                Login Here
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
