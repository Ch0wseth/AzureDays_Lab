/**
 * @fileoverview Task API routes.
 * Demonstrates Copilot generating REST API endpoints with error handling.
 */
import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../services/taskService.js';

export const taskRouter = Router();

// GET /api/tasks - List all tasks with optional filters
taskRouter.get('/', (req, res) => {
  const { status, priority } = req.query;
  const tasks = getTasks({ status, priority });
  res.json({ data: tasks, count: tasks.length });
});

// POST /api/tasks - Create a new task
taskRouter.post('/', (req, res) => {
  try {
    const task = createTask(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Update a task
taskRouter.put('/:id', (req, res) => {
  try {
    const task = updateTask(req.params.id, req.body);
    res.json({ data: task });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
taskRouter.delete('/:id', (req, res) => {
  try {
    deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
