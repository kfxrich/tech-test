# Tech Proficiency Test

## Test 1: HTML ✅
## Test 2: CSS ✅
## Test 3: JavaScript ✅
## Test 4: TypeScript ✅
## Test 5: React ✅
## Test 6: Tailwind CSS ✅

### What's Tested (Tailwind CSS)

**Tailwind Architecture:**
- Utility-first CSS framework
- JIT (Just-In-Time) compiler via CDN
- Custom theme configuration
- Responsive-first design
- Dark mode support (prefers-color-scheme)

**Tailwind Features Demonstrated:**

**Utility Classes:**
- Layout: `flex`, `grid`, `block`, `hidden`
- Spacing: `p-4`, `m-2`, `gap-3`, `space-y-2`
- Colors: `bg-gray-100`, `text-gray-900`, `bg-primary-600`
- Typography: `text-sm`, `font-medium`, `font-sans`
- Sizing: `w-full`, `max-w-lg`, `h-3`, `w-5`
- Borders: `border`, `rounded-lg`, `border-2`
- Shadows: `shadow-lg`
- Transitions: `transition-all`, `duration-150`

**Responsive Utilities:**
- `max-w-lg` (max-width: 32rem)
- `max-h-[500px]` (custom height)
- Mobile-first breakpoints (default, md, lg)
- Flexbox for responsive layouts

**Custom Theme:**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', ..., 500: '#3b82f6', ... },
        danger: { 50: '#fef2f2', ..., 500: '#ef4444', ... },
        success: { 50: '#ecfdf5', ..., 500: '#10b981', ... }
      }
    }
  }
}
```

**Dark Mode Support:**
```css
@media (prefers-color-scheme: dark) {
  .bg-gray-50 { background-color: #1f2937; }
  .text-gray-900 { color: #f9fafb; }
}
```

**State Variants:**
- `hover:bg-gray-200` — Hover states
- `focus:outline-none` — Remove default outline
- `focus:ring-4` — Focus rings
- `active:scale-95` — Active/click state
- `data-active:bg-primary-600` — Dynamic active states

**Tailwind vs Custom CSS:**

| Aspect | Custom CSS | Tailwind |
|--------|-----------|----------|
| **Approach** | Write CSS classes | Use utility classes |
| **File Size** | Larger (unused styles) | Smaller (JIT purges unused) |
| **Naming** | Custom names | Standard utilities |
| **Consistency** | Manual | Built-in |
| **Maintenance** | Need to update CSS | No CSS files needed |
| **Development** | Write, reload | Write HTML, works |
| **Learning Curve** | CSS basics | Utility classes |

**Tailwind Advantages:**
- **Rapid Development** — No switching between HTML and CSS
- **Consistency** — Standardized design tokens
- **Responsive** — Built-in breakpoints
- **No Build Step** — CDN version for prototyping
- **Customizable** — Tailwind config
- **Production-Ready** — Purges unused CSS

**Utility Classes Examples:**

```html
<!-- Spacing -->
<div class="p-4 mb-2">...</div>

<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">...</div>

<!-- Colors & Backgrounds -->
<div class="bg-gray-50 text-gray-900">...</div>

<!-- Borders & Radius -->
<div class="border border-gray-200 rounded-lg">...</div>

<!-- Transitions -->
<div class="transition-all duration-150 hover:bg-gray-200">...</div>

<!-- Focus States -->
<button class="focus:outline-none focus:ring-4 focus:ring-primary-500/20">...</button>

<!-- Active States -->
<button class="active:scale-95">...</button>

<!-- Dark Mode Support -->
@media (prefers-color-scheme: dark) {
  .bg-gray-50 { background-color: #1f2937; }
}
```

### How to View

```bash
# Clone repo
git clone https://github.com/kfxrich/tech-test.git
cd tech-test

# Open Tailwind version in browser
open tailwind.html
```

### File Structure

```
tech-test/
├── tailwind.html        # Single-file Tailwind app
├── react.html          # React version
├── index.html          # Original vanilla JS version
├── src/
│   └── app.ts       # TypeScript source
├── dist/
│   └── app.js       # Compiled JavaScript
├── styles.css          # Custom CSS version
├── tsconfig.json       # TypeScript config
└── README.md          # Documentation
```

### Tailwind Configuration

The CDN version uses `tailwind.config` in the HTML to customize:
- Custom color palette (primary, danger, success)
- Custom font family
- Custom breakpoints (if needed)

### Next Test

**Next.js** — Full-stack React framework with:
- SSR/SSG (Server-Side Rendering/Static Generation)
- File-based routing
- API routes
- Server components
- Optimization out of the box

### Comparison: All Tests So Far

| Test | Tech | Key Concepts | File |
|-------|-------|--------------|-------|
| 1 | HTML | Semantic structure, forms, accessibility | `index.html` |
| 2 | CSS | Variables, flexbox, responsive | `styles.css` |
| 3 | JavaScript | LocalStorage, events, DOM | `index.html` (script) |
| 4 | TypeScript | Types, interfaces, type guards | `src/app.ts` |
| 5 | React | Components, hooks, virtual DOM | `react.html` |
| 6 | Tailwind CSS | Utility classes, JIT, dark mode | `tailwind.html` |
