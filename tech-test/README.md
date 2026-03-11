# Tech Proficiency Test

## Test 1: HTML ✅
## Test 2: CSS ✅
## Test 3: JavaScript ✅

### What's Tested (JavaScript)

**JavaScript Architecture:**
- State management with in-memory state
- Local storage persistence
- Event-driven architecture
- Modular function design
- Clean separation of concerns

**JavaScript Features Demonstrated:**

**State Management:**
- Centralized `tasks` array
- Filter state (`all`, `active`, `completed`)
- Reactive rendering pattern

**Local Storage:**
- Save tasks to `localStorage`
- Load tasks on page load
- Graceful error handling for quota exceeded

**Task Operations:**
- `addTask(text)` — Create new task
- `deleteTask(id)` — Remove task
- `toggleTask(id)` — Mark complete/incomplete
- `editTask(id, newText)` — Update task text
- `clearCompleted()` — Bulk delete completed tasks

**Rendering System:**
- Filter-based task display
- Dynamic HTML generation with template literals
- Real-time statistics (active, completed, percentage)
- Empty state messages

**Keyboard Shortcuts:**
- `Enter` — Add task
- `Escape` — Clear input
- `↑/↓` — Navigate tasks (tab index 0)
- `Enter/Space` — Toggle checkbox
- `E` — Edit task
- `D` — Delete task

**Edit Functionality:**
- Inline editing with `contenteditable`
- Save on Enter or blur
- Cancel on Escape
- Select all text on edit start

**UI Features:**
- Toast notifications
- Filter buttons (All, Active, Completed)
- Task statistics footer
- Checkbox for completion
- Edit and delete buttons per task

**Event Listeners:**
- Form submit
- Keyboard shortcuts (document-level)
- Filter buttons
- Task list interactions
- Edit mode handling

**Security:**
- XSS protection via `escapeHtml()` function
- Input validation and sanitization

**Performance:**
- Efficient DOM updates (batched re-renders)
- Local storage for instant load
- Minimal reflows/repaints

### Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| `Enter` | Add task / Toggle completion |
| `Escape` | Clear input / Cancel edit |
| `E` | Edit focused task |
| `D` | Delete focused task |

### How to View
```bash
git clone https://github.com/kfxrich/tech-test.git
cd tech-test/tech-test
open index.html
```

### Next Test
**TypeScript** → Add type safety, interfaces, better developer experience
