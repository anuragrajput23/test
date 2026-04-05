import { formatDistanceToNow, format, isPast, isToday } from "date-fns";

/**
 * Format date to user-friendly string
 */
export const formatDate = (date) => {
  if (!date) return "Never";
  return format(new Date(date), "MMM d, yyyy");
};

/**
 * Format date to show relative time (e.g., "3 days from now")
 */
export const formatDateRelative = (date) => {
  if (!date) return "Not scheduled";
  const dateObj = new Date(date);

  if (isPast(dateObj) && !isToday(dateObj)) {
    return `${formatDistanceToNow(dateObj, { addSuffix: true })}`;
  }
  if (isToday(dateObj)) {
    return "Today";
  }
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Get difficulty color
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "#10b981"; // Green
    case "Medium":
      return "#f59e0b"; // Amber
    case "Hard":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
  }
};

/**
 * Get difficulty background color
 */
export const getDifficultyBgColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "#d1fae5"; // Light green
    case "Medium":
      return "#fef3c7"; // Light amber
    case "Hard":
      return "#fee2e2"; // Light red
    default:
      return "#f3f4f6"; // Light gray
  }
};

/**
 * Get stage badge color
 */
export const getStageBadgeColor = (stage) => {
  const colors = [
    "#ef4444", // Stage 0 - Red
    "#f97316", // Stage 1 - Orange
    "#eab308", // Stage 2 - Yellow
    "#84cc16", // Stage 3 - Lime
    "#22c55e", // Stage 4 - Green
    "#06b6d4", // Stage 5 - Cyan
    "#0ea5e9", // Stage 6 - Blue
  ];
  return colors[Math.min(stage, 6)];
};

/**
 * Get stage label with description
 */
export const getStageInfo = (stage) => {
  const intervals = [1, 3, 7, 15, 30, 60, 120];
  const labels = [
    { stage: 0, label: "New", interval: "1 day" },
    { stage: 1, label: "Reviewing", interval: "3 days" },
    { stage: 2, label: "Familiar", interval: "7 days" },
    { stage: 3, label: "Solid", interval: "15 days" },
    { stage: 4, label: "Strong", interval: "30 days" },
    { stage: 5, label: "Excellent", interval: "60 days" },
    { stage: 6, label: "Mastered", interval: "120 days" },
  ];
  return labels[Math.min(stage, 6)];
};

/**
 * Get storage key with user ID
 */
export const getStorageKey = (key, userId) => {
  return `dsa_${userId}_${key}`;
};

/**
 * Parse error message from API response
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    return error.response.data.errors[0]?.msg || "An error occurred";
  }
  return error.message || "An error occurred";
};
