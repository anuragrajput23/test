# AlgoTracker - API Endpoints Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Authentication Endpoints

### 1. Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 3. Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 📚 Problem Endpoints (Protected)

All problem endpoints require authentication.

### 1. Create Problem

```http
POST /problems
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Two Sum",
  "topic": "Arrays",
  "difficulty": "Easy",
  "solvedDate": "2024-01-15T10:30:00.000Z"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Problem added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy",
    "solvedDate": "2024-01-15T10:30:00.000Z",
    "revisionStage": 0,
    "nextRevisionDate": "2024-01-16T10:30:00.000Z",
    "revisionCount": 0,
    "failureCount": 0,
    "createdAt": "2024-01-15T11:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### 2. Get All Problems

```http
GET /problems
Authorization: Bearer <token>
```

**Query Parameters:**

- `topic` - Filter by topic (optional)
- `difficulty` - Filter by difficulty (optional)
- `sort` - Sort order (default: -createdAt)

**Example:**

```http
GET /problems?topic=Arrays&difficulty=Medium&sort=-revisionStage
```

**Response (200):**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Two Sum",
      "topic": "Arrays",
      "difficulty": "Easy",
      "revisionStage": 2,
      "nextRevisionDate": "2024-01-20T10:30:00.000Z",
      "lastReviewed": "2024-01-17T10:30:00.000Z",
      "revisionCount": 2,
      "failureCount": 0,
      "createdAt": "2024-01-15T11:30:00.000Z",
      "updatedAt": "2024-01-17T11:30:00.000Z"
    }
  ],
  "stats": {
    "total": 5,
    "byStage": {
      "0": 1,
      "1": 1,
      "2": 2,
      "3": 1,
      "4": 0,
      "5": 0,
      "6": 0
    },
    "byTopic": {
      "Arrays": 2,
      "Strings": 2,
      "Trees": 1
    },
    "byDifficulty": {
      "Easy": 2,
      "Medium": 2,
      "Hard": 1
    }
  }
}
```

---

### 3. Get Problems Due Today

```http
GET /problems/today
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "count": 3,
  "message": "You have 3 problem(s) to revise today",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Two Sum",
      "topic": "Arrays",
      "difficulty": "Easy",
      "revisionStage": 1,
      "nextRevisionDate": "2024-01-18T00:00:00.000Z",
      "revisionCount": 1,
      "failureCount": 0,
      "createdAt": "2024-01-15T11:30:00.000Z"
    }
  ]
}
```

---

### 4. Get Single Problem

```http
GET /problems/:id
Authorization: Bearer <token>
```

**Example:**

```http
GET /problems/507f1f77bcf86cd799439012
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy",
    "revisionStage": 2,
    "nextRevisionDate": "2024-01-20T10:30:00.000Z",
    "lastReviewed": "2024-01-17T10:30:00.000Z",
    "revisionCount": 2,
    "failureCount": 0,
    "createdAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### 5. Update Problem

```http
PUT /problems/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Two Sum - Updated",
  "topic": "Arrays",
  "difficulty": "Medium"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Problem updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Two Sum - Updated",
    "topic": "Arrays",
    "difficulty": "Medium",
    "updatedAt": "2024-01-17T12:00:00.000Z"
  }
}
```

---

### 6. Mark Problem as Revised/Failed

```http
PUT /problems/:id/revise
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "success"
}
```

**Parameters:**

- `status` - "success" (moved to next stage) or "failed" (reset to stage 0)

**Response (200) - Success:**

```json
{
  "success": true,
  "message": "Problem marked as revised successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Two Sum",
    "revisionStage": 3,
    "nextRevisionDate": "2024-01-30T10:30:00.000Z",
    "lastReviewed": "2024-01-18T10:30:00.000Z",
    "revisionCount": 3,
    "failureCount": 0,
    "updatedAt": "2024-01-18T10:30:00.000Z"
  }
}
```

**Response (200) - Failed:**

```json
{
  "success": true,
  "message": "Problem marked as failed successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Two Sum",
    "revisionStage": 0,
    "nextRevisionDate": "2024-01-19T10:30:00.000Z",
    "lastReviewed": "2024-01-18T10:30:00.000Z",
    "revisionCount": 3,
    "failureCount": 1,
    "updatedAt": "2024-01-18T10:30:00.000Z"
  }
}
```

---

### 7. Delete Problem

```http
DELETE /problems/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Problem deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Two Sum"
  }
}
```

---

### 8. Get Revision Statistics

```http
GET /problems/stats/overview
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "totalProblems": 5,
    "completedStages": 1,
    "averageRevisions": "2.40",
    "totalFailures": 2,
    "byStage": {
      "0": 1,
      "1": 1,
      "2": 1,
      "3": 1,
      "4": 0,
      "5": 0,
      "6": 1
    },
    "byTopic": {
      "Arrays": 2,
      "Strings": 1,
      "Trees": 1,
      "Graphs": 1
    },
    "byDifficulty": {
      "Easy": 2,
      "Medium": 2,
      "Hard": 1
    }
  }
}
```

---

## 🔄 Spaced Repetition Intervals

When a problem is revised successfully, it progresses through stages:

| Stage | Days Until Next Revision |
| ----- | ------------------------ |
| 0→1   | 1 day                    |
| 1→2   | 3 days                   |
| 2→3   | 7 days                   |
| 3→4   | 15 days                  |
| 4→5   | 30 days                  |
| 5→6   | 60 days                  |
| 6→∞   | 120 days (stays at 120)  |

If a problem is marked as "failed", it resets to stage 0 (1 day interval).

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Title must be between 3 and 200 characters",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Problem not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error creating problem",
  "error": "Connection error details..."
}
```

---

## 🧪 Testing the API

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Problem:**

```bash
curl -X POST http://localhost:5000/api/problems \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy"
  }'
```

**Get Today's Problems:**

```bash
curl -X GET http://localhost:5000/api/problems/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📝 Valid Values

### Topics

- Arrays
- Strings
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Dynamic Programming
- Greedy
- Sorting
- Searching
- Hashing
- Math
- Other

### Difficulty

- Easy
- Medium
- Hard
