const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const { initializeCronJobs } = require("./services/cronJobs");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with configured origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  }),
);

// ============================================================================
// ROUTES
// ============================================================================

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// ERROR HANDLERS
// ============================================================================

// Handle 404 - Route Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === "development";

  console.error({
    timestamp: new Date().toISOString(),
    status: statusCode,
    message: err.message,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(isDevelopment && { error: err }),
  });
});

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

const startServer = async () => {
  try {
    // Connect to MongoDB database
    await connectDB();

    // Initialize background jobs for notifications
    initializeCronJobs();

    // Start listening on configured port
    app.listen(PORT, () => {
      console.log(`[INFO] Server started on port ${PORT}`);
      console.log(
        `[INFO] Environment: ${process.env.NODE_ENV || "development"}`,
      );
    });
  } catch (error) {
    console.error("[ERROR] Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
