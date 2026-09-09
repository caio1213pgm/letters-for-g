# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Letters-for-G** is a Next.js full-stack web application for creating and managing letters. It features user authentication, a rich text editor (Tiptap), and PostgreSQL database integration via Prisma.

### Tech Stack
- **Framework:** Next.js 16.2.6 with App Router
- **Runtime:** Node.js with React 19.2.4
- **Database:** PostgreSQL via Prisma 7.8.0
- **Authentication:** NextAuth.js 5.0.0-beta (JWT-based with Credentials provider)
- **Rich Text Editor:** Tiptap 3.26.0
- **Form Handling:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS 4 with shadcn/ui components
- **Linting:** ESLint 9 with Next.js config

## Architecture

### Route Structure (Next.js App Router with Grouped Routes)

```
app/
├── (public)/              # Public routes - no auth required
│   ├── page.tsx           # Landing page
│   ├── login/
│   ├── register/
│   └── layout.tsx         # Wraps with PublicHeader + PublicFooter
├── (private)/             # Private routes - requires authentication
│   ├── dashboard/         # Main app with Tiptap editor
│   └── layout.tsx         # Wraps with PrivateHeader + SessionProvider
├── api/auth/[...nextauth] # NextAuth.js API route
└── layout.tsx             # Root layout (fonts, metadata, globals.css)
```

### Key Architectural Patterns

1. **Authentication Flow (NextAuth.js)**
   - Credentials provider with email/password stored via bcryptjs
   - JWT-based sessions
   - Config: `src/lib/authConfig.ts`
   - Entry point: `src/auth.ts` (exports `{ handlers, auth, signIn, signOut }`)
   - Session accessible via `SessionProvider` in (private) routes

2. **Database Schema (Prisma)**
   - User model with related Credential (password hash), accounts, sessions
   - Support for OAuth-style Account/Session models (future extensibility)
   - Auto-generates types to `src/generated/prisma/`
   - Client instantiated in `src/lib/prisma.ts`
   - Schema: `prisma/schema.prisma`

3. **Form Validation Pattern**
   - Zod schemas: `src/schemas/*.schema.ts`
   - React Hook Form for form state
   - Form components: `src/components/forms/` (login, register)

4. **Component Organization**
   - `src/components/ui/` - Reusable UI primitives (button, input, card, label)
   - `src/components/layout/` - Page layout wrappers (PublicHeader, PrivateHeader, PublicFooter)
   - `src/components/forms/` - Form components with sub-folders per form
   - `src/components/editor/` - Tiptap editor components
   - `src/components/icons/` - Icon components (GitHub, Google)
   - `src/components/ui/landingPage/` - Landing page sections

5. **Actions (Server-side)**
   - `src/actions/createUser.ts` - User registration logic
   - `src/actions/login.ts` - Credential-based login

## Common Commands

### Development
```bash
npm run dev              # Start dev server at http://localhost:3000 (with hot reload)
```

### Build & Production
```bash
npm run build            # Build for production
npm start                # Run production build
```

### Linting
```bash
npm run lint             # Run ESLint
npm run lint -- --fix   # Auto-fix ESLint issues
```

### Database
```bash
npx prisma migrate dev --name <migration_name>  # Create and run migration
npx prisma migrate deploy                       # Run pending migrations (CI/prod)
npx prisma generate                             # Regenerate Prisma types
npx prisma studio                               # Open Prisma Studio UI
```

## Environment Variables

Required in `.env`:
- `NEXTAUTH_SECRET` - JWT signing secret (32+ hex chars)
- `NEXTAUTH_URL` - Auth callback URL (http://localhost:3000 locally)
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Alias for NEXTAUTH_SECRET (some auth configs read this)

## Key File Locations & Responsibilities

| Path | Purpose |
|------|---------|
| `src/auth.ts` | NextAuth export (handlers, auth, signIn, signOut) |
| `src/lib/authConfig.ts` | NextAuth provider & callback config |
| `src/lib/prisma.ts` | Singleton Prisma client |
| `src/lib/utils.ts` | Shared utility functions (e.g., `cn` for class merging) |
| `src/schemas/` | Zod validation schemas |
| `src/types/` | TypeScript type definitions |
| `src/components/ui/` | Shadcn/ui component library |
| `prisma/schema.prisma` | Database schema definition |
| `prisma/migrations/` | Database migration history |
| `src/generated/prisma/` | Auto-generated Prisma types (do not edit) |

## Development Rules

1. **No new dependencies without asking first** — Before installing packages, ask the user for approval. Evaluate whether existing dependencies can solve the problem.

2. **TypeScript only** — All code must be `.ts` or `.tsx`. Never write plain JavaScript files.

3. **Naming conventions:**
   - React components: `PascalCase` (e.g., `UserProfile.tsx`, `FormLogin.tsx`)
   - Hooks: `use` prefix in `camelCase` (e.g., `useAuth`, `useFetchUser`)
   - UI components: `camelCase` permitted (e.g., `button`, `input`) since they're primitives
   - Regular functions & utilities: `camelCase` (e.g., `formatDate`, `validateEmail`)

4. **No `any` types** — Always provide explicit types. Use `unknown` if the type is truly unknown, then narrow it. Leverage Zod schemas and Prisma-generated types.

## Important Notes

1. **Auto-generated Code:** `src/generated/prisma/` is automatically generated by Prisma. Never edit manually—regenerate with `npx prisma generate` after schema changes.

2. **TypeScript Configuration:** Path alias `@/*` resolves to `src/*`, so import `@/components/Button` instead of relative paths.

3. **Session Management:** Private routes must wrap children in `<SessionProvider>` to access session. Session data includes `user.id`, `user.email`, `user.name`.

4. **Tailwind + PostCSS 4:** Project uses latest Tailwind CSS 4 with new `@import` syntax in `globals.css`. Ensure postcss.config.mjs is not overridden.

5. **Prisma + Vercel Postgres Adapter:** Schema uses `@prisma/adapter-pg` for native PG support. Keep migrations tracked in git.

6. **ESLint:** Uses Next.js config (core-web-vitals + typescript). Run before commits; fix automatically with `--fix`.

7. **Babel React Compiler:** Included as dev dependency—kept for potential future optimization, not currently mandatory in build.
