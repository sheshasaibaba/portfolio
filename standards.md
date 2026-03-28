# Portfolio Project Standards & Performance Guidelines

## Core Tech Stack
* **Framework:** Next.js (App Router) — **Server Components by default.**
* **Language:** TypeScript (Strict).
* **Styling:** Tailwind CSS (v4 preferred) + Shadcn UI.
* **State:** Zustand (Minimalist UI state only).
* **Performance:** `@tanstack/react-virtual` (for long lists), `next/dynamic`.
* **Animation:** CSS-first transitions, Framer Motion (only where CSS fails).

---

## 🚀 The "Performance First" Architecture
Since this is a single-page continuous scroll portfolio, initial load (LCP) is the most critical metric.

### 1. Server Component Supremacy
* **Rule:** Every section (Hero, About, Experience) must be a **Server Component** unless it requires interactivity.
* **Goal:** 0kb JavaScript sent for the initial text and layout rendering.
* **Implementation:** Keep `'use client'` at the "leaves" of the component tree (e.g., a specific button or a particle container, not the entire section).

### 2. Heavy Library Strategy (The "Chunking" Fix)
* **Rule:** Any heavy third-party library (Particles.js, Three.js, Lottie) **MUST** be dynamically imported with `ssr: false`.
* **Loading States:** Always provide a lightweight CSS/Image placeholder while the "fancy" JS is loading.
```typescript
const ParticleBackground = dynamic(() => import('@/components/visuals/Particles'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-portfolio-dark" />
});
```

### 3. Image & Asset Excellence
* **next/image:** Use the `priority` attribute for the Hero image. 
* **Formats:** Use `.webp` or `.avif` for all project screenshots.
* **Icons:** Use named imports from `lucide-react` to allow tree-shaking. Never use `import * as Icon`.

---

## 🛠 Coding Standards

### Clean Code & Data
* **No API Overkill:** Since there is no backend, store all portfolio data (projects, jobs, skills) in `@/constants/data.ts`.
* **DRY Logic:** Extract repeated UI patterns (e.g., Section Headers, Card wrappers) into small, composable components.
* **Naming:** * Components: PascalCase (e.g., `ProjectCard.tsx`).
    * Utils/Hooks: camelCase (e.g., `useScrollSpy.ts`).
    * Booleans: Prefix with `is`, `has`, `should`.

### Animation & CSS
* **Prefer CSS:** Use Tailwind for hover states, simple fades, and pulses. Avoid JavaScript-driven animations for simple UI feedback.
* **GPU Acceleration:** Use `will-change-transform` for elements with heavy continuous animations (like particle containers).
* **Virtualization:** If rendering more than 20 project cards or a long history list, use `@tanstack/react-virtual`.

---

## 📂 File & Folder Structure
```text
/app             # Next.js App Router (RSC Pages & Layouts)
/components
  /ui            # Shadcn Primitives (keep clean)
  /sections      # Hero, About, Projects, Contact (The "Blocks")
  /visuals       # Particles, Backgrounds, Canvas-based FX
/constants       # data.ts (The single source of truth for your content)
/hooks           # useScrollPosition, useActiveSection
/lib             # utils.ts (cn helper)
/types           # Portfolio specific interfaces
```

---

## ✅ Pre-Commit Checklist
- [ ] **RSC Check:** Is the Hero section content visible without JavaScript enabled?
- [ ] **Dynamic Imports:** Are all "fancy" libraries dynamically loaded?
- [ ] **Asset Check:** Does every `next/image` have a defined width/height?
- [ ] **Clean Bundle:** No `console.log` or unused TanStack/Zod/RHF libraries.
- [ ] **Accessibility:** Does the continuous scroll maintain a logical tab order for keyboard users?
