# HR Management Portal

A production-grade Human Resources management system built with Next.js 14, TypeScript, and Supabase. Designed to demonstrate enterprise-level frontend patterns including real-time data, optimistic UI updates, and a SAP Fiori-inspired design system.

## Features

- **Dashboard** with KPI cards, headcount trend chart, department breakdown, seniority distribution, and recent hires
- **Employee directory** with server-filtered search, multi-column filters, and TanStack Table v8 pagination
- **CRUD operations** — create, edit, and delete employees via modal forms with Zod validation
- **Optimistic updates** — UI reflects changes instantly before the server confirms, with automatic rollback on error
- **Real-time notifications** — Supabase Realtime pushes live events (new hire, update, delete) to a notification inbox without polling
- **CSV export** — exports the current filtered dataset with one click
- **Dark / Light / System theme** toggle
- **SAP Fiori-inspired design** — system font stack, SAP Blue (`#0070f2`) as primary color, enterprise layout with fixed sidebar

## Pages

### /dashboard
KPI cards (total headcount, active employees, turnover rate, avg. tenure), headcount trend line chart with cumulative overlay and monthly average reference line, department bar chart, seniority donut chart, and a recent hires feed.

### /employees
Full data table with avatar, name, email, area badge, seniority badge, status badge, and hire date. Filters by name/email search, area, seniority, and status. Add Employee and Export CSV buttons in the toolbar. Per-row actions: view profile, edit, delete.

### /employees/[id]
Employee profile with large avatar, status/area/seniority badges, and detail cards for email, hire date, tenure, department, and seniority level. Employment details section with employee ID, record creation date, and current status. Inline edit button.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (base-ui) |
| Data tables | TanStack Table v8 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod v4 |
| Charts | Recharts v3 |
| Backend / DB | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime (postgres_changes) |

## Architecture

```
src/
├── app/                        # Next.js App Router pages
│   ├── dashboard/page.tsx
│   ├── employees/page.tsx
│   │   └── [id]/page.tsx
│   └── providers.tsx           # TanStack Query + ThemeProvider
├── components/
│   ├── layout/                 # AppShell, Sidebar, Header
│   │   ├── NotificationBell.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── UserMenu.tsx
│   ├── dashboard/              # KPICard, charts, DashboardSkeleton
│   ├── employees/              # Table, filters, form modal, delete dialog
│   └── profile/                # EmployeeProfile
├── hooks/
│   ├── useEmployees.ts         # TanStack Query read hooks
│   ├── useEmployeeMutations.ts # Optimistic create/update/delete
│   └── useNotifications.ts     # Supabase Realtime subscription
├── lib/
│   ├── supabase.ts
│   ├── exportCsv.ts
│   └── validations/employee.schema.ts
└── types/employee.ts
```

## Key Patterns

**Optimistic updates** — `useUpdateEmployee` and `useDeleteEmployee` use TanStack Query's `onMutate` to immediately patch all cached query variants via `setQueriesData`, then roll back on error using a saved snapshot. No visible latency on user actions.

**Realtime notifications** — `useNotifications` opens a single Supabase channel with `postgres_changes` listeners for INSERT, UPDATE, and DELETE. A `useRef` guard prevents double-subscription in React StrictMode. INSERT events also invalidate the TanStack Query cache, keeping all views in sync without polling.

**Query key factory** — `employeeKeys` provides a structured key hierarchy (`all → lists → list(filters) → detail(id)`), enabling surgical cache invalidation by prefix across all active queries.

**Server vs Client components** — layout wrappers, KPI cards, and profile cards are Server Components. Interactive elements (table, filters, modals, charts, notification bell) are Client Components marked with `"use client"`.

## Why this project?

Built to demonstrate:

- **Enterprise UI architecture** — fixed sidebar shell, sticky header, responsive grid layout aligned with SAP Fiori design conventions
- **Advanced TanStack Query** — optimistic mutations with rollback, query key factory, cross-cache patching via `setQueriesData`
- **Supabase Realtime** — websocket-based live updates without polling or manual refresh
- **TypeScript discipline** — strict mode throughout, no `any`, Zod v4 schemas inferred end-to-end from validation to mutation input
- **UX detail** — structured skeleton screens that mirror real content layout, empty states, error boundaries, and toast feedback on every action
