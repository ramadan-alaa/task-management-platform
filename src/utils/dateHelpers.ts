import { format, formatDistanceToNow, isPast, isFuture, differenceInDays } from 'date-fns';

/**
 * ============================================
 * DATE HELPER UTILITIES
 * ============================================
 * Utility functions for working with dates using date-fns
 */

/**
 * Format date to readable string
 * Converts a date into a readable format
 * 
 * @example
 * formatDate("2025-11-28T10:30:00Z", "MMM dd, yyyy")
 * // Returns: "Nov 28, 2025"
 */
export const formatDate = (
  date: string | Date,
  formatStr: string = 'MMM dd, yyyy'
): string => {
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format date to time-ago string
 * Converts a date into a "time ago" format
 * 
 * @example
 * formatTimeAgo("2025-11-27T10:30:00Z")
 * // Returns: "1 day ago"
 */
export const formatTimeAgo = (date: string | Date): string => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Check if date is in the past
 * Determines whether the given date has already passed
 */
export const isDatePast = (date: string | Date): boolean => {
  return isPast(new Date(date));
};

/**
 * Check if date is in the future
 * Determines whether the given date is upcoming
 */
export const isDateFuture = (date: string | Date): boolean => {
  return isFuture(new Date(date));
};

/**
 * Get days until a specific date
 * Calculates how many days are left until the given date
 * 
 * @example
 * getDaysUntil("2025-12-31")
 * // Returns: 33 (if today is Nov 28)
 */
export const getDaysUntil = (date: string | Date): number => {
  return differenceInDays(new Date(date), new Date());
};

/**
 * Get due-date status and color
 * Returns the deadline status with UI styling info
 * 
 * Returns an object containing:
 * - status: 'overdue' | 'due-soon' | 'upcoming'
 * - color: Tailwind color class
 * - text: human-friendly description
 */
export const getDueDateStatus = (dueDate: string): {
  status: 'overdue' | 'due-soon' | 'upcoming';
  color: string;
  text: string;
} => {
  const daysUntil = getDaysUntil(dueDate);

  if (daysUntil < 0) {
    return {
      status: 'overdue',
      color: 'text-red-600 dark:text-red-400',
      text: `Overdue by ${Math.abs(daysUntil)} days`,
    };
  }

  if (daysUntil === 0) {
    return {
      status: 'due-soon',
      color: 'text-orange-600 dark:text-orange-400',
      text: 'Due today',
    };
  }

  if (daysUntil <= 3) {
    return {
      status: 'due-soon',
      color: 'text-yellow-600 dark:text-yellow-400',
      text: `Due in ${daysUntil} days`,
    };
  }

  return {
    status: 'upcoming',
    color: 'text-green-600 dark:text-green-400',
    text: `Due in ${daysUntil} days`,
  };
};

/**
 * Format date for input fields
 * Formats date to YYYY-MM-DD (HTML date input format)
 */
export const formatDateForInput = (date: string | Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};

/**
 * Get today's date as ISO string
 * Returns the current date in ISO format
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Add days to a date
 * Adds a given number of days to a specific date
 */
export const addDaysToDate = (date: string | Date, days: number): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};
