# 🧠 Spaced Repetition System & Backend Architecture

## Overview

The **AlgoTracker** uses a scientifically-backed **Spaced Repetition** algorithm to optimize problem recall and learning efficiency. This document explains how the system works at the backend level.

---

## 📊 Spaced Repetition Concept

Spaced repetition is backed by cognitive psychology research (Ebbinghaus Forgetting Curve). The idea is simple:

- **Review problems at increasing intervals** to maximize retention
- **Problems you struggle with reset to Day 1**
- **Problems you master stay at long intervals (120 days)**

### The Intervals

```
Stage 0 → 1 day     (First review)
Stage 1 → 3 days    (Confident about it?)
Stage 2 → 7 days    (Getting stable)
Stage 3 → 15 days   (Mostly retained)
Stage 4 → 30 days   (Very solid)
Stage 5 → 60 days   (Excellent retention)
Stage 6 → 120 days  (Long-term memory)
```

---

## 🔄 Problem Lifecycle

### 1. **Problem Created (Day 0)**

```
User adds: "Two Sum - Arrays - Easy"
    ↓
Initial State:
- revisionStage: 0
- nextRevisionDate: Today + 1 day
- lastReviewed: null
- revisionCount: 0
- failureCount: 0
```

### 2. **First Review (Day 1)**

User reviews the problem after 1 day.

#### Scenario A: User remembers ✅

```javascript
problem.markAsRevised();
// Result:
- revisionStage: 0 → 1
- nextRevisionDate: Today + 3 days
- lastReviewed: Today
- revisionCount: 1
- failureCount: 0
```

#### Scenario B: User forgot ❌

```javascript
problem.markAsFailed();
// Result:
- revisionStage: 0 → 0 (reset!)
- nextRevisionDate: Today + 1 day (restart)
- lastReviewed: Today
- revisionCount: 1
- failureCount: 1
```

### 3. **Progression After Multiple Revisions**

**Timeline for a problem user keeps remembering:**

```
Day 1: Review (Stage 0→1) → Next due: Day 4
Day 4: Review (Stage 1→2) → Next due: Day 11
Day 11: Review (Stage 2→3) → Next due: Day 26
Day 26: Review (Stage 3→4) → Next due: Day 56
...
Eventually: Review (Stage 5→6) → Next due: Day 176 (120-day interval)
```

**If user fails on Day 4:**

```
Day 1: Review (Stage 0→1) → Next due: Day 4
Day 4: FAILED (Stage 1→0) ← Reset to beginning!
       → Next due: Day 5
Day 5: Review (Stage 0→1) → Next due: Day 8
```

---

## 💾 Database Schema

### Problem Document

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to User
  title: String,              // e.g., "Two Sum"
  topic: String,              // e.g., "Arrays"
  difficulty: String,         // Easy, Medium, Hard
  solvedDate: Date,           // When user first solved it

  // Spaced Repetition Fields
  revisionStage: Number,      // 0-6 (tracks progress)
  nextRevisionDate: Date,     // When to revise next
  lastReviewed: Date,         // Last review timestamp
  revisionCount: Number,      // Total successful reviews
  failureCount: Number,       // How many times they forgot

  // Metadata
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Key Algorithms

### 1. Calculate Next Revision Date

```javascript
// File: models/Problem.js
calculateNextRevisionDate(stage) {
  const intervals = [1, 3, 7, 15, 30, 60, 120];
  const daysToAdd = intervals[Math.min(stage, 6)];

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
}
```

### 2. Mark as Revised (Success)

```javascript
markAsRevised() {
  this.lastReviewed = new Date();
  this.revisionCount += 1;

  if (this.revisionStage < 6) {
    this.revisionStage += 1;  // Progress to next stage
  }

  this.nextRevisionDate = this.calculateNextRevisionDate(this.revisionStage);
  return this;
}
```

### 3. Mark as Failed

```javascript
markAsFailed() {
  this.lastReviewed = new Date();
  this.failureCount += 1;

  this.revisionStage = 0;  // Reset to stage 0
  this.nextRevisionDate = this.calculateNextRevisionDate(0);
  return this;
}
```

### 4. Get Today's Problems

```javascript
// File: controllers/problemController.js
getProblemsForToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);     // Start of day

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Find problems where: today ≤ nextRevisionDate < tomorrow
  return Problem.find({
    userId: userId,
    nextRevisionDate: {
      $gte: today,
      $lt: tomorrow
    }
  });
}
```

---

## 📡 API Endpoints for Spaced Repetition

### Get Problems Due Today

```http
GET /api/problems/today
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 3,
  "message": "You have 3 problem(s) to revise today",
  "data": [
    {
      "title": "Two Sum",
      "topic": "Arrays",
      "revisionStage": 2,
      "nextRevisionDate": "2024-01-18T00:00:00.000Z"
    }
  ]
}
```

### Mark Problem as Revised

```http
PUT /api/problems/:id/revise
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "success"
}

Response:
{
  "revisionStage": 3,
  "nextRevisionDate": "2024-01-30T10:30:00.000Z",
  "lastReviewed": "2024-01-18T10:30:00.000Z",
  "revisionCount": 3
}
```

### Get Revision Statistics

```http
GET /api/problems/stats/overview
Authorization: Bearer <token>

Response:
{
  "totalProblems": 10,
  "completedStages": 2,      // Problems at stage 6
  "averageRevisions": "3.50", // Avg reviews per problem
  "totalFailures": 5,        // Total failures across all
  "byStage": {
    "0": 2,  // 2 problems waiting for first review
    "1": 3,
    "2": 2,
    "3": 1,
    "4": 0,
    "5": 0,
    "6": 2   // Mastered
  }
}
```

---

## 🔐 Data Privacy & Isolation

**Critical:** Each user only sees their own problems.

```javascript
// In all controllers, userId is extracted from JWT token
const userId = req.user.id;

// Query includes userId filter
const problems = await Problem.find({
  userId, // ← Prevents cross-user access
  nextRevisionDate: { $gte: today, $lt: tomorrow },
});
```

This is enforced in the `protect` middleware:

```javascript
// middleware/auth.js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id); // Attach user to request
```

---

## 📈 Example Progression

User "Alice" adds problem "Longest Substring Without Repeating Characters":

```
Timeline:
─────────────────────────────────────────────────────

Day 1:  ADD PROBLEM
        Stage: 0
        Next Review: Day 2

Day 2:  REVIEW ✅
        Stage: 0 → 1
        Next Review: Day 5

Day 5:  REVIEW ✅
        Stage: 1 → 2
        Next Review: Day 12

Day 12: REVIEW ❌ (Oops, forgot!)
        Stage: 2 → 0 (RESET!)
        Next Review: Day 13

Day 13: REVIEW ✅
        Stage: 0 → 1
        Next Review: Day 16

Day 16: REVIEW ✅
        Stage: 1 → 2
        Next Review: Day 23

...continues until Stage 6...

Eventually: MASTERED
        Stage: 6
        Next Review: 120 days later
```

---

## 🚀 Performance Considerations

1. **Index on nextRevisionDate**: For fast queries on "problems due today"

   ```javascript
   // Recommended MongoDB index
   db.problems.createIndex({ userId: 1, nextRevisionDate: 1 });
   ```

2. **Pagination**: For users with 1000+ problems

   ```
   GET /api/problems?page=1&limit=50
   ```

3. **Caching**: "Problems due today" can be cached (expires at midnight)

---

## 🎓 Educational Value

This system implements the **SM-2 Algorithm** (Supermemo) concepts:

- **Spacing Effect**: Repeated review of material is more effective
- **Optimal Forgetting**: Review just as you're about to forget
- **Difficulty Tracking**: Harder problems get different intervals (future enhancement)

Research shows spaced repetition can **5-10x** improve retention compared to cramming!

---

## 🔮 Future Enhancements

1. **Difficulty-based intervals**: Hard problems reviewed more frequently
2. **Confidence scoring**: Users rate confidence (1-5 stars)
3. **Statistics dashboard**: Show forgetting curves
4. **Adaptive intervals**: AI adjusts intervals based on performance
5. **Streak tracking**: Consecutive days of revision

---

**Status**: ✅ Spaced Repetition System fully implemented and documented!
