# 📚 AlgoTracker - How It Works (Detailed Explanation)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      YOUR BROWSER                            │
│         (React Frontend - Vite Dev Server :3000)             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Pages: Login → Signup → Dashboard → All Problems      │  │
│  │  Components: Header, ProblemCard, Statistics           │  │
│  │  State: AuthContext (handles user & JWT token)         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ API Calls (HTTP Requests)
                           │ Axios with JWT interceptors
                           ↓
┌──────────────────────────────────────────────────────────────┐
│              EXPRESS BACKEND (Node.js :5000)                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Routes:                                               │  │
│  │  - /api/auth (register, login, getMe)                 │  │
│  │  - /api/problems (CRUD, revise, stats)                │  │
│  │                                                         │  │
│  │  Middleware:                                           │  │
│  │  - JWT verification (protect routes)                  │  │
│  │  - Input validation                                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ Database Queries
                           │ Mongoose ODM
                           ↓
┌──────────────────────────────────────────────────────────────┐
│           MONGODB ATLAS (Cloud Database)                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Collections:                                          │  │
│  │  - users (name, email, password hash)                 │  │
│  │  - problems (DSA problems with spaced repetition)      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ USER AUTHENTICATION (How Sign Up & Login Work)

### Sign Up Flow:

```
User → Enters Name, Email, Password, Confirm Password
       ↓
Frontend → Validates:
  - Email format (looks like email)
  - Password min 6 characters
  - Passwords match
       ↓
Frontend → Sends POST to /api/auth/register
       ↓
Backend → Receives request:
  - Validates again (double-check)
  - Checks if email already exists
  - If valid → Hash password using bcrypt (not stored as plain text!)
  - Store in MongoDB: { name, email, hashedPassword }
       ↓
Backend → Returns: { token: "JWT_TOKEN", user: { id, name, email } }
       ↓
Frontend → Stores token in localStorage
         → Stores user in AuthContext
         → Redirects to Dashboard
```

### Login Flow:

```
User → Enters Email, Password
       ↓
Frontend → Sends POST to /api/auth/login
       ↓
Backend → Looks up user by email
        → Compares entered password with hashed password using bcrypt
        → If match → Generate JWT token
        → Return token + user data
       ↓
Frontend → Stores token + redirects to Dashboard
```

### What is JWT (JSON Web Token)?

- A **secure token** that contains encrypted user information
- When you log in, you get a token that says "This is John (user_id=123), and I verified it"
- Included in every API request header: `Authorization: Bearer <token>`
- Backend verifies the token before allowing access to protected routes
- Token expires after 7 days (based on JWT_EXPIRE in .env)

### What is Bcrypt?

- A **password hashing algorithm** - makes passwords unreadable even if database is hacked
- When you create password "Goldenindia@1320", it becomes something like: `$2b$10$9QULzrKfCzN...` (unrecognizable)
- When you log in, compares your entered password with the stored hash
- If hashes match → login successful

---

## 2️⃣ SPACED REPETITION ALGORITHM (The Core Feature)

### What is Spaced Repetition?

A scientifically-proven learning technique where:

- You review material at **increasing intervals**
- Each successful review → larger next interval
- Failed review → restart from day 1
- Goal: Remember something forever with minimum effort

### The 7-Stage System:

| Stage | Interval | Meaning                                 |
| ----- | -------- | --------------------------------------- |
| 0     | 1 day    | Just learned - review tomorrow          |
| 1     | 3 days   | Remembered well - review in 3 days      |
| 2     | 7 days   | Solid recall - review in 1 week         |
| 3     | 15 days  | Getting comfortable - review in 2 weeks |
| 4     | 30 days  | Strong memory - review in 1 month       |
| 5     | 60 days  | Very strong - review in 2 months        |
| 6     | 120 days | Mastered - review in 4 months           |

### Example: Learning a Problem "Longest Palindromic Substring"

**Day 1:** You solve it, it gets **Stage 0**

- `nextRevisionDate = Today + 1 day = April 6`

**April 6:** You review it, remember it perfectly → Mark as **"Revised"**

- `revisionStage: 0 → 1`, `revisionCount: 1`
- `nextRevisionDate = Today + 3 days = April 9`

**April 9:** Review again, remember → Mark as **"Revised"**

- `revisionStage: 1 → 2`, `revisionCount: 2`
- `nextRevisionDate = Today + 7 days = April 16`

**April 16:** Review, but you **forgot** → Mark as **"Failed"**

- `revisionStage: 2 → 0` (reset to beginning!)
- `failureCount: 1`
- `nextRevisionDate = Today + 1 day = April 17` (start over)

**April 17:** Review again, remember → Mark as "Revised"

- Back to Stage 1 (catching up)
- This time you'll likely succeed more

### Database Model (Problem):

```javascript
{
  _id: ObjectId("634f8a..."),
  userId: ObjectId("634f8a..."),  // Which user owns this

  // Problem info
  title: "Longest Palindromic Substring",
  topic: "Strings",
  difficulty: "Medium",
  solvedDate: Date("2026-04-05"),

  // Spaced repetition tracking
  revisionStage: 2,              // 0-6 (which interval)
  nextRevisionDate: Date("2026-04-16"),  // Review on this date
  lastReviewed: Date("2026-04-09"),
  revisionCount: 2,              // Successful reviews
  failureCount: 0,               // Times they forgot

  timestamps...
}
```

### How the Dashboard Shows "Today's Problems":

The Dashboard queries for problems where:

```
TODAY ≤ nextRevisionDate < TOMORROW
```

So on April 9, 2026:

- Shows all problems with `nextRevisionDate = April 9`
- These are problems you should review today
- Clicking "✓ Revised" → moves to Stage 1, schedules for April 12
- Clicking "✗ Failed" → resets to Stage 0, schedules for April 10

---

## 3️⃣ PROTECTED ROUTES (How Backend Keeps Your Data Safe)

Each API endpoint is protected with **JWT verification**:

```javascript
// When you send a request:
POST /api/problems  +  Authorization: Bearer eyJhbGc...
                                       (your JWT token)
                    ↓
Backend -> Extracts token from header
        -> Verifies token using JWT_SECRET
        -> If valid → Attaches user info to request
                     Allows the request to proceed
        -> If invalid → Returns 401 error
                        Redirects you to login

// Example: Creating a problem
POST /api/problems
{
  "title": "Two Sum",
  "topic": "Arrays",
  "difficulty": "Easy"
}
↓
Backend -> Checks JWT token ✓
        -> Extracts userId from token (knows it's John)
        -> Creates problem and sets userId = John's ID
        -> Saves to MongoDB
        → Only John can see his own problems!
```

---

## 4️⃣ FRONTEND STATE MANAGEMENT (AuthContext)

All pages use **React Context API** for global state:

```javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email }
  const [token, setToken] = useState(null); // JWT token
  const [isAuthenticated, setIsAuthenticated] = false; // true/false
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    // POST to /api/auth/login
    // Sets token + user
    // Stores in localStorage (persists across page reloads)
  };

  const logout = () => {
    // Clears token + user + localStorage
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

**Why use Context?**

- **Avoid prop drilling**: Every component can access `useAuth()` hook
- **Singleton pattern**: One source of truth for user state
- **Persistence**: localStorage stores token across browser sessions

---

## 5️⃣ API REQUEST FLOW (Axios Interceptors)

Every API request goes through **interceptors** (middleware):

```javascript
// Request interceptor (before sending)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to header
  }
  return config;
});

// Response interceptor (after receiving)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token"); // Token expired
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  },
);
```

**Flow:**

```
Frontend Component → API Call
    ↓
Request Interceptor → Add JWT token to header
    ↓
Backend → Verify token → Process request
    ↓
Backend Returns Response
    ↓
Response Interceptor → Check if 401 (unauthorized)
                    → If 401 → Logout user + redirect to /login
                    → Else → Return response to component
    ↓
Component Updates UI with data
```

---

## 6️⃣ ROUTING (How Pages Switch)

Frontend uses **React Router**:

```javascript
<BrowserRouter>
  <AuthProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-problems" element={<AllProblems />} />
        <Route path="/add-problem" element={<AddProblem />} />
      </Route>
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

**ProtectedRoute:**

```javascript
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
```

If you try to access `/dashboard` without logging in:

- `isAuthenticated = false`
- React redirects you to `/login`

---

## 7️⃣ DATA FLOW EXAMPLES

### Example 1: Creating a Problem

```
User on AddProblem page
  ↓
Types: "Two Sum", topic="Arrays", difficulty="Easy", date=today
  ↓
Clicks "Add Problem" button
  ↓
Frontend validates (title required, topic selected, etc.)
  ↓
POST /api/problems
Headers: { Authorization: "Bearer <token>" }
Body: {
  title: "Two Sum",
  topic: "Arrays",
  difficulty: "Easy",
  solvedDate: "2026-04-05"
}
  ↓
Backend middleware (auth.js) checks JWT ✓
Backend validates input ✓
Backend creates Problem:
  - userId = extracted from JWT (John's ID)
  - revisionStage = 0
  - nextRevisionDate = today + 1 day
  - Saves to MongoDB
  ↓
Returns: { success: true, problem: {...} }
  ↓
Frontend adds to local state
Shows "✓ Problem added successfully!"
Redirects to Dashboard
```

### Example 2: Reviewing a Problem

```
User on Dashboard sees problem "Two Sum" with nextRevisionDate = today
  ↓
Clicks "✓ Mark as Revised" button
  ↓
PUT /api/problems/634f8a.../revise
Headers: { Authorization: "Bearer <token>" }
Body: { success: true }  // true = revised, false = failed
  ↓
Backend finds problem where:
  - _id = 634f8a...
  - userId = extracted from JWT (must match!)
  ↓
Backend calls problem.markAsRevised():
  - revisionCount += 1
  - revisionStage: 0 → 1
  - nextRevisionDate = today + 3 days
  - lastReviewed = now
  - Saves to MongoDB
  ↓
Returns updated problem
  ↓
Frontend updates UI:
  - Removes from today's list
  - Shows "Review on April 8"
  - Updates statistics (total revised++)
```

### Example 3: Getting Statistics

```
User on Dashboard
  ↓
Frontend loads statistics:
GET /api/problems/stats/overview
Headers: { Authorization: "Bearer <token>" }
  ↓
Backend finds ALL problems where userId = JWT user
  ↓
Calculates:
- Total: 45
- Mastered (stage 6): 15
- Average revisions: 3.2
- Total failures: 5
  ↓
Groups by stage: { 0: 5, 1: 3, 2: 8, 3: 12, 4: 10, 5: 5, 6: 2 }
Groups by topic: { Arrays: 10, Strings: 8, ... }
  ↓
Returns: { total: 45, mastered: 15, stats: {...} }
  ↓
Frontend displays in Statistics component:
Progress bar (33.3% mastered)
Stage distribution bars
Topic breakdown
```

---

## 8️⃣ SECURITY FEATURES

### 1. Password Hashing (Bcrypt)

- Passwords are hashed before storage
- Even if database is hacked, passwords are unreadable
- Each password has a unique salt (random value)

### 2. JWT Authentication

- Token expires after 7 days
- Backend verifies token on every protected request
- Invalid tokens are rejected with 401 error

### 3. User Data Isolation

- Backend always checks `userId` matches JWT token
- You can only see YOUR problems
- Can't access other users' data even if you know their IDs

### 4. Input Validation

- Email format validation
- Password minimum length (6 chars)
- Problem fields checked (title, topic, difficulty)
- SQL injection/attacks prevented by Mongoose

### 5. CORS (Cross-Origin Resource Sharing)

- Frontend (:3000) can only access Backend (:5000)
- Other domains are blocked
- Prevents unauthorized cross-domain requests

---

## 9️⃣ MONITORING & DEBUGGING

### Check Backend Status:

```bash
curl http://localhost:5000/api/health
```

Returns: `{ success: true, message: "Server is running" }`

### Check MongoDB Connection:

- If backend starts without error, MongoDB is connected
- Look for: `✓ MongoDB connected: cluster0.vwlmdjx.mongodb.net`

### View Frontend:

- Open http://localhost:3000 in browser

### Watch Logs:

- Backend terminal shows requests being made
- Error messages help identify issues

---

## 🔟 COMMON QUESTIONS ANSWERED

### Q: Why can't another user see my problems?

A: Every problem has `userId` field. Backend always checks JWT token to extract your userId, then queries only your problems.

### Q: What happens when JWT token expires?

A: After 7 days, token becomes invalid. Next API call returns 401 error. Frontend interceptor catches this and redirects to login.

### Q: Can I access the data directly?

A: MongoDB Atlas dashboard lets you view your data. But the app frontend requires login to access it through the UI.

### Q: What if I forget a password?

A: Currently not implemented. Feature idea: Add password reset email functionality.

### Q: Why do we need both frontend and backend validation?

A: Frontend validation = fast user feedback. Backend validation = security (user might hack frontend).

### Q: How does it keep me logged in across page reloads?

A: Token stored in localStorage (browser's local storage). When page reloads, AuthContext reads token from localStorage and restores user state.

---

## 🎯 SUMMARY

**The Flow:**

1. **User Signup** → Password hashed with bcrypt → Stored in MongoDB
2. **User Login** → Password verified → JWT token generated → Stored in browser
3. **Create Problem** → Token sent with request → Backend verifies → Saves with userId
4. **View Dashboard** → Fetches problems created today → Shows today's revisions
5. **Mark as Revised** → Updates revisionStage → Schedules next review date (1-120 days)
6. **Spaced Repetition** → Intervals increase if successful, reset if failed
7. **Statistics** → Aggregates all your problems → Shows progress and mastery

**Security:**

- Passwords hashed (unreadable)
- JWT tokens verify identity
- User data isolated (can't see others' problems)
- Input validated (backend + frontend)
- Requests require valid token

That's the complete architecture! 🎉
