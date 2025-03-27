// src/components/user/ProfileSettings.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullname: '',
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        try {
          const userData = await userService.getUserProfile(user.id);
          setProfile({
            fullname: userData.fullname || '',
            username: userData.username || '',
            email: userData.email || ''
          });
        } catch (error) {
          console.error('Failed to fetch profile', error);
          setError('Could not fetch profile data. Please try again later.');
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await userService.updateUserProfile(user.id, profile);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Profile Settings</Card.Header>
        <Card.Body>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                readOnly // Remove this if email editing is allowed
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
