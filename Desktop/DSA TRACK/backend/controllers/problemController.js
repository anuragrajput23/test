const Problem = require("../models/Problem");
const { validationResult } = require("express-validator");

/**
 * Create a new problem
 * POST /api/problems
 */
exports.createProblem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, topic, difficulty, solvedDate } = req.body;
    const userId = req.user.id;

    // Create new problem
    const problem = new Problem({
      userId,
      title,
      topic,
      difficulty,
      solvedDate: solvedDate || new Date(),
    });

    // Calculate initial next revision date (1 day from solved date)
    problem.nextRevisionDate = problem.calculateNextRevisionDate(0);

    // Save to database
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Problem added successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Create problem error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating problem",
      error: error.message,
    });
  }
};

/**
 * Get all problems for current user
 * GET /api/problems
 * Query params: topic, difficulty, sort
 */
exports.getProblems = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topic, difficulty, sort = "-createdAt" } = req.query;

    // Build filter object
    let filter = { userId };

    if (topic) {
      filter.topic = topic;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Get problems from database
    const problems = await Problem.find(filter).sort(sort);

    // Calculate statistics
    const stats = {
      total: problems.length,
      byStage: {},
      byTopic: {},
      byDifficulty: {},
    };

    problems.forEach((p) => {
      // Count by stage
      stats.byStage[p.revisionStage] =
        (stats.byStage[p.revisionStage] || 0) + 1;
      // Count by topic
      stats.byTopic[p.topic] = (stats.byTopic[p.topic] || 0) + 1;
      // Count by difficulty
      stats.byDifficulty[p.difficulty] =
        (stats.byDifficulty[p.difficulty] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
      stats,
    });
  } catch (error) {
    console.error("Get problems error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving problems",
      error: error.message,
    });
  }
};

/**
 * Get problems due for revision today
 * GET /api/problems/today
 */
exports.getProblemsForToday = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get today's date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date at start of day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find problems where nextRevisionDate is between today and tomorrow
    const problems = await Problem.find({
      userId,
      nextRevisionDate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort("revisionStage");

    res.status(200).json({
      success: true,
      count: problems.length,
      message: `You have ${problems.length} problem(s) to revise today`,
      data: problems,
    });
  } catch (error) {
    console.error("Get today problems error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving today's problems",
      error: error.message,
    });
  }
};

/**
 * Get a single problem by ID
 * GET /api/problems/:id
 */
exports.getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find problem and verify ownership
    const problem = await Problem.findOne({
      _id: id,
      userId,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    console.error("Get problem error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving problem",
      error: error.message,
    });
  }
};

/**
 * Update a problem
 * PUT /api/problems/:id
 */
exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, topic, difficulty } = req.body;

    // Find problem and verify ownership
    let problem = await Problem.findOne({
      _id: id,
      userId,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Update allowed fields
    if (title) problem.title = title;
    if (topic) problem.topic = topic;
    if (difficulty) problem.difficulty = difficulty;

    await problem.save();

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Update problem error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating problem",
      error: error.message,
    });
  }
};

/**
 * Delete a problem
 * DELETE /api/problems/:id
 */
exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find and delete problem
    const problem = await Problem.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Delete problem error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting problem",
      error: error.message,
    });
  }
};

/**
 * Mark problem as revised (successful recall)
 * PUT /api/problems/:id/revise
 */
exports.reviseProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { status } = req.body; // status: 'success' or 'failed'

    // Find problem and verify ownership
    let problem = await Problem.findOne({
      _id: id,
      userId,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Mark based on status
    if (status === "failed") {
      problem.markAsFailed();
    } else {
      // Default to success
      problem.markAsRevised();
    }

    await problem.save();

    res.status(200).json({
      success: true,
      message: `Problem marked as ${status === "failed" ? "failed" : "revised"} successfully`,
      data: problem,
    });
  } catch (error) {
    console.error("Revise problem error:", error);
    res.status(500).json({
      success: false,
      message: "Error revising problem",
      error: error.message,
    });
  }
};

/**
 * Get revision statistics for user
 * GET /api/problems/stats/overview
 */
exports.getRevisionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const problems = await Problem.find({ userId });

    // Calculate various statistics
    const stats = {
      totalProblems: problems.length,
      completedStages: problems.filter((p) => p.revisionStage === 6).length,
      averageRevisions:
        problems.length > 0
          ? (
              problems.reduce((sum, p) => sum + p.revisionCount, 0) /
              problems.length
            ).toFixed(2)
          : 0,
      totalFailures: problems.reduce((sum, p) => sum + p.failureCount, 0),
      byStage: {
        0: problems.filter((p) => p.revisionStage === 0).length,
        1: problems.filter((p) => p.revisionStage === 1).length,
        2: problems.filter((p) => p.revisionStage === 2).length,
        3: problems.filter((p) => p.revisionStage === 3).length,
        4: problems.filter((p) => p.revisionStage === 4).length,
        5: problems.filter((p) => p.revisionStage === 5).length,
        6: problems.filter((p) => p.revisionStage === 6).length,
      },
      byTopic: {},
      byDifficulty: {},
    };

    // Count by topic and difficulty
    problems.forEach((p) => {
      stats.byTopic[p.topic] = (stats.byTopic[p.topic] || 0) + 1;
      stats.byDifficulty[p.difficulty] =
        (stats.byDifficulty[p.difficulty] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving statistics",
      error: error.message,
    });
  }
};
