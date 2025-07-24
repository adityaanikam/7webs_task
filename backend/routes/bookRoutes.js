const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);

module.exports = router;