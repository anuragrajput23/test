# 📬 Interval-Based Email Notifications Guide

## ✨ What's New

Your **AlgoTracker** now sends **smart, interval-based notifications** at the exact spaced repetition intervals (1, 3, 7, 15, 30, 60, 120 days) instead of a single daily email!

---

## 🎯 How It Works

### Timeline Example: "Longest Palindromic Substring" Problem

```
Day 0 (Apr 5)
├─ You solve the problem ✅
├─ It gets Stage 0
└─ Next revision scheduled: Apr 6 (1 day later)

Day 1 (Apr 6)
├─ ✉️ EMAIL NOTIFICATION arrives!
│  └─ Subject: "📚 DSA Revision Reminder - 1 Days Later (1 problem #1)"
│  └─ Problem displayed with: [#1] Longest Palindromic Substring
├─ You click "Mark as Revised" on app
├─ Problem advances to Stage 1 ✅
└─ Next revision scheduled: Apr 9 (3 days later)

Day 3 (Apr 9)
├─ ✉️ EMAIL NOTIFICATION arrives!
│  └─ Subject: "📚 DSA Revision Reminder - 3 Days Later (1 problem #1)"
│  └─ Problem displayed with problem number
├─ You review and mark as revised
├─ Problem advances to Stage 2 ✅
└─ Next revision scheduled: Apr 16 (7 days later)

Day 7 (Apr 16)
├─ ✉️ EMAIL NOTIFICATION arrives!
│  └─ Subject: "📚 DSA Revision Reminder - 7 Days Later (1 problem #1)"
├─ You review and mark as revised
├─ Problem advances to Stage 3 ✅
└─ Next revision scheduled: May 1 (15 days later)

[Pattern continues for 15, 30, 60, 120 days...]
```

---

## 📊 What You'll Receive in Each Email

### Email Header:

```
Subject: 📚 DSA Revision Reminder - 7 Days Later (2 problems)
```

### Email Content Example:

```
┌─────────────────────────────────────────────────────────────┐
│ 📚 DSA Revision Reminder - 7 Days Later                     │
│ You have 2 problem(s) due for revision today!               │
│ 🎯 7-Day Interval                                           │
├─────────────────────────────────────────────────────────────┤
│ Hi John,                                                     │
│                                                             │
│ Time to review! According to the spaced repetition          │
│ schedule, here are the problems scheduled for today:        │
│                                                             │
│ [#1] Longest Palindromic Substring                          │
│ 📂 Topic: Strings | ⚡ Difficulty: Medium                   │
│ 📊 Progress: Stage 2/7 | 🔄 Reviewed: 2 times              │
│ ❌ Failed: 0 times                                           │
│                                                             │
│ [#2] Two Sum                                                │
│ 📂 Topic: Arrays | ⚡ Difficulty: Easy                      │
│ 📊 Progress: Stage 3/7 | 🔄 Reviewed: 3 times              │
│ ❌ Failed: 0 times                                           │
│                                                             │
│ [✓ Mark as Revised] button                                  │
│                                                             │
│ 💡 Spaced Repetition Science:                               │
│ You successfully reviewed these problems 7 day(s) ago.      │
│ Today's review will strengthen your memory and push the     │
│ next review to 15 days from now!                            │
└─────────────────────────────────────────────────────────────┘
```

### Key Features in Each Email:

- ✅ **Problem Numbers** (#1, #2, etc.) - Identify which problem you're reviewing
- 📅 **Interval Information** - How many days since you last reviewed
- 🎯 **Next Interval** - Shows you'll next review in (e.g., 15 days)
- 📊 **Progress Tracking** - Stage, revision count, failure count
- 🔗 **Direct Link** - Click to go straight to dashboard
- 💡 **Learning Tips** - Explanation of why you're reviewing now

---

## ⏰ Notification Schedule

The system checks **every 30 minutes** for problems due for notification:

```
12:00 AM ─┬─ Check for problems (1, 3, 7, 15, 30, 60, 120 days old)
          │
12:30 AM ─┤ Check for problems
          │
1:00 AM  ─┤ Check for problems
          │
... (continues throughout the day)
          │
11:30 PM ─┘ Check for problems
```

**_Why every 30 minutes?_**

- Catches exact day intervals regardless of when user solved the problem
- If user solves problem at 3 PM on Day 1, notification arrives on Day 2 (when they reach Day 2)
- No "daily window" - covers all times of day

---

## 🔒 Smart Notification Tracking

The system never sends duplicate notifications:

```
Database tracks:
┌──────────────────────────────────────────┐
│ Notification Record                      │
├──────────────────────────────────────────┤
│ problemId: 634f8a...                     │
│ userId: 634f8b...                        │
│ notificationDay: 7  (sent at 7-day mark) │
│ sentAt: Apr 16, 2026                     │
│ sentTo: john@gmail.com                   │
│ status: "sent" ✓                         │
└──────────────────────────────────────────┘

Next time interval-based job runs:
│
├─ Finds problem due: "Longest Palindromic Substring"
├─ Checks: "Have we sent notification for this problem
│           at the 7-day interval?"
├─ Database says: "YES - sent on Apr 16"
└─ Result: "SKIP - don't send duplicate"
```

---

## 📧 Email Configuration (Same as Before)

### Gmail Setup:

Update your `.env` file:

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-char App Password
FRONTEND_URL=http://localhost:3000
```

### Other Email Providers:

- **Outlook:** smtp-mail.outlook.com:587
- **Yahoo:** smtp.mail.yahoo.com:587
- **Custom SMTP:** your.smtp.host:port

---

## 🚀 How to Use

### 1. Setup Email (First Time Only)

Follow the [EMAIL_NOTIFICATIONS_SETUP.md](./EMAIL_NOTIFICATIONS_SETUP.md) guide

### 2. Create a Problem

- Go to "Add Problem" page
- Enter: Title, Topic, Difficulty
- Click "Add Problem"
- Problem gets Stage 0, nextRevisionDate = Tomorrow

### 3. Wait (or Test)

- **Real:** Wait 1, 3, 7, 15, 30, 60, or 120 days to get notifications
- **Testing:** Change the problem's currentDate to trigger notifications sooner

### 4. Receive Emails

- Email arrives when nextRevisionDate = Today
- Email shows problem #number
- Shows interval information (e.g., "7 Days Later")

### 5. Review in App

- Click "Review Now" link in email OR
- Go to dashboard
- Click "✓ Revised" or "✗ Failed"
- System schedules next notification

---

## 📈 Spaced Repetition Timeline

```
Stage 0 → (1 day) → Email #1: "1 Days Later"
                ↓ Mark Revised
Stage 1 → (3 days) → Email #2: "3 Days Later"
                ↓ Mark Revised
Stage 2 → (7 days) → Email #3: "7 Days Later"
                ↓ Mark Revised
Stage 3 → (15 days) → Email #4: "15 Days Later"
                ↓ Mark Revised
Stage 4 → (30 days) → Email #5: "30 Days Later"
                ↓ Mark Revised
Stage 5 → (60 days) → Email #6: "60 Days Later"
                ↓ Mark Revised
Stage 6 → (120 days) → Email #7: "120 Days Later"
                ↓ Mark Revised
MASTERED ✅ (stop sending, you've learned it!)
```

---

## 🐛 Troubleshooting

### ❌ Not Receiving Emails?

**Check 1: MongoDB Connected?**

```bash
# Backend should show: ✓ MongoDB connected: cluster0.vwlmdjx...
```

**Check 2: Email Config Correct?**

```bash
# In .env, verify:
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=correct_app_password
```

**Check 3: Problem Created?**

- Problem must exist with nextRevisionDate = Today

**Check 4:Notification Already Sent?**

- Check Notifications collection in MongoDB
- If status="sent", notification already sent (won't send again)

**Check 5: Cron Job Running?**

- Backend logs should show: `✓ Interval-based notifications scheduled (every 30 minutes)`

### ❌ Email Authentication Failed?

For Gmail:

1. Enable 2FA on your Google Account
2. Generate new App Password
3. Update `.env` with new password

### ❌ Wrong Email Format?

The system might be catching exceptions silently:

1. Check backend terminal for error messages
2. Check MongoDB Notification collection for failed records

---

## 📊 Monitoring Notifications

### View Sent Notifications:

```javascript
// Check which notifications have been sent
db.notifications.find({ status: "sent" })

// Result:
[
  {
    _id: ObjectId(...),
    problemId: ObjectId(...),
    userId: ObjectId(...),
    notificationDay: 1,
    sentAt: ISODate("2026-04-06T14:30:00Z"),
    sentTo: "john@gmail.com",
    status: "sent"
  },
  {
    _id: ObjectId(...),
    problemId: ObjectId(...),
    userId: ObjectId(...),
    notificationDay: 3,
    sentAt: ISODate("2026-04-09T08:15:00Z"),
    sentTo: "john@gmail.com",
    status: "sent"
  }
]
```

### View Failed Notifications:

```javascript
db.notifications.find({ status: "failed" });
```

---

## 🎉 Summary

✅ **What's Happening Behind the Scenes:**

1. Every 30 minutes, backend checks MongoDB
2. Finds all problems where nextRevisionDate = Today
3. For each problem:
   - Calculate which interval it's at (1, 3, 7, 15, 30, 60, 120 days)
   - Check if we already sent notification for this interval
   - If NOT sent yet → Send beautiful email with problem #number
   - Track notification in database
4. User receives email → Reviews problem → Marks as revised → Next notification in X days

✅ **Benefits:**

- Never miss a revision (notifications arrive exactly on time)
- Smart tracking prevents duplicate emails
- Problem numbers help you organize
- Interval information teaches you about spaced repetition
- Personalized for each user

🎯 **You're all set!** Your notifications will start automatically. 🚀
