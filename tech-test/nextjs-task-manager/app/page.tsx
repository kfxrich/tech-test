'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const STORAGE_KEY = 'task-manager-tasks-nextjs';

type Priority = 'low' | 'normal' | 'high';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  priority: Priority;
};

type FilterType = 'all' | 'active' | 'completed';

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((text: string, priority: Priority = 'normal') => {
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const editTask = useCallback((id: number, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id && newText.trim()
          ? { ...task, text: newText.trim(), updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const setPriority = useCallback((id: number, priority: Priority) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, priority, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const statistics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, percentage };
  }, [tasks]);

  return (
    <main className="min-h-screen flex items-start justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="p-8 pb-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h1 className="text-2xl font-bold mb-2">📋 Task Manager</h1>
          <p className="text-white/90 text-sm">Test 7: Next.js - Full-stack React framework</p>
        </header>

        {/* Form */}
        <section aria-label="Add new task" className="p-6 pb-6 border-b border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.querySelector('input[type="text"]') as HTMLInputElement;
              if (input?.value.trim()) {
                addTask(input.value.trim(), 'normal');
                input.value = '';
              }
            }}
            className="mb-2"
          >
            <div className="flex gap-3">
              <input
                type="text"
                name="task"
                placeholder="What needs to be done? (Press Enter to add)"
                required
                autoComplete="off"
                aria-label="New task description"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 bg-gray-50 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-95 whitespace-nowrap"
              >
                Add Task
              </button>
            </div>
          </form>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="bg-gray-50 px-2 py-1 rounded border border-gray-200 font-mono">Esc</span>
            <span>Clear input</span>
            <span className="bg-gray-50 px-2 py-1 rounded border border-gray-200 font-mono">Enter</span>
            <span>Add task</span>
          </div>
        </section>

        {/* Task List */}
        <section aria-label="Task list" className="p-4 pb-6 max-h-[500px] overflow-y-auto">
          {/* Filter Controls */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['all', 'active', 'completed'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-95 ${
                  filter === f ? 'bg-blue-600 text-white border-blue-600' : ''
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Tasks */}
          <ul className="space-y-2">
            {filteredTasks.length === 0 ? (
              <li className="text-center py-12 italic text-gray-400 bg-transparent border-2 border-dashed border-gray-200 rounded-lg">
                {tasks.length === 0
                  ? 'No tasks yet. Add one above!'
                  : tasks.filter(t => !t.completed).length === 0 &&
                    tasks.filter(t => t.completed).length > 0
                    ? 'No active tasks. Great job!'
                    : 'No completed tasks yet.'}
              </li>
            ) : (
              filteredTasks.map(task => {
                const priorityColors: Record<Priority, string> = {
                  low: '#10b981',
                  normal: '#3b82f6',
                  high: '#ef4444',
                };

                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    priorityColor={priorityColors[task.priority]}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onPriorityChange={setPriority}
                  />
                );
              })
            )}
          </ul>

          {/* Stats */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{statistics.active} active</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>{statistics.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              <span>{statistics.percentage}% done</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">Next: Node.js → Prisma</p>
        </footer>
      </div>
    </main>
  );
}

function TaskItem({
  task,
  priorityColor,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}: {
  task: Task;
  priorityColor: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onPriorityChange: (id: number, priority: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Focus and select edit input when editing starts
  React.useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li
      className={`${task.completed ? 'opacity-50 line-through' : ''} p-4 mb-2 bg-gray-50 rounded-lg flex justify-between items-center gap-4 border border-transparent hover:border-gray-200 transition-all duration-250 focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
      tabIndex={0}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: priorityColor }} />
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleEditSave();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                handleEditCancel();
              }
            }}
            className="flex-1 px-2 py-1 text-sm outline-none focus:outline-none"
            style={{
              outline: '2px solid #3b82f6',
              background: 'white',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
              border: '2px solid #3b82f6',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
            }}
          />
        ) : (
          <span
            className={`task-item-text text-sm flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'} cursor-pointer hover:opacity-80`}
            onDoubleClick={handleEditStart}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <select
          className="px-2 py-1 text-xs border border-gray-200 rounded bg-gray-50 cursor-pointer text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          value={task.priority}
          onChange={(e) => onPriorityChange(task.id, e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        {!isEditing && (
          <button
            className="px-2 py-1 bg-transparent border border-gray-200 rounded transition-all duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            onClick={handleEditStart}
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-red-500/20 active:scale-95"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
