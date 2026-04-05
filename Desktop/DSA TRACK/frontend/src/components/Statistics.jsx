import React from 'react';

const Statistics = ({ stats, className = '' }) => {
  /**
   * Get progress percentage (stages completed / total)
   */
  const getProgressPercentage = () => {
    if (stats.totalProblems === 0) return 0;
    return Math.round((stats.completedStages / stats.totalProblems) * 100);
  };

  /**
   * Get stage progress bar data
   */
  const getStageData = () => {
    const stages = [
      { stage: 0, label: 'New (1d)', color: '#ef4444' },
      { stage: 1, label: 'Reviewing (3d)', color: '#f97316' },
      { stage: 2, label: 'Familiar (7d)', color: '#eab308' },
      { stage: 3, label: 'Solid (15d)', color: '#84cc16' },
      { stage: 4, label: 'Strong (30d)', color: '#22c55e' },
      { stage: 5, label: 'Excellent (60d)', color: '#06b6d4' },
      { stage: 6, label: 'Mastered (120d)', color: '#0ea5e9' }
    ];

    return stages.map(s => ({
      ...s,
      count: stats.byStage[s.stage] || 0
    }));
  };

  if (!stats) return null;

  const progressPercentage = getProgressPercentage();
  const stageData = getStageData();

  return (
    <div className={`statistics ${className}`}>
      <h2>📊 Your Progress</h2>

      <div className="stats-grid">
        {/* Total Problems */}
        <div className="stat-card">
          <div className="stat-value">{stats.totalProblems}</div>
          <div className="stat-label">Total Problems</div>
        </div>

        {/* Completed */}
        <div className="stat-card">
          <div className="stat-value">{stats.completedStages}</div>
          <div className="stat-label">Mastered</div>
        </div>

        {/* Average Revisions */}
        <div className="stat-card">
          <div className="stat-value">{stats.averageRevisions}</div>
          <div className="stat-label">Avg Reviews</div>
        </div>

        {/* Total Failures */}
        <div className="stat-card">
          <div className="stat-value">{stats.totalFailures}</div>
          <div className="stat-label">Total Failures</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section mt-4">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Stage Distribution */}
      <div className="stage-distribution mt-4">
        <h3>Stage Distribution</h3>
        <div className="stages-list">
          {stageData.map((stage, index) => (
            <div key={index} className="stage-row">
              <div className="stage-info">
                <span 
                  className="stage-dot"
                  style={{ backgroundColor: stage.color }}
                ></span>
                <span className="stage-label">{stage.label}</span>
              </div>
              <div className="stage-count">
                <div className="stage-bar">
                  <div 
                    className="stage-bar-fill"
                    style={{
                      width: `${stats.totalProblems > 0 ? (stage.count / stats.totalProblems) * 100 : 0}%`,
                      backgroundColor: stage.color
                    }}
                  ></div>
                </div>
                <span className="count-label">{stage.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic & Difficulty Stats */}
      <div className="stats-breakdown mt-4">
        <div className="breakdown-section">
          <h3>By Topic</h3>
          <div className="breakdown-list">
            {Object.entries(stats.byTopic).map(([topic, count]) => (
              <div key={topic} className="breakdown-item">
                <span className="breakdown-label">{topic}</span>
                <span className="breakdown-count">{count}</span>
              </div>
            )).sort((a, b) => b.props.children[1].props.children - a.props.children[1].props.children)}
          </div>
        </div>

        <div className="breakdown-section">
          <h3>By Difficulty</h3>
          <div className="breakdown-list">
            {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
              <div key={difficulty} className="breakdown-item">
                <span className="breakdown-label">{difficulty}</span>
                <span className="breakdown-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
