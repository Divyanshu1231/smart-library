const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pricePerDay: Number,
  duePerDay: Number,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", bookSchema);
