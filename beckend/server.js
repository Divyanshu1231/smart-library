const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./src/config/db");

// Routes
const bookRoutes = require("./src/routes/books.routes");
const authRoutes = require("./src/routes/auth.routes");
const borrowRoutes = require("./src/routes/borrow.routes");
const borrowsRoutes = require("./src/routes/borrows.routes");
const paymentsRoutes = require("./src/routes/payments.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const seedRoutes = require("./src/routes/books.seed");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
console.log("MONGO_URI =", process.env.MONGO_URI);
connectDB();

// Root
app.get("/", (req, res) => {
  res.send("Smart Library Backend Running ✅");
});

// Main routes
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/borrow", borrowRoutes);
app.use("/borrows", borrowsRoutes);
app.use("/payments", paymentsRoutes);
app.use("/dashboard", dashboardRoutes);

// Admin seed route (for adding books)
app.use("/admin", seedRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} ✅`);
});
