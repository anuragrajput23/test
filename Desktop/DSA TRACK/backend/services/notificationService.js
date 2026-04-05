const nodemailer = require("nodemailer");
const Problem = require("../models/Problem");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Spaced repetition intervals in days
const INTERVALS = [1, 3, 7, 15, 30, 60, 120];

/**
 * Configure email transporter
 * Uses Gmail SMTP or custom email service
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Generate HTML email template for revision notification
 * Now includes interval information and problem numbers
 */
const generateEmailTemplate = (userName, problems, intervalDay) => {
  if (problems.length === 0) {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
            .header { color: #2d3748; margin-bottom: 20px; }
            .message { color: #4a5568; font-size: 16px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎉 Great Job, ${userName}!</h2>
            </div>
            <div class="message">
              <p>You don't have any problems to revise today. Keep up the excellent work on your DSA studies!</p>
              <p>Visit your <a href="${process.env.FRONTEND_URL}/dashboard">Dashboard</a> to add more problems or continue your learning journey.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // Generate problem cards for email with numbers
  const problemsHTML = problems
    .map(
      (problem, index) => `
    <div style="background: #f9fafb; padding: 15px; margin: 10px 0; border-left: 4px solid #4299e1; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3 style="margin: 0; color: #2d3748; flex: 1;">
          <span style="background: #4299e1; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px;">#${index + 1}</span>
          ${problem.title}
        </h3>
      </div>
      <p style="margin: 5px 0; color: #4a5568; font-size: 14px;">
        <strong>📂 Topic:</strong> ${problem.topic} |
        <strong>⚡ Difficulty:</strong> <span style="color: ${getDifficultyColor(problem.difficulty)}"><strong>${problem.difficulty}</strong></span>
      </p>
      <p style="margin: 5px 0; color: #4a5568; font-size: 14px;">
        <strong>📊 Progress:</strong> Stage ${problem.revisionStage + 1}/7 |
        <strong>🔄 Reviewed:</strong> ${problem.revisionCount} time(s)
      </p>
      <p style="margin: 5px 0; color: #4a5568; font-size: 13px;">
        <strong>❌ Failed:</strong> ${problem.failureCount} time(s)
      </p>
    </div>
  `,
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { color: #2d3748; margin-bottom: 20px; border-bottom: 3px solid #4299e1; padding-bottom: 15px; }
          .header h2 { margin: 0 0 5px 0; font-size: 24px; }
          .header p { margin: 0; color: #718096; font-size: 14px; }
          .interval-badge {
            display: inline-block;
            background: #48bb78;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: bold;
            margin: 10px 0;
            font-size: 14px;
          }
          .problems-section { margin: 25px 0; }
          .problems-header { color: #2d3748; font-size: 18px; margin-bottom: 15px; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; }
          .cta-button {
            display: inline-block;
            background: #4299e1;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
            font-weight: bold;
          }
          .cta-button:hover { background: #3182ce; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📚 DSA Revision Reminder - ${intervalDay} Day(s) Later</h2>
            <p>You have ${problems.length} problem(s) due for revision today!</p>
            <div class="interval-badge">🎯 ${intervalDay}-Day Interval</div>
          </div>

          <p style="color: #4a5568; font-size: 16px;">Hi ${userName},</p>
          <p style="color: #4a5568;">Time to review! According to the spaced repetition schedule, here are the problems scheduled for today:</p>

          <div class="problems-section">
            <div class="problems-header">📝 Problems (#${problems.length} total):</div>
            ${problemsHTML}
          </div>

          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard" class="cta-button">✓ Mark as Revised</a>
          </div>

          <div style="background: #edf2f7; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="color: #2d3748; margin: 0 0 10px 0; font-weight: bold;">💡 Spaced Repetition Science:</p>
            <p style="color: #4a5568; margin: 0; font-size: 13px; line-height: 1.6;">
              You successfully reviewed these problems ${intervalDay} day(s) ago. Today's review will strengthen your memory and push the next review to ${getNextInterval(intervalDay)} days from now!
            </p>
          </div>

          <div class="footer">
            <p>This is part of your spaced repetition schedule from AlgoTracker.</p>
            <p>Consistency is the key to mastery! 🚀</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Get difficulty color for email display
 */
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "#48bb78";
    case "Medium":
      return "#ed8936";
    case "Hard":
      return "#f56565";
    default:
      return "#4a5568";
  }
};

/**
 * Get next interval for spaced repetition
 */
const getNextInterval = (currentDay) => {
  const currentIndex = INTERVALS.indexOf(currentDay);
  if (currentIndex >= 0 && currentIndex < INTERVALS.length - 1) {
    return INTERVALS[currentIndex + 1];
  }
  return INTERVALS[INTERVALS.length - 1];
};

/**
 * Get all users with problems due for notification today at specific intervals
 * This checks for problems that are due EXACTLY at 1, 3, 7, 15, 30, 60, or 120 day intervals
 */
const getUsersWithProblemsDue = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find all problems due today (nextRevisionDate is today)
    const problems = await Problem.find({
      nextRevisionDate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).populate("userId", "email name");

    // Group problems by user and calculate which interval they're at
    const userProblems = {};

    for (const problem of problems) {
      const userId = problem.userId._id.toString();

      if (!userProblems[userId]) {
        userProblems[userId] = {
          user: problem.userId,
          problems: [],
        };
      }

      // Calculate which interval this problem is at
      const intervalDay = INTERVALS[problem.revisionStage] || INTERVALS[0];

      // Check if we've already sent a notification for this problem at this interval
      const existingNotification = await Notification.findOne({
        problemId: problem._id,
        notificationDay: intervalDay,
      });

      if (!existingNotification) {
        userProblems[userId].problems.push({
          ...problem.toObject(),
          intervalDay,
        });
      }
    }

    return userProblems;
  } catch (error) {
    console.error("Error fetching users with problems due:", error);
    return {};
  }
};

/**
 * Send notification email to a user with interval information
 */
const sendNotificationEmail = async (user, problems) => {
  try {
    const transporter = createTransporter();

    // Get the interval day from the first problem (they should all have the same interval)
    const intervalDay = problems.length > 0 ? problems[0].intervalDay : 1;

    // Remove intervalDay from problems object for template
    const problemsForTemplate = problems.map((p) => {
      const { intervalDay, ...rest } = p;
      return rest;
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `📚 DSA Revision Reminder - ${intervalDay} Days Later (${problems.length} problem${problems.length > 1 ? "s" : ""})`,
      html: generateEmailTemplate(user.name, problemsForTemplate, intervalDay),
    };

    const result = await transporter.sendMail(mailOptions);

    // Track which notifications were sent
    for (const problem of problems) {
      try {
        const notification = new Notification({
          problemId: problem._id || problem.problemId,
          userId: user._id,
          notificationDay: problem.intervalDay || intervalDay,
          sentTo: user.email,
          status: "sent",
        });
        await notification.save();
      } catch (dbError) {
        console.error(
          `Failed to track notification for problem ${problem.title}:`,
          dbError,
        );
      }
    }

    console.log(
      `✓ Email sent to ${user.email} with ${problems.length} problem(s) at ${intervalDay}-day interval`,
    );
    return result;
  } catch (error) {
    console.error(`✗ Failed to send email to ${user.email}:`, error);

    // Track failed notification
    for (const problem of problems) {
      try {
        const notification = new Notification({
          problemId: problem._id || problem.problemId,
          userId: user._id,
          notificationDay: problem.intervalDay,
          sentTo: user.email,
          status: "failed",
          errorMessage: error.message,
        });
        await notification.save();
      } catch (dbError) {
        console.error(`Failed to track failed notification:`, dbError);
      }
    }

    throw error;
  }
};

/**
 * Send notifications to all users with problems due today at specific intervals
 * This is called by the cron job (every 30 minutes or hourly)
 */
const sendDailyNotifications = async () => {
  console.log("\n📧 Running interval-based notification task...");

  try {
    const userProblems = await getUsersWithProblemsDue();

    const userIds = Object.keys(userProblems);
    console.log(
      `Found ${userIds.length} user(s) with problems due for revision today`,
    );

    for (const userId of userIds) {
      const { user, problems } = userProblems[userId];
      if (problems.length > 0) {
        await sendNotificationEmail(user, problems);
      }
    }

    console.log("✓ Interval-based notifications completed\n");
  } catch (error) {
    console.error("✗ Error in interval-based notifications:", error);
  }
};

module.exports = {
  sendDailyNotifications,
  sendNotificationEmail,
  getUsersWithProblemsDue,
};
