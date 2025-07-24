const express = require('express');
const router = express.Router();
const { addReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Route: POST /api/reviews/:bookId
router.post('/:bookId', authMiddleware, addReview);

module.exports = router;