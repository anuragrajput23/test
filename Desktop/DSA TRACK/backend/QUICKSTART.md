# ⚡ Quick Start Guide - AlgoTracker Backend

## Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)
- **npm** or **yarn**

---

## 🚀 Installation & Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `node-cron` - Background jobs
- `nodemailer` - Email notifications
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `nodemon` - Dev server auto-restart

---

### Step 2: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/dsa-revision-tracker

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production_12345
JWT_EXPIRE=7d

# Email (Optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

### Step 3: Start MongoDB

**Option A: Local MongoDB**

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Update `MONGODB_URI` in `.env`

---

### Step 4: Start the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

✅ Server starts on `http://localhost:5000`

Output should show:

```
✓ MongoDB connected: localhost
🚀 Server running on http://localhost:5000
📝 API docs available at http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
```

---

## 🧪 Test the Backend

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Response:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response includes a JWT token:

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

**Save the token** - you'll need it for next steps.

### 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Add a Problem

```bash
# Replace TOKEN with actual token from register/login
curl -X POST http://localhost:5000/api/problems \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy"
  }'
```

### 5. Get Today's Problems

```bash
curl -X GET http://localhost:5000/api/problems/today \
  -H "Authorization: Bearer TOKEN"
```

---

## 📡 Project Structure

```
backend/
├── models/
│   ├── User.js              # User schema + password hashing
│   └── Problem.js           # Problem schema + revision logic
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   └── problemController.js # Problem CRUD + revision
├── routes/
│   ├── authRoutes.js        # /api/auth endpoints
│   └── problemRoutes.js     # /api/problems endpoints
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── validation.js        # Auth input validation
│   └── problemValidation.js # Problem input validation
├── utils/
│   └── db.js                # MongoDB connection
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── README.md                # Backend documentation
├── API_ENDPOINTS.md         # Full API documentation
├── SPACED_REPETITION.md     # Algorithm explanation
└── QUICKSTART.md            # This file
```

---

## 🔐 Key Features

✅ **User Authentication**

- User registration with email validation
- Secure login with bcrypt
- JWT token-based authentication

✅ **Problem Management**

- Add, update, delete problems
- Filter by topic/difficulty
- Get problems due today

✅ **Spaced Repetition**

- Automatic interval calculation: [1, 3, 7, 15, 30, 60, 120] days
- Mark problems as revised or failed
- Reset mechanism for forgotten problems

✅ **Statistics & Tracking**

- Track revision progress per problem
- View statistics by topic, difficulty, stage
- Monitor revision history

✅ **Security**

- Password hashing (bcrypt)
- JWT authentication
- Protected routes
- Input validation
- CORS enabled

---

## 📝 API Endpoints

| Method | Endpoint                       | Auth | Purpose                    |
| ------ | ------------------------------ | ---- | -------------------------- |
| POST   | `/api/auth/register`           | ❌   | Register user              |
| POST   | `/api/auth/login`              | ❌   | Login user                 |
| GET    | `/api/auth/me`                 | ✅   | Get current user           |
| POST   | `/api/problems`                | ✅   | Add problem                |
| GET    | `/api/problems`                | ✅   | Get all problems           |
| GET    | `/api/problems/today`          | ✅   | **Get today's problems**   |
| GET    | `/api/problems/:id`            | ✅   | Get single problem         |
| PUT    | `/api/problems/:id`            | ✅   | Update problem             |
| PUT    | `/api/problems/:id/revise`     | ✅   | **Mark as revised/failed** |
| DELETE | `/api/problems/:id`            | ✅   | Delete problem             |
| GET    | `/api/problems/stats/overview` | ✅   | Get statistics             |

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for detailed documentation.

---

## 🛠️ Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running

```bash
# Check status
mongosh  # or mongo

# Start service
net start MongoDB  # Windows
brew services start mongodb-community  # macOS
```

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution**: Change PORT in `.env` or kill process:

```bash
# Windows
taskkill /PID <process_id> /F

# macOS/Linux
kill -9 $(lsof -ti:5000)
```

### JWT Secret Error

```
Error: JWT_SECRET is required
```

**Solution**: Check `.env` file has JWT_SECRET set

### Email Sending Fails

This is expected if you haven't configured email yet. Email features (background jobs) come next.

---

## 📚 Next Steps

1. **Build Frontend** (React UI with login, dashboard, problem forms)
2. **Implement Background Jobs** (Email notifications daily at 9 AM)
3. **Deploy** (Frontend to Vercel, Backend to Heroku/Railway)

---

## 🎯 Development Tips

### Auto-reload Server

Server auto-reloads on file changes (nodemon is configured):

```bash
npm run dev
```

### Database Browser

Install [MongoDB Compass](https://www.mongodb.com/products/compass) to visualize data.

### API Testing

- **Postman**: Import endpoints and test locally
- **Thunder Client**: VS Code extension for testing
- **curl**: Command-line tool (examples above)

### Watch Logs

Keep terminal open to see real-time logs:

```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
✓ MongoDB connected: localhost
🚀 Server running on http://localhost:5000
```

---

## 📖 Documentation Files

- [README.md](README.md) - Backend overview & setup
- [API_ENDPOINTS.md](API_ENDPOINTS.md) - Complete API reference
- [SPACED_REPETITION.md](SPACED_REPETITION.md) - Algorithm deep dive
- [QUICKSTART.md](QUICKSTART.md) - This file

---

**Status**: ✅ Backend ready for testing!

Next: Build React frontend and implement email notifications.
