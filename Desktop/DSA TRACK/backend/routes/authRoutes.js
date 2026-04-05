const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} = require("../middleware/validation");

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", validateRegister, handleValidationErrors, register);

/**
 * POST /api/auth/login
 * Login user
 */
router.post("/login", validateLogin, handleValidationErrors, login);

/**
 * GET /api/auth/me
 * Get current logged-in user (protected route)
 */
router.get("/me", protect, getMe);

module.exports = router;
