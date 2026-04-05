import React, { useState } from "react";
import { problemAPI } from "../services/api";
import {
  formatDateRelative,
  getDifficultyColor,
  getDifficultyBgColor,
  getStageBadgeColor,
  getStageInfo,
} from "../utils/helpers";

const ProblemCard = ({ problem, onRevise, onDelete }) => {
  const [revising, setRevising] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const stageInfo = getStageInfo(problem.revisionStage);

  /**
   * Handle mark as revised (success)
   */
  const handleReviseSuccess = async () => {
    try {
      setRevising(true);
      await problemAPI.reviseProblem(problem._id, "success");
      onRevise(problem._id, "success");
    } catch (err) {
      console.error("Error revising problem:", err);
      alert("Failed to update problem");
    } finally {
      setRevising(false);
    }
  };

  /**
   * Handle mark as failed
   */
  const handleReviseFailed = async () => {
    try {
      setRevising(true);
      const confirmFail = window.confirm(
        "Mark as failed? This will reset the problem to Day 1.",
      );
      if (!confirmFail) {
        setRevising(false);
        return;
      }
      await problemAPI.reviseProblem(problem._id, "failed");
      onRevise(problem._id, "failed");
    } catch (err) {
      console.error("Error revising problem:", err);
      alert("Failed to update problem");
    } finally {
      setRevising(false);
    }
  };

  /**
   * Handle delete problem
   */
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Delete this problem? This cannot be undone.",
      );
      if (!confirmDelete) return;

      setDeleting(true);
      await problemAPI.deleteProblem(problem._id);
      onDelete(problem._id);
    } catch (err) {
      console.error("Error deleting problem:", err);
      alert("Failed to delete problem");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="problem-card card">
      <div className="problem-header">
        <div>
          <h3>{problem.title}</h3>
          <p className="text-muted text-sm">{problem.topic}</p>
        </div>
        <div className="problem-badges">
          <span
            className="badge"
            style={{
              backgroundColor: getDifficultyBgColor(problem.difficulty),
              color: getDifficultyColor(problem.difficulty),
            }}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>

      <div className="problem-stage mt-2">
        <div className="stage-info">
          <span className="stage-label">Stage {problem.revisionStage}/6</span>
          <span
            className="stage-badge"
            style={{
              backgroundColor: getStageBadgeColor(problem.revisionStage),
            }}
          >
            {stageInfo.label} - {stageInfo.interval}
          </span>
        </div>
      </div>

      <div className="problem-meta mt-3">
        <div className="meta-item">
          <span className="meta-label">Next Review:</span>
          <span className="meta-value">
            {formatDateRelative(problem.nextRevisionDate)}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Times Reviewed:</span>
          <span className="meta-value">{problem.revisionCount}</span>
        </div>
        {problem.failureCount > 0 && (
          <div className="meta-item">
            <span className="meta-label">Times Failed:</span>
            <span className="meta-value fail">{problem.failureCount}</span>
          </div>
        )}
      </div>

      <div className="problem-actions mt-4">
        <button
          className="btn btn-success btn-small"
          onClick={handleReviseSuccess}
          disabled={revising || deleting}
          title="Mark as revised (move to next stage)"
        >
          ✓ Revised
        </button>
        <button
          className="btn btn-secondary btn-small"
          onClick={handleReviseFailed}
          disabled={revising || deleting}
          title="Mark as failed (reset to Day 1)"
        >
          ✗ Forgot
        </button>
        <button
          className="btn btn-danger btn-small"
          onClick={handleDelete}
          disabled={deleting || revising}
          title="Delete this problem"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
