const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    borrowId: { type: mongoose.Schema.Types.ObjectId, ref: "Borrow", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
