const express = require("express");
const protect = require("../middleware/auth");
const Payment = require("../model/Payment");

const router = express.Router();

// ✅ GET /payments/history
router.get("/history", protect, async (req, res) => {
  const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    total: payments.length,
    payments,
  });
});

module.exports = router;
