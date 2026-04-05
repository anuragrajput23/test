import axios from "axios";

// Create axios instance with base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Add JWT token to request headers if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Handle response errors globally
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token is invalid, clear it and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

export const authAPI = {
  /**
   * Register a new user
   */
  register: (userData) => {
    return api.post("/auth/register", userData);
  },

  /**
   * Login user
   */
  login: (credentials) => {
    return api.post("/auth/login", credentials);
  },

  /**
   * Get current user info
   */
  getCurrentUser: () => {
    return api.get("/auth/me");
  },
};

// ============================================================================
// PROBLEM ENDPOINTS
// ============================================================================

export const problemAPI = {
  /**
   * Create a new problem
   */
  createProblem: (problemData) => {
    return api.post("/problems", problemData);
  },

  /**
   * Get all problems with optional filters
   * @param {Object} params - { topic, difficulty, sort }
   */
  getProblems: (params = {}) => {
    return api.get("/problems", { params });
  },

  /**
   * Get problems due for revision today
   */
  getProblemsForToday: () => {
    return api.get("/problems/today");
  },

  /**
   * Get a single problem by ID
   */
  getProblemById: (id) => {
    return api.get(`/problems/${id}`);
  },

  /**
   * Update a problem
   */
  updateProblem: (id, problemData) => {
    return api.put(`/problems/${id}`, problemData);
  },

  /**
   * Delete a problem
   */
  deleteProblem: (id) => {
    return api.delete(`/problems/${id}`);
  },

  /**
   * Mark problem as revised or failed
   * @param {string} id - Problem ID
   * @param {string} status - 'success' or 'failed'
   */
  reviseProblem: (id, status) => {
    return api.put(`/problems/${id}/revise`, { status });
  },

  /**
   * Get revision statistics
   */
  getRevisionStats: () => {
    return api.get("/problems/stats/overview");
  },
};

export default api;
