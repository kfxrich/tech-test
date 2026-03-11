# Tech Proficiency Test

## Test 1: HTML ✅
## Test 2: CSS ✅
## Test 3: JavaScript ✅
## Test 4: TypeScript ✅
## Test 5: React ✅

### What's Tested (React)

**React Architecture:**
- Component-based architecture
- React Hooks (useState, useEffect, useMemo, useCallback, useRef)
- Custom hooks for reusability
- Virtual DOM for performance
- Declarative UI patterns

**React Features Demonstrated:**

**Core Hooks:**
- `useState` — Component state management
- `useEffect` — Side effects and lifecycle
- `useMemo` — Memoized computations
- `useCallback` — Optimized event handlers
- `useRef` — DOM references and persisting values

**Custom Hooks:**
- `useLocalStorage` — Persistent state with localStorage
- `useTaskManager` — Task management logic encapsulation

**Component Structure:**
- `<App>` — Main container component
- `<Header>` — Header display
- `<TaskForm>` — Add new tasks
- `<FilterControls>` — Filter tabs
- `<TaskList>` — Task list container
- `<TaskItem>` — Individual task
- `<TaskStats>` — Statistics display
- `<Footer>` — Footer

**React Patterns:**
- State lifting (child to parent communication)
- Props drilling (controlled components)
- Conditional rendering
- List rendering with keys
- Event handling with React
- Double-click to edit pattern

**Performance Optimizations:**
- `useCallback` — Prevent unnecessary re-renders
- `useMemo` — Cache expensive computations
- Component memoization opportunities
- Key props for list items

**Declarative vs Imperative:**

**Before (Imperative - JavaScript/TypeScript):**
```javascript
const li = document.querySelector(`li[data-id="${id}"]`);
li.classList.add('completed');
```

**After (Declarative - React):**
```jsx
<TaskItem completed={task.completed} />
```

**React-Specific Features:**
- Double-click to edit tasks
- Auto-focus edit input
- Enter to save, Escape to cancel
- Real-time statistics updates
- Optimized re-renders

### How to View

```bash
# Clone repo
git clone https://github.com/kfxrich/tech-test.git
cd tech-test

# Open React version in browser
open react.html
```

### React Dependencies (CDN)

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### React File Structure

```
react.html (Single-file React app)
├── Components
│   ├── App
│   ├── Header
│   ├── TaskForm
│   ├── FilterControls
│   ├── TaskList
│   ├── TaskItem
│   ├── TaskStats
│   └── Footer
├── Custom Hooks
│   ├── useLocalStorage
│   └── useTaskManager
└── Main Logic
    └── createRoot + render
```

### Key React Concepts Demonstrated

| Concept | Description | Implementation |
|----------|-------------|----------------|
| **State** | Component state | `useState` hook |
| **Effects** | Side effects | `useEffect` hook |
| **Memoization** | Performance | `useMemo`, `useCallback` |
| **Refs** | DOM access | `useRef` hook |
| **Custom Hooks** | Logic reuse | `useLocalStorage`, `useTaskManager` |
| **Props** | Data flow | Props drilling |
| **Events** | User interaction | React event handlers |
| **Keys** | List optimization | `key={task.id}` |

### Next Test

**Tailwind CSS** → Utility-first styling, rapid development, responsive design

### Comparison: JavaScript/TypeScript vs React

| Aspect | JS/TS | React |
|--------|----------|-------|
| **UI Updates** | Manual DOM manipulation | Declarative, automatic |
| **State** | Variables + manual updates | `useState` hook |
| **Components** | Functions | JSX components |
| **Reusability** | Functions | Custom hooks + components |
| **Learning Curve** | Lower | Higher |
| **Performance** | Manual optimization | Virtual DOM + automatic |
| **Tooling** | Simple | Build tools (Vite, CRA, Next) |
