const express = require("express");
const router = express.Router();
const {
  createProblem,
  getProblems,
  getProblemsForToday,
  getProblemById,
  updateProblem,
  deleteProblem,
  reviseProblem,
  getRevisionStats,
} = require("../controllers/problemController");
const { protect } = require("../middleware/auth");
const {
  validateCreateProblem,
  validateUpdateProblem,
  validateRevise,
} = require("../middleware/problemValidation");
const { handleValidationErrors } = require("../middleware/validation");

// All problem routes require authentication
router.use(protect);

/**
 * POST /api/problems
 * Create a new problem
 */
router.post("/", validateCreateProblem, handleValidationErrors, createProblem);

/**
 * GET /api/problems
 * Get all problems for the current user
 * Query params: topic, difficulty, sort
 */
router.get("/", getProblems);

/**
 * GET /api/problems/today
 * Get problems due for revision today
 * Must be before /:id route to avoid route conflicts
 */
router.get("/today", getProblemsForToday);

/**
 * GET /api/problems/stats/overview
 * Get revision statistics for user
 */
router.get("/stats/overview", getRevisionStats);

/**
 * GET /api/problems/:id
 * Get a single problem by ID
 */
router.get("/:id", getProblemById);

/**
 * PUT /api/problems/:id
 * Update a problem
 */
router.put(
  "/:id",
  validateUpdateProblem,
  handleValidationErrors,
  updateProblem,
);

/**
 * PUT /api/problems/:id/revise
 * Mark problem as revised or failed
 * Body: { status: 'success' or 'failed' }
 */
router.put(
  "/:id/revise",
  validateRevise,
  handleValidationErrors,
  reviseProblem,
);

/**
 * DELETE /api/problems/:id
 * Delete a problem
 */
router.delete("/:id", deleteProblem);

module.exports = router;
