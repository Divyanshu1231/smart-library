const express = require("express");
const router = express.Router();
const Book = require("../model/Books");

router.get("/seed", async (req, res) => {
  try {
    await Book.deleteMany();

    const books = [
      { title: "Atomic Habits", author: "James Clear", pricePerDay: 10, duePerDay: 5 },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", pricePerDay: 12, duePerDay: 6 },
      { title: "The Alchemist", author: "Paulo Coelho", pricePerDay: 8, duePerDay: 4 },
      { title: "Ikigai", author: "Hector Garcia", pricePerDay: 9, duePerDay: 5 },
      { title: "Deep Work", author: "Cal Newport", pricePerDay: 11, duePerDay: 6 },
      { title: "Zero to One", author: "Peter Thiel", pricePerDay: 10, duePerDay: 5 },
      { title: "Think and Grow Rich", author: "Napoleon Hill", pricePerDay: 7, duePerDay: 4 },
      { title: "Start With Why", author: "Simon Sinek", pricePerDay: 9, duePerDay: 5 },
      { title: "The Power of Habit", author: "Charles Duhigg", pricePerDay: 10, duePerDay: 5 },
      { title: "Sapiens", author: "Yuval Noah Harari", pricePerDay: 14, duePerDay: 7 },
      { title: "Homo Deus", author: "Yuval Noah Harari", pricePerDay: 14, duePerDay: 7 },
      { title: "The Psychology of Money", author: "Morgan Housel", pricePerDay: 10, duePerDay: 5 },
      { title: "Eat That Frog", author: "Brian Tracy", pricePerDay: 8, duePerDay: 4 },
      { title: "The 5 AM Club", author: "Robin Sharma", pricePerDay: 11, duePerDay: 6 },
      { title: "Mindset", author: "Carol Dweck", pricePerDay: 10, duePerDay: 5 },
      { title: "Grit", author: "Angela Duckworth", pricePerDay: 10, duePerDay: 5 },
      { title: "The Lean Startup", author: "Eric Ries", pricePerDay: 12, duePerDay: 6 },
      { title: "Rework", author: "Jason Fried", pricePerDay: 9, duePerDay: 5 },
      { title: "Hooked", author: "Nir Eyal", pricePerDay: 10, duePerDay: 5 },
      { title: "Can't Hurt Me", author: "David Goggins", pricePerDay: 13, duePerDay: 6 },
    ];

    await Book.insertMany(books);

    res.json({
      success: true,
      message: "20 books seeded successfully ✅",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
