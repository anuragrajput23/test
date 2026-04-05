import React, { useState, useEffect } from "react";
import { problemAPI } from "../services/api";
import ProblemCard from "../components/ProblemCard";
import { getErrorMessage } from "../utils/helpers";

const TOPICS = [
  "All",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Sorting",
  "Searching",
  "Hashing",
  "Math",
  "Other",
];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  { value: "-revisionStage", label: "Highest Stage" },
  { value: "revisionStage", label: "Lowest Stage" },
  { value: "title", label: "Title (A-Z)" },
];

const AllProblems = () => {
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    topic: "All",
    difficulty: "All",
    sort: "-createdAt",
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**
   * Fetch problems with current filters
   */
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};
        if (filters.topic !== "All") params.topic = filters.topic;
        if (filters.difficulty !== "All")
          params.difficulty = filters.difficulty;
        params.sort = filters.sort;

        const res = await problemAPI.getProblems(params);
        setProblems(res.data.data || []);
        setStats(res.data.stats);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [filters, refreshTrigger]);

  /**
   * Handle filter change
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle problem revision
   */
  const handleRevision = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  /**
   * Handle delete problem
   */
  const handleDelete = (problemId) => {
    setProblems((prev) => prev.filter((p) => p._id !== problemId));
  };

  return (
    <div className="all-problems-container">
      <div className="container mt-4">
        <h1>📚 All Problems</h1>
        <p className="subtitle">View and manage all your DSA problems</p>

        {error && <div className="alert alert-error mt-3">{error}</div>}

        {/* Filters */}
        <div className="filters-section card mt-3">
          <h3>Filters</h3>
          <div className="filters-grid">
            <div className="form-group">
              <label className="form-label">Topic</label>
              <select
                name="topic"
                className="form-select"
                value={filters.topic}
                onChange={handleFilterChange}
              >
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select
                name="difficulty"
                className="form-select"
                value={filters.difficulty}
                onChange={handleFilterChange}
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sort By</label>
              <select
                name="sort"
                className="form-select"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {stats && (
          <div className="stats-summary mt-3">
            <div className="stat-item">
              <span className="stat-count">{stats.total}</span>
              <span className="stat-text">Total Problems</span>
            </div>
            {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
              <div key={difficulty} className="stat-item">
                <span className="stat-count">{count}</span>
                <span className="stat-text">{difficulty}</span>
              </div>
            ))}
          </div>
        )}

        {/* Problems Grid */}
        {loading ? (
          <div className="loading mt-4">
            <div className="spinner"></div>
          </div>
        ) : problems.length === 0 ? (
          <div className="empty-state card mt-4">
            <p className="text-center text-muted">
              No problems found. Try adjusting your filters or add a new
              problem.
            </p>
          </div>
        ) : (
          <div className="problems-grid mt-4">
            {problems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                onRevise={handleRevision}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {problems.length > 0 && (
          <p className="results-count mt-4">
            Showing {problems.length} of {stats?.total} problems
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProblems;
