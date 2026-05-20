/**
 * @fileoverview Unit tests for taskService.
 * Demonstrates Copilot generating comprehensive test suites.
 */
import { jest } from '@jest/globals';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
  resetTasks,
} from '../src/services/taskService.js';

describe('TaskService', () => {
  beforeEach(() => {
    resetTasks();
  });

  describe('createTask', () => {
    it('should create a task with valid data', () => {
      const task = createTask({ title: 'Test task', description: 'A description' });
      expect(task).toMatchObject({
        title: 'Test task',
        description: 'A description',
        status: 'todo',
        priority: 'medium',
      });
      expect(task.id).toMatch(/^task_/);
      expect(task.createdAt).toBeDefined();
    });

    it('should trim title and description', () => {
      const task = createTask({ title: '  Trimmed  ', description: '  Desc  ' });
      expect(task.title).toBe('Trimmed');
      expect(task.description).toBe('Desc');
    });

    it('should throw if title is too short', () => {
      expect(() => createTask({ title: 'ab' })).toThrow('Title must be between 3 and 100 characters');
    });

    it('should throw if title is too long', () => {
      expect(() => createTask({ title: 'a'.repeat(101) })).toThrow('Title must be between 3 and 100 characters');
    });

    it('should throw if title is empty', () => {
      expect(() => createTask({ title: '' })).toThrow();
    });

    it('should throw for invalid priority', () => {
      expect(() => createTask({ title: 'Valid title', priority: 'urgent' })).toThrow('Priority must be one of');
    });

    it('should default priority to medium', () => {
      const task = createTask({ title: 'Test task' });
      expect(task.priority).toBe('medium');
    });
  });

  describe('getTasks', () => {
    beforeEach(() => {
      createTask({ title: 'High priority', priority: 'high' });
      createTask({ title: 'Low priority', priority: 'low' });
      createTask({ title: 'Medium priority' });
    });

    it('should return all tasks', () => {
      const tasks = getTasks();
      expect(tasks).toHaveLength(3);
    });

    it('should filter by priority', () => {
      const tasks = getTasks({ priority: 'high' });
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe('High priority');
    });

    it('should filter by status', () => {
      const tasks = getTasks({ status: 'todo' });
      expect(tasks).toHaveLength(3);
    });

    it('should return empty array for non-matching filter', () => {
      const tasks = getTasks({ status: 'done' });
      expect(tasks).toHaveLength(0);
    });

    it('should sort by creation date descending', () => {
      const tasks = getTasks();
      const dates = tasks.map((t) => new Date(t.createdAt).getTime());
      expect(dates).toEqual([...dates].sort((a, b) => b - a));
    });
  });

  describe('updateTask', () => {
    it('should update allowed fields', () => {
      const task = createTask({ title: 'Original' });
      const updated = updateTask(task.id, { title: 'Updated', status: 'in_progress' });
      expect(updated.title).toBe('Updated');
      expect(updated.status).toBe('in_progress');
    });

    it('should not update disallowed fields', () => {
      const task = createTask({ title: 'Original' });
      const updated = updateTask(task.id, { id: 'hacked', createdAt: '1999-01-01' });
      expect(updated.id).toBe(task.id);
      expect(updated.createdAt).toBe(task.createdAt);
    });

    it('should throw if task not found', () => {
      expect(() => updateTask('nonexistent', { title: 'X' })).toThrow('Task not found');
    });

    it('should update the updatedAt timestamp', () => {
      const task = createTask({ title: 'Original' });
      const updated = updateTask(task.id, { title: 'Updated' });
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(task.updatedAt).getTime()
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', () => {
      const task = createTask({ title: 'To delete' });
      expect(deleteTask(task.id)).toBe(true);
      expect(getTasks()).toHaveLength(0);
    });

    it('should throw if task not found', () => {
      expect(() => deleteTask('nonexistent')).toThrow('Task not found');
    });
  });

  describe('getTaskStats', () => {
    it('should return correct statistics', () => {
      createTask({ title: 'Task 1', priority: 'high' });
      createTask({ title: 'Task 2', priority: 'low' });
      const task3 = createTask({ title: 'Task 3' });
      updateTask(task3.id, { status: 'done' });

      const stats = getTaskStats();
      expect(stats.total).toBe(3);
      expect(stats.byStatus.todo).toBe(2);
      expect(stats.byStatus.done).toBe(1);
      expect(stats.byPriority.high).toBe(1);
    });

    it('should return zeros when no tasks', () => {
      const stats = getTaskStats();
      expect(stats.total).toBe(0);
      expect(stats.byStatus.todo).toBe(0);
    });
  });
});
