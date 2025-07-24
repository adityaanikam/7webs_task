import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route 
            path="/add-book" 
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;