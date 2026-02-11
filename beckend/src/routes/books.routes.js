const express = require("express");
const Book = require("../model/Books"); // MongoDB model

const router = express.Router();

// ✅ GET all books (from DB)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.json({
      success: true,
      total: books.length,
      books: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ✅ GET single book by id (from DB)
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found ❌",
      });
    }

    res.json({
      success: true,
      book: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Invalid book ID ❌",
    });
  }
});

module.exports = router;
