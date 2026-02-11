const express = require("express");
const protect = require("../middleware/auth");

const Borrow = require("../model/Borrow");
const Payment = require("../model/Payment");
const User = require("../model/User");
const Book = require("../model/Books"); // ✅ use DB model

const router = express.Router();

// ✅ GET /borrows/active
router.get("/active", protect, async (req, res) => {
  const active = await Borrow.find({
    userId: req.user.id,
    status: "BORROWED",
  }).sort({ createdAt: -1 });

  res.json({ success: true, total: active.length, active });
});

// ✅ GET /borrows/:borrowId/summary
router.get("/:borrowId/summary", protect, async (req, res) => {
  const borrow = await Borrow.findOne({
    _id: req.params.borrowId,
    userId: req.user.id,
  });

  if (!borrow)
    return res
      .status(404)
      .json({ success: false, message: "Borrow not found ❌" });

  const book = await Book.findById(borrow.bookId);

  res.json({
    success: true,
    borrowId: borrow._id,
    book,
    days: borrow.days,
    borrowCost: borrow.borrowCost,
    lateDays: borrow.lateDays,
    lateFee: borrow.lateFee,
    totalPay: borrow.totalPay,
    status: borrow.status,
  });
});

// ✅ POST /borrows/:borrowId/submit
router.post("/:borrowId/submit", protect, async (req, res) => {
  try {
    const { lateDays } = req.body;

    const borrow = await Borrow.findOne({
      _id: req.params.borrowId,
      userId: req.user.id,
      status: "BORROWED",
    });

    if (!borrow) {
      return res
        .status(400)
        .json({ success: false, message: "No active borrow found ❌" });
    }

    const book = await Book.findById(borrow.bookId);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found ❌" });

    const late = Number(lateDays || 0);
    const lateFee = late * book.duePerDay;
    const totalPay = borrow.borrowCost + lateFee;

    // update borrow
    borrow.lateDays = late;
    borrow.lateFee = lateFee;
    borrow.totalPay = totalPay;
    borrow.status = "RETURNED";
    await borrow.save();

    // update user balance
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { balance: totalPay },
    });

    // create payment record
    await Payment.create({
      userId: req.user.id,
      borrowId: borrow._id,
      amount: totalPay,
      status: "PENDING",
    });

    // make book available again
    book.isAvailable = true;
    await book.save();

    return res.json({
      success: true,
      message: "Borrow submitted/returned ✅",
      totalPay,
      lateFee,
      borrow,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

// ✅ GET /borrows/history
router.get("/history", protect, async (req, res) => {
  const history = await Borrow.find({
    userId: req.user.id,
    status: "RETURNED",
  }).sort({ createdAt: -1 });

  res.json({ success: true, total: history.length, history });
});

module.exports = router;
