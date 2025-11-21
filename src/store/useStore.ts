import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Task,
  User,
  ThemeMode,
  TaskStatus,
  TaskFilters,
  SortOption,
} from "../types";

/**
 * ============================================
 * ZUSTAND STORE - Main Data Hub
 * ============================================
 *
 * Zustand Concept:
 * - Single Source of Truth for all data
 * - Any component can read and modify data
 * - Components auto-update when data changes
 *
 * Why Zustand instead of Redux?
 * ✅ Much less code
 * ✅ Easier to understand
 * ✅ Better performance
 * ✅ Minimal boilerplate
 */

interface AppState {
  // ========== State ==========
  tasks: Task[];
  user: User | null;
  theme: ThemeMode;
  filters: TaskFilters;
  sortBy: SortOption;
  isLoading: boolean;

  // ========== Task Actions ==========
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;

  // ========== User Actions ==========
  setUser: (user: User | null) => void;
  logout: () => void;

  // ========== Theme Actions ==========
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // ========== Filter Actions ==========
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: SortOption) => void;

  // ========== Helper Functions ==========
  initializeDemo: () => void; // Demo data
}

/**
 * Function to generate a unique ID
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Main Store
 *
 * persist: saves data to localStorage
 * createJSONStorage: uses localStorage for persistence
 */
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ========== Initial State ==========
      tasks: [],
      user: null,
      theme: "light",
      filters: {},
      sortBy: "newest",
      isLoading: false,

      // ========== Task Actions ==========

      /**
       * Add a new task
       *
       * How it works:
       * 1. Take task data without id & timestamps
       * 2. Automatically add id & timestamps
       * 3. Add task to the beginning of the array
       */
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      /**
       * Update an existing task
       *
       * Partial<Task>: allows updating only part of the task
       * Example: updateTask('123', { title: 'New Title' })
       */
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      /**
       * Delete a task
       *
       * filter: returns a new array without the deleted task
       */
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      /**
       * Move a task from one column to another (Kanban Board)
       *
       * Example: move from 'todo' to 'in-progress'
       */
      moveTask: (id, newStatus) => {
        get().updateTask(id, { status: newStatus });
      },

      // ========== User Actions ==========

      setUser: (user) => set({ user }),

      logout: () => set({ user: null, tasks: [] }),

      // ========== Theme Actions ==========

      /**
       * Toggle between Light and Dark Mode
       */
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";

        // Apply to HTML element
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        set({ theme: newTheme });
      },

      setTheme: (theme) => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme });
      },

      // ========== Filter Actions ==========

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      clearFilters: () => set({ filters: {} }),

      setSortBy: (sortBy) => set({ sortBy }),

      // ========== Demo Data ==========

      /**
       * Demo data for testing
       * Will be removed when using a real API
       */
      initializeDemo: () => {
        const demoTasks: Task[] = [
          {
            id: generateId(),
            title: "Design Main Interface",
            description:
              "Create a professional design for the homepage with attractive colors",
            status: "in-progress",
            priority: "high",
            category: "design",
            dueDate: new Date(
              Date.now() + 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            tags: ["UI", "Design", "Homepage"],
            estimatedHours: 8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: generateId(),
            title: "Fix Bug on Registration Page",
            description: "Users are unable to log in from the browser",
            status: "todo",
            priority: "urgent",
            category: "bug-fix",
            dueDate: new Date(
              Date.now() + 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            tags: ["Bug", "Auth", "Critical"],
            estimatedHours: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: generateId(),
            title: "Write Unit Tests",
            description: "Write tests for the main components",
            status: "review",
            priority: "medium",
            category: "testing",
            dueDate: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
            tags: ["Testing", "Quality"],
            estimatedHours: 10,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        set({ tasks: demoTasks });
      },
    }),
    {
      name: "taskflow-storage", // localStorage key name
      storage: createJSONStorage(() => localStorage),
      // choose what to persist
      partialize: (state) => ({
        tasks: state.tasks,
        user: state.user,
        theme: state.theme,
      }),
    }
  )
);
