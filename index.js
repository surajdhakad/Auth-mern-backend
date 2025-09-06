const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./Models/db"); // Database connection

// Routers
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CartRouter = require("./Routes/CartRouter");

const PORT = process.env.PORT || 8088;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Health Check Route
app.get("/ping", (req, res) => {
  console.log("🔥 /ping route hit");
  res.status(200).send("PONG ✅ Server is running...");
});

// API Routes
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

// Handle API 404 Errors (only for /api routes)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "Route not found" });
  }
  next();
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
