import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AllProblems from "./pages/AllProblems";
import AddProblem from "./pages/AddProblem";

// Styles
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="main-content">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-problems"
              element={
                <ProtectedRoute>
                  <AllProblems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-problem"
              element={
                <ProtectedRoute>
                  <AddProblem />
                </ProtectedRoute>
              }
            />

            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 - Not Found */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
