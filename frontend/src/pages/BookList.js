import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BookCard from '../components/BookCard';
import { Grid, TextField, Button, Box, Typography, Pagination, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const BookList = () => {
  const [data, setData] = useState({ books: [], totalPages: 1 });
  const [filters, setFilters] = useState({ author: '', genre: '' });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ sortBy: 'createdAt', order: 'desc' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { author, genre } = filters;
        const { sortBy, order } = sort;
        const res = await api.get(`/books?page=${page}&author=${author}&genre=${genre}&sortBy=${sortBy}&order=${order}`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };
    fetchBooks();
  }, [page, filters, sort]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split(',');
    setSort({ sortBy, order });
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Books</Typography>
      <Box display="flex" gap={2} mb={4}>
        <TextField label="Filter by Author" name="author" value={filters.author} onChange={handleFilterChange} variant="outlined" size="small" />
        <TextField label="Filter by Genre" name="genre" value={filters.genre} onChange={handleFilterChange} variant="outlined" size="small" />
         <FormControl size="small" sx={{minWidth: 150}}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={`${sort.sortBy},${sort.order}`}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="createdAt,desc">Date Added (Newest)</MenuItem>
            <MenuItem value="createdAt,asc">Date Added (Oldest)</MenuItem>
            <MenuItem value="averageRating,desc">Rating (High to Low)</MenuItem>
            <MenuItem value="averageRating,asc">Rating (Low to High)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={4}>
        {data.books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={data.totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default BookList;