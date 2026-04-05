const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Track which stage triggered this notification
  // For stage 0, notificationDay = 1
  // For stage 1, notificationDay = 3, etc.
  notificationDay: {
    type: Number,
    required: true,
    enum: [1, 3, 7, 15, 30, 60, 120],
  },
  // Time when notification was sent
  sentAt: {
    type: Date,
    default: Date.now,
  },
  // Email address it was sent to
  sentTo: {
    type: String,
    required: true,
  },
  // Status of notification
  status: {
    type: String,
    enum: ["sent", "failed", "pending"],
    default: "sent",
  },
  // Error message if failed
  errorMessage: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient queries
NotificationSchema.index({ problemId: 1, notificationDay: 1 });
NotificationSchema.index({ userId: 1, sentAt: -1 });

module.exports = mongoose.model("Notification", NotificationSchema);
