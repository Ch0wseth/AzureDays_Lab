/**
 * @fileoverview Main Express application for the Copilot Demo with Orange Boosted UI.
 * Demonstrates GitHub Copilot code generation capabilities.
 */
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { taskRouter } from './routes/tasks.js';
import { analyticsRouter } from './routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// Routes
app.use('/api/tasks', taskRouter);
app.use('/api/analytics', analyticsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Copilot Demo running at http://localhost:${PORT}`);
});

export default app;
