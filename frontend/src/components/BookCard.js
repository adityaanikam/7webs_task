import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Genre: {book.genre}
        </Typography>
        <Rating value={book.averageRating} text={`${book.reviews.length} reviews`} />
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/books/${book._id}`}>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;