const mongoose = require("mongoose");

// Spaced repetition intervals in days
const REVISION_INTERVALS = [1, 3, 7, 15, 30, 60, 120];

// DSA Topics for categorization
const DSA_TOPICS = [
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
];

// Problem difficulty levels
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Problem must be associated with a user"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
      maxlength: [200, "Title must not exceed 200 characters"],
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      enum: DSA_TOPICS,
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: DIFFICULTY_LEVELS,
      default: "Medium",
    },
    solvedDate: {
      type: Date,
      required: [true, "Solution date is required"],
      default: Date.now,
    },
    // Revision stage 0-6 mapping to intervals: [1, 3, 7, 15, 30, 60, 120] days
    revisionStage: {
      type: Number,
      min: 0,
      max: 6,
      default: 0,
    },
    nextRevisionDate: {
      type: Date,
      required: true,
    },
    lastReviewed: {
      type: Date,
      default: null,
    },
    revisionCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    failureCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // Using createdAt and updatedAt manually
  },
);

/**
 * Calculate the next revision date based on the current stage
 * @param {number} stage - Current revision stage (0-6)
 * @returns {Date} Next revision date
 */
problemSchema.methods.calculateNextRevisionDate = function (stage) {
  const daysToAdd =
    REVISION_INTERVALS[Math.min(stage, REVISION_INTERVALS.length - 1)];
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
};

/**
 * Mark problem as successfully revised
 * Increments revision count and stage
 * @returns {Object} Updated problem instance
 */
problemSchema.methods.markAsRevised = function () {
  this.lastReviewed = new Date();
  this.revisionCount += 1;

  if (this.revisionStage < 6) {
    this.revisionStage += 1;
  }

  this.nextRevisionDate = this.calculateNextRevisionDate(this.revisionStage);
  return this;
};

/**
 * Mark problem as failed
 * Resets revision stage and increments failure count
 * @returns {Object} Updated problem instance
 */
problemSchema.methods.markAsFailed = function () {
  this.lastReviewed = new Date();
  this.failureCount += 1;
  this.revisionStage = 0;
  this.nextRevisionDate = this.calculateNextRevisionDate(0);
  return this;
};

/**
 * Update timestamp before saving
 */
problemSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Problem", problemSchema);
