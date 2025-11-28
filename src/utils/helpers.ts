/**
 * ============================================
 * HELPER UTILITIES
 * ============================================
 * Helper functions used across the entire project
 */

/**
 * Generate a unique ID
 * Used to create unique IDs for tasks
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Truncate text with ellipsis
 * Cuts long text and adds "..."
 * 
 * @example
 * truncate("This is a very long text", 10) 
 * // Returns: "This is a..."
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Debounce function
 * Delays executing a function until the user finishes typing
 * Very useful for Search fields
 * 
 * @example
 * const debouncedSearch = debounce((query) => {
 *   console.log('Searching for:', query);
 * }, 500);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if date is overdue
 * Determines whether a task is overdue
 */
export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

/**
 * Calculate completion percentage
 * Computes the completion rate percentage
 */
export const calculateCompletionRate = (
  completed: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Format number with commas
 * Formats numbers with commas
 * 
 * @example
 * formatNumber(1234567) // Returns: "1,234,567"
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Get initials from name
 * Extract the first letters of a name (for Avatar)
 * 
 * @example
 * getInitials("Ramadan Alaa") // Returns: "RA"
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 * Randomly shuffles the elements of an array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Group array by key
 * Groups an array by a specific property
 * 
 * @example
 * const tasks = [{ id: 1, status: 'todo' }, { id: 2, status: 'todo' }];
 * groupBy(tasks, 'status')
 * // Returns: { todo: [... ] }
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Deep clone object
 * Deep copies an object (not by reference)
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * Checks whether an object has no properties
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};
