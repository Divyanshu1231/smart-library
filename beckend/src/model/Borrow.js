const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: String, required: true }, // books.js me id string hai
    days: { type: Number, required: true },
    borrowCost: { type: Number, required: true },
    lateDays: { type: Number, default: 0 },
    lateFee: { type: Number, default: 0 },
    totalPay: { type: Number, default: 0 },
    status: { type: String, enum: ["BORROWED", "RETURNED"], default: "BORROWED" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
