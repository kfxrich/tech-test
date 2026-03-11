# Tech Proficiency Test

## Test 1: HTML ✅
## Test 2: CSS ✅
## Test 3: JavaScript ✅
## Test 4: TypeScript ✅
## Test 5: React ✅
## Test 6: Tailwind CSS ✅
## Test 7: Next.js ✅

### What's Tested (Next.js)

**Next.js Architecture:**
- Full-stack React framework (v14)
- App Router (file-based routing)
- Server Components (default)
- Client Components (with `'use client'` directive)
- TypeScript support (built-in)

**Next.js Features Demonstrated:**

**App Router:**
- File-based routing (`app/layout.tsx`, `app/page.tsx`)
- Automatic code splitting
- Route groups (if needed)
- Nested layouts

**Server vs Client Components:**
- `'use client'` — For interactive components with hooks
- Server Components — Default, render on server for better performance
- Data fetching at edge (if deployed to Vercel)

**TypeScript:**
- Native TypeScript support
- `tsconfig.json` with Next.js plugin
- Type-safe routing
- No build step needed

**React Integration:**
- React 18 with App Router
- Server Components by default
- Client Components with `'use client'`
- Streamed rendering (SSR)

**Performance Features:**
- SWC Minification (Faster than Babel)
- Automatic code splitting
- Image optimization (built-in)
- Font optimization
- Static generation (SSG) capability

**Next.js Concepts:**

**Layout System:**
```typescript
// app/layout.tsx - Root layout
export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
```

**Page Routes:**
```typescript
// app/page.tsx - Main page
export default function Page() {
  return <main>...</main>;
}
```

**Client Components:**
```typescript
'use client'; // Marks as client component

export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>{state}</div>;
}
```

**Server Components:**
```typescript
// No 'use client' = Server Component (default)
export default function ServerComponent({ data }) {
  return <div>{data}</div>;
}
```

### How to Run

```bash
# Navigate to Next.js project
cd nextjs-task-manager

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Then open: http://localhost:3000

### Next.js Project Structure

```
nextjs-task-manager/
├── app/
│   ├── layout.tsx       # Root layout (Server Component)
│   ├── page.tsx        # Main page (Client Component)
│   └── globals.css      # Global styles
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.js        # Next.js config
├── node_modules/         # (npm install creates this)
├── .next/               # (Build output)
└── README.md            # This file
```

### Next.js Routing Examples

```typescript
// File-based routing automatically creates routes:

app/
├── page.tsx          → /
├── about/page.tsx     → /about
├── dashboard/page.tsx  → /dashboard
└── api/
    ├── tasks/route.ts  → /api/tasks (API route)
    └── auth/route.ts   → /api/auth (API route)
```

### Next.js vs Create React App (CRA)

| Feature | Next.js | CRA |
|---------|----------|------|
| **Rendering** | SSR/SSG (default) | Client-side only |
| **Routing** | File-based (App Router) | React Router (manual) |
| **Performance** | Code splitting auto | Manual splitting |
| **API Routes** | Built-in `/api/*` | Need separate server |
| **Deployment** | Vercel, Netlify optimized | Any static host |
| **Image Opt** | Built-in | External libraries |
| **Server Components** | Yes | No |

### Next.js Benefits

**Performance:**
- Server Components reduce client bundle size
- Automatic code splitting
- SWC compilation (10x faster than Babel)
- Edge runtime support

**Developer Experience:**
- File-based routing (no config needed)
- TypeScript out of the box
- Fast refresh for development
- Built-in API routes
- Optimized images & fonts

**Production-Ready:**
- SEO optimization (metadata API)
- Static generation (SSG)
- Server-side rendering (SSR)
- Incremental Static Regeneration (ISR)

### Next Test

**Node.js** → Backend API, Express.js server, database connections

### Test Summary So Far

| Test | Tech | Key Concepts | Complexity |
|-------|-------|--------------|------------|
| 1 | HTML | Semantic structure, forms | ⭐ |
| 2 | CSS | Variables, flexbox, responsive | ⭐⭐ |
| 3 | JavaScript | LocalStorage, events, DOM | ⭐⭐ |
| 4 | TypeScript | Types, interfaces, type guards | ⭐⭐⭐ |
| 5 | React | Components, hooks, virtual DOM | ⭐⭐⭐⭐ |
| 6 | Tailwind CSS | Utility classes, JIT, theming | ⭐⭐ |
| 7 | Next.js | SSR, App Router, server components | ⭐⭐⭐⭐⭐ |
