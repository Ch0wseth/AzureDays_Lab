/**
 * @fileoverview Task management service.
 * Demonstrates Copilot's ability to generate business logic with JSDoc.
 * @module services/taskService
 */

/** @typedef {{ id: string, title: string, description: string, status: 'todo'|'in_progress'|'done', priority: 'low'|'medium'|'high', createdAt: string, updatedAt: string }} Task */

/** In-memory task store */
let tasks = [];

/**
 * Creates a new task with validation.
 * @param {Object} taskData - The task data.
 * @param {string} taskData.title - Task title (required, 3-100 chars).
 * @param {string} [taskData.description] - Task description.
 * @param {'low'|'medium'|'high'} [taskData.priority='medium'] - Task priority.
 * @returns {Task} The created task.
 * @throws {Error} If title is invalid.
 */
export function createTask({ title, description = '', priority = 'medium' }) {
  if (!title || title.length < 3 || title.length > 100) {
    throw new Error('Title must be between 3 and 100 characters');
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
    throw new Error(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  const task = {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    status: 'todo',
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

/**
 * Retrieves all tasks with optional filtering.
 * @param {Object} [filters] - Optional filters.
 * @param {'todo'|'in_progress'|'done'} [filters.status] - Filter by status.
 * @param {'low'|'medium'|'high'} [filters.priority] - Filter by priority.
 * @returns {Task[]} Filtered list of tasks.
 */
export function getTasks(filters = {}) {
  let result = [...tasks];

  if (filters.status) {
    result = result.filter((t) => t.status === filters.status);
  }
  if (filters.priority) {
    result = result.filter((t) => t.priority === filters.priority);
  }

  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Updates an existing task.
 * @param {string} id - Task ID.
 * @param {Partial<Task>} updates - Fields to update.
 * @returns {Task} The updated task.
 * @throws {Error} If task not found.
 */
export function updateTask(id, updates) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task not found: ${id}`);
  }

  const allowedUpdates = ['title', 'description', 'status', 'priority'];
  const filtered = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedUpdates.includes(key))
  );

  tasks[index] = {
    ...tasks[index],
    ...filtered,
    updatedAt: new Date().toISOString(),
  };

  return tasks[index];
}

/**
 * Deletes a task by ID.
 * @param {string} id - Task ID.
 * @returns {boolean} True if deleted.
 * @throws {Error} If task not found.
 */
export function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task not found: ${id}`);
  }
  tasks.splice(index, 1);
  return true;
}

/**
 * Gets task analytics/statistics.
 * @returns {{ total: number, byStatus: Object, byPriority: Object }}
 */
export function getTaskStats() {
  return {
    total: tasks.length,
    byStatus: {
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    },
    byPriority: {
      high: tasks.filter((t) => t.priority === 'high').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      low: tasks.filter((t) => t.priority === 'low').length,
    },
  };
}

/** Resets the task store (for testing). */
export function resetTasks() {
  tasks = [];
}

/** Generates a simple unique ID. */
function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
