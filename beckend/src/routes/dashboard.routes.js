const express = require("express");
const protect = require("../middleware/auth");

const Borrow = require("../model/Borrow");
const Payment = require("../model/Payment");
const User = require("../model/User");

const router = express.Router();

// ✅ GET /dashboard/summary
router.get("/summary", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  const activeCount = await Borrow.countDocuments({ userId: req.user.id, status: "BORROWED" });
  const historyCount = await Borrow.countDocuments({ userId: req.user.id, status: "RETURNED" });

  const payments = await Payment.find({ userId: req.user.id });
  const totalDue = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);

  res.json({
    success: true,
    dashboard: {
      activeBorrows: activeCount,
      borrowHistory: historyCount,
      pendingAmount: totalDue,
      balance: user.balance,
    },
  });
});

module.exports = router;
