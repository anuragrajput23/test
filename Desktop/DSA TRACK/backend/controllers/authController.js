const User = require("../models/User");
const { validationResult } = require("express-validator");

/**
 * Register a new user account
 * @route   POST /api/auth/register
 * @body    {string} name - User's full name
 * @body    {string} email - User's email address
 * @body    {string} password - User's password
 * @returns {Object} Success status, JWT token, and user data
 */
exports.register = async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate authentication token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[ERROR] Registration failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/**
 * Authenticate user and generate JWT token
 * @route   POST /api/auth/login
 * @body    {string} email - User's email address
 * @body    {string} password - User's password
 * @returns {Object} Success status, JWT token, and user data
 */
exports.login = async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate authentication token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[ERROR] Login failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/**
 * Get current logged-in user info
 * GET /api/auth/me
 * Protected route
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving user info",
      error: error.message,
    });
  }
};
