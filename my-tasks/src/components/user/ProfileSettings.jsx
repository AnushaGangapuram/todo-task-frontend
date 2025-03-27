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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userService.getUserProfile(user.id);
        setProfile({
          fullname: userData.fullname,
          username: userData.username,
          email: userData.email
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUserProfile(user.id, profile);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
      console.error('Update profile error', error);
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
          {message && (
            <Alert 
              variant={message.includes('successfully') ? 'success' : 'danger'}
            >
              {message}
            </Alert>
          )}
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
                onChange={handleChange}
                required
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