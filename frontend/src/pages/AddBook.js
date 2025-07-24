import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const AddBook = () => {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.title || !formData.author || !formData.genre) {
        setError('All fields are required.');
        return;
    }
    try {
      await api.post('/books', formData);
      setSuccess('Book added successfully!');
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5s
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Add a New Book</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="title" label="Title" name="title" autoFocus onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="author" label="Author" name="author" onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="genre" label="Genre" name="genre" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Book</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBook;