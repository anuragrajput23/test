import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { problemAPI } from "../services/api";
import ProblemCard from "../components/ProblemCard";
import Statistics from "../components/Statistics";
import { getErrorMessage } from "../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();

  const [todayProblems, setTodayProblems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**
   * Fetch today's problems and statistics
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [todayRes, statsRes] = await Promise.all([
          problemAPI.getProblemsForToday(),
          problemAPI.getRevisionStats(),
        ]);

        setTodayProblems(todayRes.data.data || []);
        setStats(statsRes.data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  /**
   * Handle problem revision
   */
  const handleRevision = (problemId, status) => {
    // Trigger refresh after revision
    setRefreshTrigger((prev) => prev + 1);
  };

  /**
   * Handle delete problem
   */
  const handleDelete = (problemId) => {
    setTodayProblems((prev) => prev.filter((p) => p._id !== problemId));
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container mt-4">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p className="subtitle">
              Let's continue your DSA journey with spaced repetition
            </p>
          </div>
          <Link to="/add-problem" className="btn btn-primary">
            ➕ Add Problem
          </Link>
        </div>

        {error && <div className="alert alert-error mb-2">{error}</div>}

        {/* Today's Problems Section */}
        <div className="section mt-4">
          <div className="section-header">
            <h2>📝 Today's Revisions</h2>
            <span className="count-badge">{todayProblems.length}</span>
          </div>

          {todayProblems.length === 0 ? (
            <div className="empty-state card">
              <p className="text-center text-muted">
                ✨ Great! You have no problems due today. Take a break or{" "}
                <Link to="/add-problem">add new problems</Link>.
              </p>
            </div>
          ) : (
            <div className="problems-grid">
              {todayProblems.map((problem) => (
                <ProblemCard
                  key={problem._id}
                  problem={problem}
                  onRevise={handleRevision}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        {stats && <Statistics stats={stats} className="mt-4" />}

        {/* All Problems Link */}
        <div className="mt-4 text-center">
          <Link to="/all-problems" className="link-button">
            View All Problems →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
