const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');
const { body, validationResult } = require('express-validator');

// Add a new book
exports.addBook = [
  body('title', 'Title is required').not().isEmpty(),
  body('author', 'Author is required').not().isEmpty(),
  body('genre', 'Genre is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;

    try {
      const newBook = new Book({
        title,
        author,
        genre,
        createdBy: req.user.id,
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
];

// Get all books with filtering, pagination, and sorting
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  try {
    let query = {};
    if (author) query.author = { $regex: author, $options: 'i' }; // Case-insensitive search
    if (genre) query.genre = { $regex: genre, $options: 'i' };

    const sortOptions = { [sortBy]: order === 'desc' ? -1 : 1 };

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name' }
    });

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};