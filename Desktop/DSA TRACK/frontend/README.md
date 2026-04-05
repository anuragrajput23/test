# AlgoTracker - Frontend (React)

A modern, responsive React application for managing DSA problem revision using spaced repetition.

## 🎯 Features

✅ **User Authentication**

- Register and login with email/password
- JWT token-based authentication
- Persistent login sessions

✅ **Dashboard**

- View problems due for revision today
- Quick action buttons for revision
- Statistics overview
- Navigation to add problems

✅ **Problem Management**

- Add DSA problems with topic and difficulty
- View all problems with filtering
- Filter by topic, difficulty, and sort options
- Edit and delete problems

✅ **Spaced Repetition System**

- Automatic revision scheduling
- Mark problems as revised or forgotten
- Visual stage progression (0-6)
- Track revision history

✅ **Statistics & Progress**

- View overall progress
- Stage distribution visualization
- Statistics by topic and difficulty
- Track total problems and mastered problems

✅ **Responsive Design**

- Mobile-friendly UI
- Clean, modern design
- Smooth animations and transitions
- Dark mode ready

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── ProblemCard.jsx         # Problem display card
│   │   ├── Statistics.jsx          # Progress statistics
│   │   └── ProtectedRoute.jsx      # Route protection
│   ├── context/
│   │   └── AuthContext.jsx         # Auth state management
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Signup.jsx              # Registration page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   ├── AllProblems.jsx         # All problems view
│   │   └── AddProblem.jsx          # Add problem form
│   ├── services/
│   │   └── api.js                  # API client with axios
│   ├── utils/
│   │   └── helpers.js              # Utility functions
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── public/                          # Static assets
├── index.html                       # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Backend** running on `http://localhost:5000`

### Steps

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Setup Environment Variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   Frontend opens on `http://localhost:3000`

4. **Build for Production**

   ```bash
   npm run build
   ```

   Creates optimized build in `dist/` folder

## 📦 Dependencies

### Core

- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM
- **react-router-dom** (^6.20.0) - Client-side routing

### API & Data

- **axios** (^1.6.2) - HTTP client
- **date-fns** (^2.30.0) - Date formatting

### Build Tools

- **vite** (^5.0.0) - Build tool
- **@vitejs/plugin-react** (^4.2.0) - React plugin for Vite

## 🔐 Authentication Flow

1. **Register** - User creates account
2. **Login** - User enters credentials
3. **Token Storage** - JWT stored in localStorage
4. **Protected Routes** - Routes require valid token
5. **Auto Logout** - Invalid token redirects to login

```
User Login
    ↓
API Call /auth/login
    ↓
Receive JWT Token
    ↓
Store in localStorage
    ↓
Add to request headers
    ↓
Access protected routes
```

## 🎨 Component Architecture

### Pages

- **Login** - Authentication page
- **Signup** - Registration page
- **Dashboard** - Today's revisions + stats
- **AllProblems** - Browse all problems
- **AddProblem** - Add new problem form

### Components

- **Header** - Navigation & user menu
- **ProblemCard** - Individual problem display
- **Statistics** - Progress dashboard
- **ProtectedRoute** - Route security wrapper

### Context

- **AuthContext** - Global auth state

## 🔌 API Integration

All API calls go through the service layer in `src/services/api.js`:

```javascript
import { authAPI, problemAPI } from "../services/api";

// Auth
await authAPI.register(userData);
await authAPI.login(credentials);

// Problems
await problemAPI.createProblem(data);
await problemAPI.getProblems(filters);
await problemAPI.getProblemsForToday();
await problemAPI.reviseProblem(id, status);
```

## 🎨 Styling

- **Utility-first CSS** - Base styles in `index.css`
- **Component styles** - Component-specific in `App.css`
- **Responsive design** - Mobile-first approach
- **Gradient theme** - Purple/blue gradient (667eea → 764ba2)

## 🛠️ Development Tips

### Hot Module Replacement (HMR)

- Auto-reload on file changes
- Preserves component state

### Browser DevTools

- React DevTools extension recommended
- Redux DevTools (if needed)

### API Debugging

- Open browser Network tab
- Check request/response payloads
- Verify token in Authorization header

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build & Deploy to Vercel

1. **Create Vite build:**

   ```bash
   npm run build
   ```

2. **Push to GitHub**

3. **Connect to Vercel:**
   - https://vercel.com
   - Import project
   - Set environment variables
   - Deploy

### Build & Deploy to Netlify

1. **Create Vite build:**

   ```bash
   npm run build
   ```

2. **Deploy:**

   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Set environment variables** in Netlify dashboard

## 🔗 Backend Integration

Frontend communicates with backend at:

```
http://localhost:5000/api
```

Endpoints used:

```
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /problems
GET    /problems
GET    /problems/today
GET    /problems/:id
PUT    /problems/:id
PUT    /problems/:id/revise
DELETE /problems/:id
GET    /problems/stats/overview
```

## 📚 Key Concepts

### Context API

- Global auth state management
- Avoids prop drilling
- AuthProvider wraps entire app

### Protected Routes

- Check authentication before rendering
- Redirect to login if not authenticated
- Loading state during auth check

### Axios Instance

- Centralized API configuration
- Auto-attach JWT token to requests
- Handle 401 responses globally

### Component Hooks

- `useState` - Local state
- `useEffect` - Side effects
- `useContext` - Auth context
- `useNavigate` - Route navigation

## 🧪 Testing the App

1. **Start Backend**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Register a test account**
   - Email: `test@example.com`
   - Password: `password123`

4. **Add test problems**
   - Use "Add Problem" button
   - Select different topics/difficulties

5. **Test revision flow**
   - Mark problems as revised
   - Reset problems as forgotten
   - Check stage progression

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### API Connection Failed

- Check backend is running on port 5000
- Verify `VITE_API_URL` in `.env`
- Check CORS configuration in backend

### Token Not Persisting

- Enable localStorage (privacy mode disables it)
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

### Blank Page

- Open browser console (F12)
- Check for JavaScript errors
- Verify React DevTools shows React app

## 📖 Additional Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Vite Docs](https://vitejs.dev)
- [date-fns Docs](https://date-fns.org)

## 📝 Environment Variables

| Variable     | Description          | Default                   |
| ------------ | -------------------- | ------------------------- |
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

## 🎯 Next Steps

1. **Backend Setup** - Follow backend README
2. **Run Both Services** - Backend + Frontend
3. **Test User Flow** - Register, Login, Add, Revise
4. **Customize Styling** - Update colors/fonts as needed
5. **Deploy** - Push to Vercel/Netlify

---

**Status**: ✅ Frontend complete and ready to use!

For issues or questions, check the backend API documentation at `/backend/API_ENDPOINTS.md`.
