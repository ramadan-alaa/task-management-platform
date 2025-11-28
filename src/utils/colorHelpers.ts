import type { TaskPriority, TaskStatus, TaskCategory } from '../types';

/**
 * ============================================
 * COLOR HELPER UTILITIES
 * ============================================
 * Functions for retrieving colors for badges and status indicators
 */

/**
 * Get priority color classes
 * Colors based on priority level
 */
export const getPriorityColor = (priority: TaskPriority): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} => {
  const colors = {
    urgent: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      dot: 'bg-red-500',
    },
    high: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
      dot: 'bg-orange-500',
    },
    medium: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      dot: 'bg-yellow-500',
    },
    low: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      dot: 'bg-green-500',
    },
  };
  
  return colors[priority];
};

/**
 * Get status color classes
 * Colors based on task status
 */
export const getStatusColor = (status: TaskStatus): {
  bg: string;
  text: string;
  border: string;
} => {
  const colors = {
    'todo': {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-700',
    },
    'in-progress': {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    'review': {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
    },
    'done': {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
    },
  };
  
  return colors[status];
};

/**
 * Get category color
 * Colors based on task category
 */
export const getCategoryColor = (category: TaskCategory): string => {
  const colors = {
    'development': 'bg-blue-500',
    'design': 'bg-pink-500',
    'marketing': 'bg-purple-500',
    'testing': 'bg-orange-500',
    'meeting': 'bg-yellow-500',
    'bug-fix': 'bg-red-500',
  };
  
  return colors[category];
};

/**
 * Get priority label
 * Display label for priority
 */
export const getPriorityLabel = (priority: TaskPriority): string => {
  const labels = {
    urgent: '🔥 Urgent',
    high: '⚠️ High',
    medium: '➡️ Medium',
    low: '✅ Low',
  };
  
  return labels[priority];
};

/**
 * Get status label
 * Display label for task status
 */
export const getStatusLabel = (status: TaskStatus): string => {
  const labels = {
    'todo': '📋 To Do',
    'in-progress': '🚀 In Progress',
    'review': '👀 Review',
    'done': '✅ Done',
  };
  
  return labels[status];
};
