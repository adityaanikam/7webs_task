const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');
const { body, validationResult } = require('express-validator');

// Add a review to a book
exports.addReview = [
  body('review_text', 'Review text is required').not().isEmpty(),
  body('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { review_text, rating } = req.body;
    const { bookId } = req.params;

    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }

      const newReview = new Review({
        review_text,
        rating,
        user: req.user.id,
        book: bookId,
      });

      const review = await newReview.save();
      
      // Add review to book's reviews array
      book.reviews.push(review._id);

      // Recalculate average rating
      const reviews = await Review.find({ book: bookId });
      const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
      book.averageRating = totalRating / reviews.length;
      
      await book.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
];