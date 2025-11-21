/**
 * ============================================
 * TYPES & INTERFACES for the entire project
 * ============================================
 * Here we define the shape of all the data we will use
 */

// ========== Task Types ==========

/**
 * Possible task states
 * todo: new task
 * in-progress: currently in progress
 * review: under review
 * done: successfully completed
 */
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

/**
 * Task priority
 */
export type TaskPriority = "low" | "medium" | "high" | "urgent";

/**
 * Available task categories
 */
export type TaskCategory =
  | "development"
  | "design"
  | "marketing"
  | "testing"
  | "meeting"
  | "bug-fix";

/**
 * Main task interface
 * Every task in the application will have this structure
 */
export interface Task {
  id: string; // unique identifier
  title: string; // task title
  description: string; // detailed description
  status: TaskStatus; // current status
  priority: TaskPriority; // level of importance
  category: TaskCategory; // category
  dueDate: string; // due date (ISO string)
  tags: string[]; // tags for searching
  assignee?: string; // responsible person (optional)
  estimatedHours?: number; // estimated time
  createdAt: string; // creation date
  updatedAt: string; // last update
}

// ========== User Types ==========

/**
 * User roles
 */
export type UserRole = "admin" | "user" | "guest";

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // image (optional)
  role: UserRole;
  joinedAt: string;
}

// ========== Dashboard Stats ==========

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalTasks: number; // total tasks
  completedTasks: number; // completed tasks
  inProgressTasks: number; // tasks in progress
  overdueTasks: number; // overdue tasks
  completionRate: number; // completion rate (%)
  totalHoursSpent: number; // total hours spent
}

/**
 * Chart data (for Recharts)
 */
export interface ChartData {
  name: string; // column/point name
  value: number; // value
  color?: string; // color (optional)
}

// ========== Theme Types ==========

/**
 * Theme mode
 */
export type ThemeMode = "light" | "dark";

// ========== Filter & Sort Types ==========

/**
 * Filtering options
 */
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  category?: TaskCategory[];
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * Sorting options
 */
export type SortOption = "newest" | "oldest" | "priority" | "dueDate" | "title";

// ========== Form Types ==========

/**
 * Form data for creating/updating a task
 */
export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
  tags: string[];
  estimatedHours?: number;
}

/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
