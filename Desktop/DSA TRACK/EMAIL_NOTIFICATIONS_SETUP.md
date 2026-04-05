# 📧 Email Notifications Setup Guide

## How Email Notifications Work

Your **AlgoTracker** can send you **daily email reminders** about which problems you should revise! Here's how to set it up:

### ⏰ Schedule

- **9:00 AM** - Morning reminder (when you start your day)
- **6:00 PM** - Evening reminder (optional, helps you plan next day)

### 📬 What You'll Receive

An email containing:

- ✅ Number of problems to revise today
- 📚 List of all problems with topic, difficulty, and revision stage
- 🎯 Direct link to your dashboard to start revising
- 💡 Spaced repetition tips

---

## Setup Instructions

### Option 1: Using Gmail (Recommended)

#### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"2-Step Verification"**
3. Follow instructions to enable it

#### Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"App passwords"** (appears after enabling 2FA)
3. Select: Device = **Windows Computer**, App = **Mail**
4. Google will generate a **16-character password**
5. Copy this password

#### Step 3: Update Your .env File

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-character app password (without spaces)
```

**Example:**

```bash
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

---

### Option 2: Using Other Email Services

#### Outlook/Hotmail

```bash
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

#### Yahoo Mail

```bash
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

#### Custom SMTP Server

```bash
EMAIL_HOST=your.smtp.host
EMAIL_PORT=587  # or 465 for secure connection
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
```

---

## Testing Email Setup

### Method 1: Check Backend Logs

When the server starts (9:00 AM), watch the backend terminal. You should see:

```
[CRON JOB] Triggered daily notification task
📧 Running daily notification task...
Found X user(s) with problems to revise today
✓ Email sent to your_email@gmail.com
✓ Daily notifications completed
```

### Method 2: Trigger Manually (for testing)

Edit `services/cronJobs.js` to run at a time close to now:

```javascript
// Change the time to test (e.g., 5 mins from now)
const dailyNotificationJob = cron.schedule("45 14 * * *", async () => {
  // Runs at 2:45 PM daily (example)
```

Then restart the backend and check if you receive an email.

---

## Common Issues & Solutions

### ❌ Email Not Sending?

**1. "SMTP Error: Could not connect"**

- ✅ Check EMAIL_HOST and EMAIL_PORT are correct
- ✅ Ensure firewall/antivirus allows outbound port 587
- ✅ Check internet connection

**2. "Authentication failed"**

- ✅ Verify EMAIL_USER and EMAIL_PASS are correct
- ✅ For Gmail: Use App Password, not your main password
- ✅ Ensure 2FA is enabled on Gmail account

**3. "Email received but empty/broken formatting"**

- ✅ Check email client supports HTML emails
- ✅ Verify FRONTEND_URL in .env is correct (links might be broken)

### ❌ Cron Job Not Running?

**Check 1: Server Started?**

- Verify backend shows "Initializing background jobs..." on startup
- Should show "✓ Daily notification scheduled for 9:00 AM every day"

**Check 2: Correct Time Zone?**

- Cron jobs run in server's local time
- If server is in different timezone, adjust times accordingly
- Use a cron time converter: https://crontab.guru/

**Check 3: MongoDB Connected?**

- Email fetching requires database access
- Check: `✓ MongoDB connected: ...` in logs

---

## Email Template Preview

### When You Have Problems to Revise:

```
┌─────────────────────────────────────────┐
│ 📚 Your DSA Revision for Today          │
│ You have 3 problem(s) to revise today   │
├─────────────────────────────────────────┤
│ Hi John!                                │
│                                         │
│ Here are the problems you should       │
│ review today:                           │
│                                         │
│ 📝 Two Sum                              │
│ Topic: Arrays | Difficulty: Easy        │
│ Stage: 2/7 | Reviewed: 5 times          │
│                                         │
│ 📝 Longest Substring Without Repeats   │
│ Topic: Strings | Difficulty: Medium     │
│ Stage: 1/7 | Reviewed: 2 times          │
│                                         │
│ 📝 Binary Tree Level Order Traversal   │
│ Topic: Trees | Difficulty: Medium       │
│ Stage: 3/7 | Reviewed: 3 times          │
│                                         │
│ [Review Now]                            │
└─────────────────────────────────────────┘
```

### When You Have No Problems to Revise:

```
┌─────────────────────────────────────────┐
│ 🎉 Great Job, John!                     │
├─────────────────────────────────────────┤
│ You don't have any problems to revise   │
│ today. Keep up the excellent work!      │
│                                         │
│ [Visit Dashboard]                       │
└─────────────────────────────────────────┘
```

---

## Customizing Notification Times

Edit `services/cronJobs.js` to change notification times:

```javascript
// Current schedule:
// "0 9 * * *"   = 9:00 AM
// "0 18 * * *"  = 6:00 PM

// Other examples:
// "0 7 * * *"   = 7:00 AM
// "0 12 * * *"  = 12:00 PM (noon)
// "0 20 * * *"  = 8:00 PM
// "0 6 * * 1-5" = 6:00 AM, Mon-Fri only (weekdays)

// Format: "minute hour day month day-of-week"
// Minute: 0-59
// Hour: 0-23 (24-hour format)
// Day: 1-31
// Month: 1-12
// Day-of-week: 0-7 (0 = Sunday)
```

Help: https://crontab.guru/

---

## Backend File Structure

```
backend/
├── services/
│   ├── notificationService.js  ← Email formating & sending
│   └── cronJobs.js             ← Schedule daily tasks
├── server.js                    ← Initialize cron on startup
└── .env                         ← Email configuration
```

---

## Summary

✅ **What's Set Up:**

- **notificationService.js** - Sends beautiful HTML emails
- **cronJobs.js** - Runs daily at 9 AM and 6 PM
- **server.js** - Initializes cron jobs on startup

**All you need to do:**

1. Update `.env` with your email credentials
2. Restart backend server
3. Wait for 9:00 AM (or test time) and receive email!

🎉 Now you'll never forget to revise your DSA problems!
