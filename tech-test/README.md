# Tech Proficiency Test

## Test 1: HTML ✅
## Test 2: CSS ✅
## Test 3: JavaScript ✅
## Test 4: TypeScript ✅

### What's Tested (TypeScript)

**TypeScript Architecture:**
- Strict type checking enabled
- Interfaces for data structures
- Enums for constants
- Type guards for runtime validation
- Type-safe DOM manipulation

**TypeScript Features Demonstrated:**

**Type System:**
- `interface Task` — Core task data structure
- `interface StorageData` — Local storage schema
- `interface TaskStatistics` — Statistics data
- `enum Priority` — Priority levels (Low, Normal, High)
- `type FilterType` — Filter union type
- Type guards (`isTask`, `isStorageData`)

**Type Safety:**
- Compile-time error catching
- Null checks throughout
- Type assertions where needed
- Strict mode enabled
- No implicit any

**Advanced TypeScript:**
- Type guards for runtime validation
- Data versioning and migration
- Interface inheritance
- Generic constraints
- Union types
- Literal types

**Type-Safe DOM:**
- `HTMLFormElement`, `HTMLInputElement`, `HTMLUListElement`
- Typed element references
- DOM validation at startup
- Type-safe event handlers

**New Features (TypeScript Edition):**
- **Priority levels** — Low (green), Normal (blue), High (red)
- Priority dropdown per task
- Color-coded priority indicators
- Data versioning system (v2)
- Migration support for old data

**TypeScript Benefits:**
- Better IDE autocomplete
- Catch bugs before runtime
- Self-documenting code
- Safer refactoring
- Better developer experience

### Building the Project

```bash
# Install dependencies
npm install

# Install TypeScript (dev dependency)
npm install -D typescript

# Compile TypeScript to JavaScript
npx tsc

# The compiled output goes to dist/app.js
```

### How to View

```bash
# Clone the repo
git clone https://github.com/kfxrich/tech-test.git
cd tech-test

# Build TypeScript
npm install
npx tsc

# Open in browser
open index.html
```

### TypeScript Project Structure

```
tech-test/
├── tsconfig.json       # TypeScript configuration
├── src/
│   └── app.ts        # TypeScript source code
├── dist/
│   └── app.js        # Compiled JavaScript
├── index.html        # Main HTML (loads dist/app.js)
├── styles.css        # Styling
└── README.md        # Documentation
```

### TypeScript Configuration Highlights

```json
{
  "compilerOptions": {
    "strict": true,           // Enable strict type checking
    "target": "ES2020",      // Modern JavaScript features
    "module": "ESNext",      // ES module support
    "declaration": true,      // Generate .d.ts files
    "sourceMap": true        // Debug source maps
  }
}
```

### Next Test

**React** → Component-based architecture, virtual DOM, hooks

### Comparison: JavaScript vs TypeScript

| Aspect | JavaScript | TypeScript |
|--------|-----------|-------------|
| Type Safety | Runtime errors only | Compile-time checking |
| IDE Support | Basic autocomplete | Full IntelliSense |
| Refactoring | Risky | Type-safe |
| Documentation | Comments needed | Self-documenting |
| Learning Curve | Low | Medium |
| Debugging | Stack traces only | Source maps + types |
