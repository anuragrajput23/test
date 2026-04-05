const cron = require("node-cron");
const { sendDailyNotifications } = require("./notificationService");

/**
 * Initialize background jobs for the application
 * Sets up scheduled tasks for sending spaced repetition notifications
 * @returns {Object} Object containing initialized cron jobs
 */
const initializeCronJobs = () => {
  console.log("[INFO] Initializing background jobs...");

  // Schedule notification delivery every 30 minutes
  // This sends notifications for problems at spaced intervals:
  // 1, 3, 7, 15, 30, 60, 120 days after solving
  const notificationJob = cron.schedule("*/30 * * * *", async () => {
    try {
      await sendDailyNotifications();
    } catch (error) {
      console.error("[ERROR] Notification job failed:", error.message);
    }
  });

  console.log("[INFO] Notification job scheduled: Every 30 minutes");
  console.log("[INFO] Intervals: 1, 3, 7, 15, 30, 60, 120 days");

  return {
    notificationJob,
  };
};

/**
 * Stop a running cron job
 * @param {Object} job - Cron job to stop
 */
const stopCronJob = (job) => {
  if (job) {
    job.stop();
    console.log("[INFO] Cron job stopped");
  }
};

module.exports = {
  initializeCronJobs,
  stopCronJob,
};
