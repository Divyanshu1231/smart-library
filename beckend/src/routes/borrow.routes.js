const express = require("express");
const protect = require("../middleware/auth");

const User = require("../model/User");
const Borrow = require("../model/Borrow");
const Book = require("../model/Books"); // ✅ use DB model

const router = express.Router();

// ✅ POST /borrow/validate
router.post("/validate", protect, async (req, res) => {
  try {
    const { bookId, days } = req.body;

    if (!bookId || !days || days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid bookId & days required ❌",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found ❌" });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ success: false, message: "Book not available ❌" });
    }

    const user = await User.findById(req.user.id);

    if (user.balance > 0) {
      return res.status(400).json({ success: false, message: "Pending debt exists ❌" });
    }

    const activeBorrow = await Borrow.findOne({
      userId: req.user.id,
      status: "BORROWED",
    });

    if (activeBorrow) {
      return res.status(400).json({
        success: false,
        message: "You already have an active borrow ❌",
      });
    }

    return res.json({ success: true, message: "Borrow allowed ✅" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

// ✅ POST /borrow/calculate
router.post("/calculate", protect, async (req, res) => {
  try {
    const { bookId, days } = req.body;

    if (!bookId || !days || days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid bookId & days required ❌",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found ❌" });
    }

    const totalCost = book.pricePerDay * Number(days);

    return res.json({
      success: true,
      bookId,
      days: Number(days),
      pricePerDay: book.pricePerDay,
      totalCost,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

// ✅ POST /borrow (final create)
router.post("/", protect, async (req, res) => {
  try {
    const { bookId, days } = req.body;

    if (!bookId || !days || days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid bookId & days required ❌",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found ❌" });
    }

    if (!book.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Book not available ❌",
      });
    }

    const user = await User.findById(req.user.id);
    if (user.balance > 0) {
      return res.status(400).json({
        success: false,
        message: "Pending debt exists ❌",
      });
    }

    const activeBorrow = await Borrow.findOne({
      userId: req.user.id,
      status: "BORROWED",
    });

    if (activeBorrow) {
      return res.status(400).json({
        success: false,
        message: "Already borrowed a book ❌",
      });
    }

    const borrowCost = book.pricePerDay * Number(days);

    // mark unavailable
    book.isAvailable = false;
    await book.save();

    const borrow = await Borrow.create({
      userId: req.user.id,
      bookId: book._id,
      days: Number(days),
      borrowCost,
      totalPay: borrowCost,
      status: "BORROWED",
    });

    return res.json({
      success: true,
      message: "Borrow created ✅",
      borrow,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
