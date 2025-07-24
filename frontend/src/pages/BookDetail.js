import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Rating from '../components/Rating';
import { Container, Typography, Box, CircularProgress, TextField, Button, Alert, Card, CardContent, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({ review_text: '', rating: 0 });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load book details.');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewData.rating < 1 || reviewData.rating > 5) {
        setError('Rating must be between 1 and 5.');
        return;
    }
    setError('');
    try {
      await api.post(`/reviews/${id}`, reviewData);
      setReviewData({ review_text: '', rating: 0 }); // Reset form
      fetchBook(); // Refresh book details to show new review
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {book && (
        <>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h3" component="h1">{book.title}</Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>by {book.author}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>Genre: {book.genre}</Typography>
              <Box display="flex" alignItems="center">
                <Rating value={book.averageRating} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {book.averageRating.toFixed(1)} average rating
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Divider sx={{ my: 4 }} />

          {/* Reviews Section */}
          <Box>
            <Typography variant="h4" gutterBottom>Reviews</Typography>
            {book.reviews.length > 0 ? (
                <List>
                    {book.reviews.map(review => (
                        <ListItem key={review._id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{review.user.name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Rating value={review.rating} />}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {review.user.name}
                                        </Typography>
                                        {" — "}{review.review_text}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No reviews yet. Be the first to review!</Typography>
            )}
          </Box>
          
          <Divider sx={{ my: 4 }} />

          {/* Add Review Form */}
          {token ? (
            <Box component="form" onSubmit={handleReviewSubmit} sx={{ mt: 2 }}>
              <Typography variant="h5">Write a Customer Review</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                id="review_text"
                label="Your Review"
                name="review_text"
                value={reviewData.review_text}
                onChange={handleReviewChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="rating"
                label="Rating (1-5)"
                name="rating"
                type="number"
                value={reviewData.rating}
                onChange={handleReviewChange}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Review</Button>
            </Box>
          ) : (
             <Typography>
                Please <Button onClick={() => navigate('/login')}>log in</Button> to write a review.
             </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default BookDetail;