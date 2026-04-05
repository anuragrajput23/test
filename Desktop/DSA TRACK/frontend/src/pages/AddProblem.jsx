import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemAPI } from "../services/api";
import { getErrorMessage } from "../utils/helpers";

const TOPICS = [
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

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const AddProblem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    topic: "Arrays",
    difficulty: "Medium",
    solvedDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Handle form input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError("Problem title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await problemAPI.createProblem({
        title: formData.title.trim(),
        topic: formData.topic,
        difficulty: formData.difficulty,
        solvedDate: new Date(formData.solvedDate).toISOString(),
      });

      setSuccess("Problem added successfully! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mt-4">
        <div className="alert alert-success">✓ {success}</div>
      </div>
    );
  }

  return (
    <div className="add-problem-container">
      <div className="container mt-4">
        <div className="add-problem-card">
          <h1>➕ Add a DSA Problem</h1>
          <p className="subtitle">
            Track your problem-solving progress with spaced repetition
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Problem Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Two Sum, Reverse String, Merge Sort..."
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-hint">
                What is the name of the problem you solved?
              </small>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Topic *</label>
                <select
                  name="topic"
                  className="form-select"
                  value={formData.topic}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <small className="form-hint">
                  What category does it fall under?
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty *</label>
                <select
                  name="difficulty"
                  className="form-select"
                  value={formData.difficulty}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  {DIFFICULTIES.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
                <small className="form-hint">How hard was it for you?</small>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Date Solved *</label>
              <input
                type="date"
                name="solvedDate"
                className="form-input"
                value={formData.solvedDate}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-hint">
                When did you solve this problem?
              </small>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Adding Problem..." : "✓ Add Problem"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="info-box mt-4">
            <h4>💡 How it works:</h4>
            <ul>
              <li>
                After adding, your problem will be available for revision after
                1 day
              </li>
              <li>
                Mark problems as "revised" to progress through spaced intervals
              </li>
              <li>If you forget, the problem resets to Day 1</li>
              <li>Maximum interval is 120 days once mastered</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProblem;
