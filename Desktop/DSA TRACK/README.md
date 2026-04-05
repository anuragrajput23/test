# 🚀 AlgoTracker - Master DSA with Spaced Repetition

A **production-ready web application** for mastering Data Structure & Algorithm problems using proven spaced repetition science.

## 🎯 Overview

**AlgoTracker** helps students and professionals master DSA concepts by:

- Tracking problems solved
- Automatically scheduling revisions at scientifically-backed intervals
- Monitoring progress through visual statistics
- Never forgetting important concepts again

**Tech Stack:**

- **Frontend**: React + React Router + Axios
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT + bcrypt
- **Database**: MongoDB (Mongoose)
- **Background Jobs**: node-cron (daily emails)

---

## 📁 Project Structure

```
DSA TRACK/
├── backend/                   # Node.js + Express backend
│   ├── models/               # MongoDB schemas
│   │   ├── User.js          # User authentication
│   │   └── Problem.js       # DSA problems with spaced repetition
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   └── problemController.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   └── problemRoutes.js
│   ├── middleware/          # Middleware functions
│   │   ├── auth.js         # JWT verification
│   │   ├── validation.js   # Input validation
│   │   └── problemValidation.js
│   ├── utils/              # Utilities
│   │   └── db.js          # MongoDB connection
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   ├── API_ENDPOINTS.md    # Full API documentation
│   ├── SPACED_REPETITION.md # Algorithm explanation
│   ├── QUICKSTART.md       # Backend quick start
│   └── README.md           # Backend documentation
│
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── ProblemCard.jsx
│   │   │   ├── Statistics.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/        # State management
│   │   │   └── AuthContext.jsx
│   │   ├── pages/          # Full pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AllProblems.jsx
│   │   │   └── AddProblem.jsx
│   │   ├── services/       # API client
│   │   │   └── api.js
│   │   ├── utils/          # Utilities
│   │   │   └── helpers.js
│   │   ├── App.jsx         # Main component
│   │   ├── App.css         # Component styles
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static files
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite config
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   ├── QUICKSTART.md       # Frontend quick start
│   └── README.md           # Frontend documentation
│
└── README.md               # This file
```

---

## 🚀 Quick Start (5 minutes)

### Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB (local or Atlas cloud)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env and set MongoDB URI + JWT secret
npm install
npm run dev
# Backend runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env if needed (defaults work fine)
npm install
npm run dev
# Frontend opens at http://localhost:3000
```

Now register, add problems, and start revising! 🎉

---

## 📚 Feature Documentation

### User Features

✅ **Authentication**

- Secure registration with email validation
- Login with JWT tokens
- Password hashing with bcrypt
- Protected routes

✅ **Problem Management**

- Add DSA problems with metadata
- Edit problem details
- Delete problems
- View all problems with filters

✅ **Spaced Repetition**

- Automatic scheduling based on intervals: [1, 3, 7, 15, 30, 60, 120] days
- Mark problems as "revised" to progress stages
- Mark as "failed" to reset to stage 0
- Visual stage progression (0-6)

✅ **Dashboard**

- View problems due today
- Quick statistics overview
- Links to manage problems
- Progress visualization

✅ **Statistics**

- Total problems tracked
- Problems mastered (stage 6)
- Average revisions per problem
- Total failures tracked
- Distribution by stage/topic/difficulty

---

## 🔐 Security Features

1. **Password Security**
   - Hashed with bcrypt (10 salt rounds)
   - Never stored in plain text
   - Minimum 6 characters

2. **API Security**
   - JWT authentication on all protected routes
   - Bearer token in Authorization header
   - Token expiration (7 days)
   - Automatic token refresh handling

3. **Data Privacy**
   - Each user only sees their own data
   - userId filter on all queries
   - CORS enabled for frontend

4. **Input Validation**
   - Server-side validation all endpoints
   - Sanitized input data
   - Type checking with enum values

---

## 📡 API Endpoints

### Auth Endpoints

```
POST   /api/auth/register      # Create account
POST   /api/auth/login         # Login user
GET    /api/auth/me            # Get current user (protected)
```

### Problem Endpoints (All Protected)

```
POST   /api/problems                # Create problem
GET    /api/problems                # Get all problems
GET    /api/problems/today          # Get today's revisions
GET    /api/problems/:id            # Get single problem
PUT    /api/problems/:id            # Update problem
PUT    /api/problems/:id/revise     # Mark as revised/failed
DELETE /api/problems/:id            # Delete problem
GET    /api/problems/stats/overview # Get statistics
```

See `/backend/API_ENDPOINTS.md` for complete documentation with examples.

---

## 🔄 Spaced Repetition Algorithm

### Concept

Based on the **SM-2 algorithm**, problems progress through stages with increasing intervals:

```
Stage 0 → 1 day      (First review)
Stage 1 → 3 days     (Getting familiar)
Stage 2 → 7 days     (Building confidence)
Stage 3 → 15 days    (Mostly retained)
Stage 4 → 30 days    (Very solid)
Stage 5 → 60 days    (Excellent retention)
Stage 6 → 120 days   (Long-term memory)
```

### Rules

1. **Successful Revision**: Progress to next stage
2. **Failed Revision**: Reset to stage 0 (start over)
3. **Max Stage**: 6 (120-day intervals)

### Example Timeline

```
Day 1:  Add problem → Stage 0, Next: Day 2
Day 2:  Review ✓ → Stage 1, Next: Day 5
Day 5:  Review ✓ → Stage 2, Next: Day 12
Day 12: Review ✗ → Stage 0 (reset), Next: Day 13
Day 13: Review ✓ → Stage 1, Next: Day 16
...continues until mastered
```

See `/backend/SPACED_REPETITION.md` for detailed algorithm explanation.

---

## 🎨 Frontend Architecture

### Pages

- **Login** - User authentication
- **Signup** - Account creation
- **Dashboard** - Today's problems and overview
- **All Problems** - Browse and filter problems
- **Add Problem** - Create new problem entry

### Components

- **Header** - Navigation and user menu
- **ProblemCard** - Individual problem display
- **Statistics** - Progress dashboard
- **ProtectedRoute** - Route security wrapper

### State Management

- **AuthContext** - Global authentication state
- **Local State** - Component-level state with useState

### Styling

- **CSS Grid & Flexbox** - Responsive layouts
- **Gradient Theme** - Modern purple/blue gradients
- **Mobile-First** - Works on all devices

---

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm run dev

# In another terminal, test API:
curl http://localhost:5000/api/health
```

Or run comprehensive test script:

```bash
bash test-api.sh
```

### Frontend Testing

```bash
cd frontend
npm run dev
# Visit http://localhost:3000
# Register test account
# Add test problems
# Test revision flow
```

---

## 📊 Database Schema

### User Collection

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Problem Collection

```javascript
{
  userId: ObjectId,
  title: String,
  topic: String,
  difficulty: String,
  solvedDate: Date,
  revisionStage: Number (0-6),
  nextRevisionDate: Date,
  lastReviewed: Date,
  revisionCount: Number,
  failureCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. **Install Heroku CLI**

   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**

   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**

   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set MONGODB_URI=your_mongo_uri
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)

#### Vercel

1. Push to GitHub
2. Connect on vercel.com
3. Set `VITE_API_URL` environment variable
4. Deploy with one click

#### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 🛠️ Development Workflow

### Local Development

1. **Start MongoDB**

   ```bash
   mongod  # or MongoDB Atlas connection
   ```

2. **Start Backend**

   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

4. **Access Application**
   - Visit http://localhost:3000
   - API at http://localhost:5000/api

### Code Organization

- **One component per file** - Easy to locate and maintain
- **Separation of concerns** - Middleware, controllers, services separate
- **Reusable utilities** - Helper functions in utils/
- **Context for global state** - Auth state in AuthContext

---

## 📚 Documentation Files

| File                            | Purpose                     |
| ------------------------------- | --------------------------- |
| `/backend/README.md`            | Backend setup and overview  |
| `/backend/API_ENDPOINTS.md`     | Complete API documentation  |
| `/backend/SPACED_REPETITION.md` | Algorithm deep dive         |
| `/backend/QUICKSTART.md`        | 5-minute backend setup      |
| `/frontend/README.md`           | Frontend setup and overview |
| `/frontend/QUICKSTART.md`       | 5-minute frontend setup     |

---

## 🎓 Learning Resources

- [ReactJS Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Auth](https://tools.ietf.org/html/rfc7519)
- [Spaced Repetition Research](https://en.wikipedia.org/wiki/Spaced_repetition)

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Backend (5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (if using Atlas)

### API Connection Failed

- Check backend is running (port 5000)
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS configuration in backend

---

## 🎯 Next Steps (Features Ideas)

1. **Email Notifications** - Daily digest of problems due
2. **Difficulty-Based Intervals** - Adjust intervals by difficulty
3. **Confidence Scoring** - Rate confidence after each review
4. **Similar Problems** - Suggest related problems
5. **Study Sessions** - Timed revision sessions
6. **Social Features** - Share progress, compete with friends
7. **Problem Sources** - Track where problems came from
8. **Code Snippets** - Attach solution code to problems
9. **Dark Mode** - Toggle dark theme
10. **Analytics** - Advanced progress charts

---

## 🤝 Contributing

Improvements welcome! The project is well-structured and documented for easy modifications.

---

## 📄 License

MIT License - Feel free to use this project!

---

## 🚀 Getting Started

**Choose your starting point:**

- **Backend Developers** → `/backend/README.md`
- **Frontend Developers** → `/frontend/README.md`
- **Full Stack** → Follow `/backend/QUICKSTART.md` then `/frontend/QUICKSTART.md`
- **Learning Spaced Repetition** → `/backend/SPACED_REPETITION.md`

---

## ✅ Checklist

- [x] Backend setup complete
- [x] Frontend setup complete
- [x] Authentication working
- [x] Problem CRUD operations
- [x] Spaced repetition logic
- [x] Statistics dashboard
- [x] Responsive design
- [x] API documentation
- [x] Deployment ready

**Status: ✅ Production Ready!**

---

**Built with ❤️ for DSA mastery**

Questions? Check the documentation files or test the API endpoints!
