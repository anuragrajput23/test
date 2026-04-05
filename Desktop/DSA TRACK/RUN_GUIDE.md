# 🚀 AlgoTracker - Complete Run Guide

## 📋 Prerequisites

### Required Software:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB Atlas** (Cloud Database) - [Sign up](https://www.mongodb.com/cloud/atlas)
- ✅ **Git** (optional, for cloning) - [Download](https://git-scm.com/)

### Check Installation:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create cluster → Create database user
3. Get connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
4. **Copy your connection string** - you'll need it in Step 3

### Step 2: Setup Email Notifications (Optional)

1. Enable 2FA on your Gmail account
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. **Copy the 16-character password**

### Step 3: Configure Environment Variables

#### Backend Configuration:

```bash
# Open backend/.env file
code "c:\Users\anura\Desktop\DSA TRACK\backend\.env"
```

Update these values:

```bash
# MongoDB connection string (from Step 1)
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/algotracker?retryWrites=true&w=majority

# JWT secret (keep as is or change to random string)
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Email configuration (from Step 2)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-char App Password

# Frontend URL (keep as is)
FRONTEND_URL=http://localhost:3000
```

### Step 4: Start the Application

#### Option A: Start Both Services (Recommended)

**Terminal 1 - Backend:**

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\backend"
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\frontend"
npm run dev
```

#### Option B: Start Services Separately

**Start Backend First:**

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\backend"
npm run dev
```

Wait for: `✓ MongoDB connected: cluster0.xxxxx.mongodb.net`

**Then Start Frontend:**

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\frontend"
npm run dev
```

Wait for: `➜ Local: http://localhost:3000/`

### Step 5: Access Your App

- 🌐 **Frontend:** http://localhost:3000
- 📡 **Backend API:** http://localhost:5000
- 🏥 **Health Check:** http://localhost:5000/api/health

---

## 📱 How to Use the App

### 1. Create Account

- Go to http://localhost:3000
- Click "Sign Up"
- Enter: Name, Email, Password
- Click "Create Account"

### 2. Add Your First Problem

- Click "Add Problem" in sidebar
- Enter problem details:
  - **Title:** "Two Sum"
  - **Topic:** Arrays
  - **Difficulty:** Easy
- Click "Add Problem"

### 3. Review Problems

- Problems appear on Dashboard when due
- Click "✓ Mark as Revised" after reviewing
- Click "✗ Mark as Failed" if you forgot

### 4. View Statistics

- Check "All Problems" page for full list
- View progress bars and statistics
- Track your learning journey

---

## 🔧 Detailed Setup Guide

### Backend Setup (Step by Step)

#### 1. Install Dependencies

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\backend"
npm install
```

#### 2. Configure MongoDB

- Create MongoDB Atlas account
- Create cluster (free tier)
- Create database user with password
- Get connection string from "Connect" → "Drivers"
- Update `MONGODB_URI` in `.env`

#### 3. Configure Email (Optional)

```bash
# Gmail setup:
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password

# Outlook setup:
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

#### 4. Start Backend Server

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\backend"
npm run dev
```

**Expected Output:**

```
[nodemon] starting `node server.js`
✓ MongoDB connected: cluster0.xxxxx.mongodb.net
⏰ Initializing background jobs...
✓ Interval-based notifications scheduled (every 30 minutes)
🚀 Server running on http://localhost:5000
📝 API docs available at http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
```

### Frontend Setup (Step by Step)

#### 1. Install Dependencies

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\frontend"
npm install
```

#### 2. Configure Frontend (Optional)

```bash
# Open frontend/.env file (if needed)
code "c:\Users\anura\Desktop\DSA TRACK\frontend\.env"
```

Default configuration (usually no changes needed):

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 3. Start Frontend Server

```bash
cd "c:\Users\anura\Desktop\DSA TRACK\frontend"
npm run dev
```

**Expected Output:**

```
VITE v5.4.21  ready in 567 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

## 🐛 Troubleshooting

### ❌ Backend Won't Start?

**Problem: MongoDB Connection Failed**

```
✗ MongoDB connection error: Could not connect to any servers...
```

**Solution:**

- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- Verify connection string in `.env`
- Ensure database user has read/write permissions

**Problem: Port 5000 Already in Use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

- Kill process using port 5000: `netstat -ano | findstr :5000`
- Or change port in `.env`: `PORT=5001`

### ❌ Frontend Won't Start?

**Problem: Port 3000 Already in Use**

```
Port 3000 is already in use
```

**Solution:**

- Kill process using port 3000
- Or change port in `vite.config.js`

**Problem: Backend Not Connected**

```
Failed to fetch /api/auth/login
```

**Solution:**

- Ensure backend is running on port 5000
- Check CORS settings in backend

### ❌ Email Notifications Not Working?

**Problem: Authentication Failed**

```
✗ Failed to send email: Invalid login
```

**Solution:**

- Use Gmail App Password (not regular password)
- Enable 2FA on Gmail account
- Check email credentials in `.env`

### ❌ Can't Create Account?

**Problem: Database Connection**

```
Internal server error
```

**Solution:**

- Check MongoDB connection in backend logs
- Verify `.env` configuration
- Test with: `curl http://localhost:5000/api/health`

---

## 📊 Testing the Application

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Test user registration (replace with your data)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test Frontend

- Open http://localhost:3000 in browser
- Try creating an account
- Add a problem
- Check if it appears on dashboard

### Test Email Notifications

- Add a problem
- Manually update `nextRevisionDate` in MongoDB to today
- Wait for cron job (or restart backend)
- Check email inbox

---

## 🚀 Production Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI="your_production_mongodb_uri"
heroku config:set JWT_SECRET="your_production_jwt_secret"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 📚 Additional Resources

- 📖 **How It Works:** [HOW_IT_WORKS.md](./HOW_IT_WORKS.md)
- 📧 **Email Setup:** [EMAIL_NOTIFICATIONS_SETUP.md](./EMAIL_NOTIFICATIONS_SETUP.md)
- ⏰ **Interval Notifications:** [INTERVAL_NOTIFICATIONS_GUIDE.md](./INTERVAL_NOTIFICATIONS_GUIDE.md)
- 🔌 **API Documentation:** [backend/API_ENDPOINTS.md](./backend/API_ENDPOINTS.md)
- 🧠 **Spaced Repetition:** [backend/SPACED_REPETITION.md](./backend/SPACED_REPETITION.md)

---

## 🎯 Quick Commands Reference

```bash
# Backend commands
cd backend && npm install          # Install dependencies
cd backend && npm run dev          # Start development server
cd backend && npm start            # Start production server

# Frontend commands
cd frontend && npm install         # Install dependencies
cd frontend && npm run dev         # Start development server
cd frontend && npm run build       # Build for production
cd frontend && npm run preview     # Preview production build

# Testing
curl http://localhost:5000/api/health    # Backend health check
curl http://localhost:3000               # Frontend access
```

---

## 🎉 You're All Set!

**Your AlgoTracker is now running!**

- 🌐 **App:** http://localhost:3001
- 📡 **API:** http://localhost:5001
- 📧 **Notifications:** Every 30 minutes (if email configured)

**Next Steps:**

1. Create your account
2. Add some DSA problems
3. Start your spaced repetition journey!
4. Get email reminders at 1, 3, 7, 15, 30, 60, 120 day intervals

Happy learning! 🚀📚
