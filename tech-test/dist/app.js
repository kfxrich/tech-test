// ============================================
// Task Manager - Test 4: TypeScript (Compiled)
// Type-safe task management transpiled to JavaScript
// ============================================

// ============================================
// Type Definitions (Transpiled)
// ============================================

/**
 * Priority levels for tasks (enum transpiled to const object)
 */
const Priority = {
  Normal: 'normal',
  High: 'high',
  Low: 'low'
};

/**
 * Filter types for task list
 */
// type FilterType = 'all' | 'active' | 'completed'; // Removed in JS

/**
 * Local storage data structure
 */
// interface StorageData { ... } // Removed in JS

/**
 * Statistics interface
 */
// interface TaskStatistics { ... } // Removed in JS

// ============================================
// Constants
// ============================================

const STORAGE_KEY = 'task-manager-tasks-v2';
const STORAGE_VERSION = 2;
const NOTIFICATION_DURATION = 2000;

// ============================================
// State Management
// ============================================

// interface AppState { ... } // Removed in JS

const state = {
  tasks: [],
  currentFilter: 'all',
  selectedIndex: -1
};

// ============================================
// DOM Elements (Type-safe element references)
// ============================================

// interface DOMElements { ... } // Removed in JS

const elements = {
  taskForm: document.getElementById('taskForm'),
  taskInput: document.getElementById('taskInput'),
  taskList: document.getElementById('taskList'),
  taskStats: document.getElementById('taskStats'),
  filterButtons: document.querySelectorAll('.filter-btn')
};

// Validate DOM elements exist
function validateElements() {
  const missing = [];

  if (!elements.taskForm) missing.push('taskForm');
  if (!elements.taskInput) missing.push('taskInput');
  if (!elements.taskList) missing.push('taskList');
  if (!elements.taskStats) missing.push('taskStats');

  if (missing.length > 0) {
    throw new Error(`Missing DOM elements: ${missing.join(', ')}`);
  }
}

// ============================================
// Storage Functions
// ============================================

function saveTasks() {
  try {
    const data = {
      tasks: state.tasks,
      lastUpdated: new Date().toISOString(),
      version: STORAGE_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save tasks:', error);
    showNotification('Failed to save tasks', 3000);
  }
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      state.tasks = [];
      return;
    }

    const data = JSON.parse(stored);

    // Type guard for storage data (runtime check)
    if (!isStorageData(data)) {
      console.warn('Invalid storage data, resetting');
      state.tasks = [];
      return;
    }

    // Migrate old data if version mismatch
    if (data.version !== STORAGE_VERSION) {
      migrateData(data);
    } else {
      state.tasks = data.tasks;
    }
  } catch (error) {
    console.error('Failed to load tasks:', error);
    state.tasks = [];
  }
}

// Type guard for StorageData (runtime validation)
function isStorageData(data) {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const d = data;
  return (
    Array.isArray(d.tasks) &&
    typeof d.lastUpdated === 'string' &&
    typeof d.version === 'number'
  );
}

// Type guard for Task (runtime validation)
function isTask(data) {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const t = data;
  return (
    typeof t.id === 'number' &&
    typeof t.text === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'string' &&
    typeof t.priority === 'string'
  );
}

// Data migration
function migrateData(data) {
  console.log(`Migrating data from version ${data.version} to ${STORAGE_VERSION}`);

  // Add missing fields
  const migratedTasks = data.tasks.map(task => {
    if (!isTask(task)) {
      // Skip invalid tasks
      return null;
    }

    return {
      ...task,
      priority: task.priority || Priority.Normal,
      updatedAt: task.updatedAt || task.createdAt
    };
  }).filter((task) => task !== null);

  state.tasks = migratedTasks;
  saveTasks();
}

// ============================================
// Task Operations
// ============================================

function addTask(text) {
  const task = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    priority: Priority.Normal
  };

  state.tasks.unshift(task);
  saveTasks();
  render();
  return task;
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString();
    saveTasks();
    render();
  }
}

function editTask(id, newText) {
  const task = state.tasks.find(t => t.id === id);
  if (task && newText.trim()) {
    task.text = newText.trim();
    task.updatedAt = new Date().toISOString();
    saveTasks();
    render();
  }
}

function setTaskPriority(id, priority) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.priority = priority;
    task.updatedAt = new Date().toISOString();
    saveTasks();
    render();
  }
}

function clearCompleted() {
  const beforeCount = state.tasks.length;
  state.tasks = state.tasks.filter(task => !task.completed);
  const afterCount = state.tasks.length;
  saveTasks();
  render();

  if (beforeCount > afterCount) {
    showNotification(`Cleared ${beforeCount - afterCount} completed tasks`);
  }
}

// ============================================
// Filter Functions
// ============================================

function getFilteredTasks() {
  switch (state.currentFilter) {
    case 'active':
      return state.tasks.filter(task => !task.completed);
    case 'completed':
      return state.tasks.filter(task => task.completed);
    default:
      return state.tasks;
  }
}

function setFilter(filter) {
  state.currentFilter = filter;
  render();
}

// ============================================
// Statistics
// ============================================

function calculateStatistics() {
  const total = state.tasks.length;
  const completed = state.tasks.filter(task => task.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    active,
    percentage
  };
}

// ============================================
// Rendering
// ============================================

function render() {
  const filteredTasks = getFilteredTasks();

  // Render task list
  if (filteredTasks.length === 0) {
    const emptyMessages = {
      all: 'No tasks yet. Add one above!',
      active: 'No active tasks. Great job!',
      completed: 'No completed tasks yet.'
    };
    elements.taskList.innerHTML = `<li class="empty">${escapeHtml(emptyMessages[state.currentFilter])}</li>`;
  } else {
    elements.taskList.innerHTML = filteredTasks.map(task => renderTaskItem(task)).join('');
  }

  // Update filter button states
  elements.filterButtons.forEach(btn => {
    const filter = btn.dataset.filter;
    btn.classList.toggle('active', filter === state.currentFilter);
  });

  // Update statistics
  updateStats();
}

function renderTaskItem(task) {
  const priorityColors = {
    [Priority.High]: '#ef4444',
    [Priority.Normal]: '#3b82f6',
    [Priority.Low]: '#10b981'
  };

  return `
    <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}" tabindex="0">
      <div class="task-item-content">
        <div class="task-priority" style="background-color: ${priorityColors[task.priority]}"></div>
        <input
          type="checkbox"
          class="task-checkbox"
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})"
          aria-label="Mark ${escapeHtml(task.text)} as ${task.completed ? 'incomplete' : 'complete'}"
        >
        <span class="task-item-text ${task.completed ? 'completed' : ''}" contenteditable="false">
          ${escapeHtml(task.text)}
        </span>
      </div>
      <div class="task-actions">
        <select class="priority-select" onchange="changePriority(${task.id}, this.value)">
          <option value="low" ${task.priority === Priority.Low ? 'selected' : ''}>Low</option>
          <option value="normal" ${task.priority === Priority.Normal ? 'selected' : ''}>Normal</option>
          <option value="high" ${task.priority === Priority.High ? 'selected' : ''}>High</option>
        </select>
        <button class="edit-btn" onclick="enableEdit(${task.id})" title="Edit">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
      </div>
    </li>
  `;
}

function updateStats() {
  const stats = calculateStatistics();
  elements.taskStats.innerHTML = `
    <span class="stat-item">${stats.active} active</span>
    <span class="stat-item">${stats.completed} completed</span>
    <span class="stat-item">${stats.percentage}% done</span>
  `;
}

// ============================================
// Edit Functionality
// ============================================

function enableEdit(id) {
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (!li) return;

  const textSpan = li.querySelector('.task-item-text');
  const task = state.tasks.find(t => t.id === id);

  if (!textSpan || !task) return;

  textSpan.contentEditable = 'true';
  textSpan.focus();
  textSpan.classList.add('editing');

  // Select all text
  const range = document.createRange();
  range.selectNodeContents(textSpan);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  // Event handlers
  textSpan.onkeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEdit(id, textSpan, task);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit(textSpan, task);
    }
  };

  textSpan.onblur = () => {
    finishEdit(id, textSpan, task);
  };
}

function finishEdit(id, textSpan, task) {
  textSpan.contentEditable = 'false';
  textSpan.classList.remove('editing');

  if (textSpan.textContent !== task.text) {
    editTask(id, textSpan.textContent || '');
  }
}

function cancelEdit(textSpan, task) {
  textSpan.contentEditable = 'false';
  textSpan.classList.remove('editing');
  textSpan.textContent = task.text;
}

function changePriority(id, value) {
  const priority = value;
  if (Object.values(Priority).includes(priority)) {
    setTaskPriority(id, priority);
  }
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
  // Form submission
  elements.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = elements.taskInput.value.trim();
    if (text) {
      addTask(text);
      elements.taskInput.value = '';
      showNotification('Task added!');
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape: Clear input
    if (e.key === 'Escape' && document.activeElement === elements.taskInput) {
      elements.taskInput.value = '';
      showNotification('Input cleared');
    }
  });

  // Filter buttons
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) {
        setFilter(filter);
      }
    });
  });

  // Task list keyboard navigation
  elements.taskList.addEventListener('keydown', (e) => {
    const li = e.target.closest('li[data-id]');
    if (!li) return;

    const id = parseInt(li.dataset.id || '0');

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const checkbox = li.querySelector('.task-checkbox');
      if (checkbox) checkbox.click();
    } else if (e.key === 'e' || e.key === 'E') {
      enableEdit(id);
    } else if (e.key === 'd' || e.key === 'D') {
      deleteTask(id);
    }
  });
}

// ============================================
// Notifications
// ============================================

function showNotification(message, duration = NOTIFICATION_DURATION) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#1f2937',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    animation: 'slideInRight 0.3s ease-out',
    zIndex: '1000'
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// ============================================
// Utilities
// ============================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// Initialization
// ============================================

function init() {
  try {
    validateElements();
    loadTasks();
    setupEventListeners();
    render();
    console.log('Task Manager initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Task Manager:', error);
    showNotification('Failed to initialize app', 5000);
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// Expose functions globally for HTML event handlers
// ============================================

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.enableEdit = enableEdit;
window.changePriority = changePriority;
