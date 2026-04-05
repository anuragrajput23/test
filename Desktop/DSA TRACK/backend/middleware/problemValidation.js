const { body } = require("express-validator");

/**
 * Validation rules for creating a problem
 */
exports.validateCreateProblem = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Problem title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("topic")
    .notEmpty()
    .withMessage("Topic is required")
    .isIn([
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Greedy",
      "Sorting",
      "Searching",
      "Hashing",
      "Math",
      "Other",
    ])
    .withMessage("Invalid topic selected"),
  body("difficulty")
    .optional()
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be Easy, Medium, or Hard"),
  body("solvedDate")
    .optional()
    .isISO8601()
    .withMessage("Solved date must be a valid date"),
];

/**
 * Validation rules for updating a problem
 */
exports.validateUpdateProblem = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("topic")
    .optional()
    .isIn([
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Greedy",
      "Sorting",
      "Searching",
      "Hashing",
      "Math",
      "Other",
    ])
    .withMessage("Invalid topic selected"),
  body("difficulty")
    .optional()
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be Easy, Medium, or Hard"),
];

/**
 * Validation rules for revising a problem
 */
exports.validateRevise = [
  body("status")
    .optional()
    .isIn(["success", "failed"])
    .withMessage('Status must be "success" or "failed"'),
];
