# 🚀 Frontend Quick Start

Get the React frontend running in 2 minutes!

## Prerequisites

- Node.js v16+ installed
- Backend running on `http://localhost:5000`

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This installs:

- React & React Router
- Axios for API calls
- Vite for bundling
- date-fns for date handling

### 2. Configure API

The frontend automatically connects to:

```
http://localhost:5000/api
```

If your backend is on a different URL, update `.env`:

```bash
cp .env.example .env
# Edit .env and set VITE_API_URL
```

### 3. Start Development Server

```bash
npm run dev
```

**Output:**

```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

The app opens automatically at `http://localhost:3000`

## 🧪 Test the App

### 1. Create Account

1. Click "Create one" on login page
2. Fill in Name, Email, Password
3. Click "Sign Up"

### 2. Add a Problem

1. Click "+ Add Problem"
2. Fill in:
   - **Title**: e.g., "Two Sum"
   - **Topic**: Select from dropdown
   - **Difficulty**: Easy/Medium/Hard
   - **Date Solved**: Today
3. Click "✓ Add Problem"

### 3. Mark as Revised

1. On dashboard, see today's problems
2. Click "✓ Revised" to mark as done
3. Problem moves to next stage
4. Next review date updates

### 4. View All Problems

1. Click "All Problems"
2. Filter by topic/difficulty
3. Sort by different options
4. See full problem list

### 5. Check Statistics

1. Dashboard shows progress
2. See stage distribution
3. View stats by topic/difficulty
4. Track mastered problems

## 📱 Features Overview

### Pages

| Page         | URL             | Description              |
| ------------ | --------------- | ------------------------ |
| Login        | `/login`        | User login               |
| Signup       | `/signup`       | New account creation     |
| Dashboard    | `/dashboard`    | Today's problems + stats |
| All Problems | `/all-problems` | Browse all problems      |
| Add Problem  | `/add-problem`  | Add new problem          |

### Key Components

- **Header** - Navigation & user menu
- **ProblemCard** - Individual problem display
- **Statistics** - Progress overview
- **Forms** - Login, signup, add problem

## 🎨 UI Highlights

✨ **Modern Design**

- Purple gradient theme
- Smooth animations
- Cards and badges
- Responsive layout

📊 **Visual Feedback**

- Stage progression colors
- Progress bars
- Statistics charts
- Loading spinners

📱 **Mobile Friendly**

- Works on all screen sizes
- Touch-friendly buttons
- Optimized layout

## 🔗 API Integration

All API calls go through `src/services/api.js`:

```javascript
// Auth
await authAPI.register(userData);
await authAPI.login(credentials);

// Problems
await problemAPI.createProblem(data);
await problemAPI.getProblems();
await problemAPI.reviseProblem(id, status);
```

## 🛠️ Development

### File Structure

```
src/
├── components/      # Reusable components
├── context/        # State management
├── pages/          # Full pages
├── services/       # API client
├── utils/          # Helpers
├── App.jsx        # Main component
└── index.css      # Global styles
```

### Edit & Save

- Changes auto-reload (HMR)
- Check browser console for errors
- React DevTools helpful for debugging

### Build for Production

```bash
npm run build
# Creates optimized dist/ folder
```

## 🚀 Deploy

### Vercel (Free)

1. Push to GitHub
2. Connect on vercel.com
3. Set `VITE_API_URL` env var
4. Deploy with one click

### Netlify (Free)

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🐛 Common Issues

### "Cannot connect to API"

- Check backend is running
- Verify port 5000 is correct
- Check `.env` file

### "Blank white page"

- Open browser console (F12)
- Check for errors
- Try `npm run dev` again

### "Port 3000 already in use"

```bash
# Kill process on port 3000
# Windows
taskkill /F /IM node.exe

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### "localStorage not working"

- Disable private/incognito mode
- Clear browser cache
- Check browser settings

## 📚 Learn More

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Vite Guide](https://vitejs.dev)

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] `npm install` completed
- [ ] `.env` configured (if needed)
- [ ] `npm run dev` started
- [ ] Accessed http://localhost:3000
- [ ] Created test account
- [ ] Added a test problem
- [ ] Marked as revised
- [ ] Viewed statistics

**Done!** 🎉 Frontend is ready to use!

---

**Next:** Follow backend README to set up and run both services together.
