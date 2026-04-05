# AlgoTracker - Backend Setup

## ✅ Completed Setup

### Project Structure

```
backend/
├── models/
│   └── User.js              # User data model with password hashing
├── controllers/
│   └── authController.js    # Authentication logic (register, login, getMe)
├── routes/
│   └── authRoutes.js        # Auth endpoints
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── validation.js        # Input validation rules
├── utils/
│   └── db.js                # MongoDB connection
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

### Features Implemented

#### 1. **User Model** (`models/User.js`)

- ✅ User schema with name, email, password, createdAt
- ✅ Password hashing using bcrypt (automatic in pre-save middleware)
- ✅ Email validation and uniqueness
- ✅ Password comparison method for login
- ✅ JWT token generation method

#### 2. **Authentication Controller** (`controllers/authController.js`)

- ✅ **Register** - Create new user with validation
- ✅ **Login** - Authenticate user and return JWT token
- ✅ **GetMe** - Retrieve current user info (protected)

#### 3. **Authentication Routes** (`routes/authRoutes.js`)

- ✅ `POST /api/auth/register` - Register new user
- ✅ `POST /api/auth/login` - Login user
- ✅ `GET /api/auth/me` - Get current user (protected)

#### 4. **Middleware**

- ✅ **JWT Protection** (`middleware/auth.js`) - Verify token & attach user to request
- ✅ **Input Validation** (`middleware/validation.js`) - Validate register/login data

#### 5. **Server Setup** (`server.js`)

- ✅ Express app configuration
- ✅ CORS enabled for frontend
- ✅ MongoDB connection
- ✅ Error handling
- ✅ Health check endpoint

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Steps

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Setup environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A strong secret key
   - `FRONTEND_URL` - Your frontend URL

3. **Start the server:**

   ```bash
   # Development (with auto-restart)
   npm run dev

   # Production
   npm start
   ```

   Server will start on `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

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

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

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

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**

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

## 🔐 Security Features

✅ **Password Hashing:** Bcrypt with 10 salt rounds
✅ **JWT Authentication:** Token-based authentication
✅ **Input Validation:** Email, name, password validation
✅ **Protected Routes:** Middleware to verify JWT tokens
✅ **CORS:** Controlled access from frontend
✅ **Environment Variables:** Sensitive data in .env

---

## 🔄 Next Steps

The following will be implemented next:

1. **Problem Model** - Store DSA problems with revision tracking
2. **Problem Routes** - CRUD operations for problems
3. **Revision Logic** - Calculate next revision dates based on intervals
4. **Background Jobs** - Daily email notifications
5. **Frontend** - React UI with login, dashboard, and add problem forms

---

## 📝 Key Architectural Decisions

1. **Bcrypt (10 rounds):** Balances security and performance
2. **JWT Tokens:** Stateless authentication suitable for APIs
3. **Middleware Pattern:** Clean separation of concerns
4. **Async/Await:** Modern error handling
5. **Input Validation:** Prevents invalid data in database

---

## 💡 Important Notes

- Always use `HTTPS` in production
- Change `JWT_SECRET` to a strong random string in production
- Use MongoDB Atlas or secure MongoDB server in production
- Never commit `.env` file to version control
- Use nodemon for development auto-restart

---

**Status:** ✅ Backend structure, User model, and Auth routes completed. Ready for Problem model implementation.
