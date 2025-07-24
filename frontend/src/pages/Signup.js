import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    try {
      const res = await api.post('/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Failed to sign up. User may already exist.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;