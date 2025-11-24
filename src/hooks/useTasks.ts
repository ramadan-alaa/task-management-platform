import { useStore } from "../store/useStore";
import type { TaskStatus } from "../types/index";
import { useMemo } from "react";

/**
 * Custom Hook for managing tasks
 *
 * Why Custom Hooks?
 * - Keeps logic separate from UI
 * - Makes code reusable
 * - Easier to read and test
 */

export const useTasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useStore();

  // Filter tasks by status (optimized using useMemo)
  const tasksByStatus = useMemo(() => {
    return {
      todo: tasks.filter((t) => t.status === "todo"),
      inProgress: tasks.filter((t) => t.status === "in-progress"),
      review: tasks.filter((t) => t.status === "review"),
      done: tasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  // Task statistics
  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "done").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      overdue: tasks.filter(
        (t) => new Date(t.dueDate) < new Date() && t.status !== "done"
      ).length,
    }),
    [tasks]
  );

  // Move a task between columns
  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  return {
    tasks,
    tasksByStatus,
    stats,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
};
