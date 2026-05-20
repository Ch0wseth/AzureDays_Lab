/**
 * Frontend JavaScript for the Task Manager.
 * Demonstrates Copilot generating client-side code with fetch API.
 */

const API_BASE = '/api';

// DOM Elements
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const btnRefresh = document.getElementById('btnRefresh');
const btnSaveTask = document.getElementById('btnSaveTask');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadStats();
});

filterStatus.addEventListener('change', loadTasks);
filterPriority.addEventListener('change', loadTasks);
btnRefresh.addEventListener('click', () => { loadTasks(); loadStats(); });
btnSaveTask.addEventListener('click', saveTask);

/**
 * Loads and renders tasks from the API.
 */
async function loadTasks() {
  const params = new URLSearchParams();
  if (filterStatus.value) params.set('status', filterStatus.value);
  if (filterPriority.value) params.set('priority', filterPriority.value);

  try {
    const res = await fetch(`${API_BASE}/tasks?${params}`);
    const { data } = await res.json();
    renderTasks(data);
  } catch (err) {
    taskList.innerHTML = `<div class="alert alert-danger">Erreur: ${err.message}</div>`;
  }
}

/**
 * Renders task cards in the list.
 * @param {Array} tasks - Array of task objects.
 */
function renderTasks(tasks) {
  if (!tasks.length) {
    taskList.innerHTML = '<div class="text-center text-muted py-4">Aucune tâche trouvée. Créez-en une !</div>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <div class="list-group-item task-card priority-${task.priority}" data-id="${task.id}">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h5 class="mb-1">${escapeHtml(task.title)}</h5>
          <p class="mb-1 text-muted small">${escapeHtml(task.description)}</p>
          <small>
            <span class="badge bg-${getStatusColor(task.status)}">${getStatusLabel(task.status)}</span>
            <span class="badge bg-${getPriorityColor(task.priority)}">${task.priority}</span>
          </small>
        </div>
        <div class="btn-group btn-group-sm">
          ${task.status !== 'done' ? `<button class="btn btn-outline-success btn-sm" onclick="advanceTask('${task.id}', '${task.status}')">▶</button>` : ''}
          <button class="btn btn-outline-danger btn-sm" onclick="removeTask('${task.id}')">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Saves a new task from the modal form.
 */
async function saveTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDesc').value;
  const priority = document.getElementById('taskPriority').value;

  if (!title || title.length < 3) {
    alert('Le titre doit contenir au moins 3 caractères.');
    return;
  }

  try {
    await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority }),
    });

    // Reset form & close modal
    document.getElementById('addTaskForm').reset();
    const modal = boosted.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();

    loadTasks();
    loadStats();
  } catch (err) {
    alert(`Erreur: ${err.message}`);
  }
}

/**
 * Advances a task to the next status.
 */
async function advanceTask(id, currentStatus) {
  const nextStatus = currentStatus === 'todo' ? 'in_progress' : 'done';
  await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: nextStatus }),
  });
  loadTasks();
  loadStats();
}

/**
 * Removes a task.
 */
async function removeTask(id) {
  if (!confirm('Supprimer cette tâche ?')) return;
  await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
  loadStats();
}

/**
 * Loads analytics stats.
 */
async function loadStats() {
  try {
    const res = await fetch(`${API_BASE}/analytics/stats`);
    const { data } = await res.json();
    document.getElementById('statTotal').textContent = data.total;
    document.getElementById('statTodo').textContent = data.byStatus.todo;
    document.getElementById('statInProgress').textContent = data.byStatus.in_progress;
    document.getElementById('statDone').textContent = data.byStatus.done;
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// Utility functions
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getStatusColor(status) {
  return { todo: 'warning', in_progress: 'info', done: 'success' }[status] || 'secondary';
}

function getStatusLabel(status) {
  return { todo: 'À faire', in_progress: 'En cours', done: 'Terminé' }[status] || status;
}

function getPriorityColor(priority) {
  return { high: 'danger', medium: 'warning', low: 'success' }[priority] || 'secondary';
}
