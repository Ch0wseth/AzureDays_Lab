/**
 * @fileoverview Analytics API routes.
 * Demonstrates Copilot generating data aggregation endpoints.
 */
import { Router } from 'express';
import { getTaskStats } from '../services/taskService.js';

export const analyticsRouter = Router();

// GET /api/analytics/stats - Get task statistics
analyticsRouter.get('/stats', (req, res) => {
  const stats = getTaskStats();
  res.json({ data: stats });
});
