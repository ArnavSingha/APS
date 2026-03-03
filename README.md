# APS — Fenrir Security Frontend

A production-grade React frontend for a B2B SaaS cybersecurity platform, built with **Vite**, **React 19**, and **React Router**.

## 🎯 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| **Login / Sign-up** | `/` | Split-layout page with gradient branding panel, feature list, and registration form |
| **Dashboard** | `/dashboard` | Severity stats, scan table with search/filter, status chips, progress bars, vulnerability badges |
| **Active Scan Detail** | `/scan/:id` | Progress ring, 5-step tracker, live console with activity logs, finding log, status bar |

All three screens support **dark mode** and **light mode** with a sidebar theme toggle.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app opens at [http://localhost:5173](http://localhost:5173).

## 🏗️ Architecture

```
src/
├── components/         # Shared UI components
│   ├── AppLayout       # Sidebar + header + content wrapper
│   ├── Sidebar         # Navigation with theme toggle
│   ├── ProgressRing    # SVG circular progress
│   ├── SeverityBadge   # Colored vulnerability count pill
│   ├── StatusChip      # Status label (Completed/Scheduled/Failed)
│   ├── FindingCard     # Vulnerability finding card
│   └── Toast           # Toast notification system (context-based)
├── context/
│   └── ThemeContext     # Dark/light mode state management
├── data/
│   └── mockData.js     # Realistic mock data for all screens
├── pages/
│   ├── LoginPage       # Screen 1 — Sign-up page
│   ├── DashboardPage   # Screen 2 — Scan list overview
│   └── ScanDetailPage  # Screen 3 — Active scan detail
└── styles/
    ├── variables.css   # Design tokens (colors, typography, spacing)
    ├── reset.css       # Minimal CSS reset
    └── animations.css  # Page transitions, skeletons, micro-animations
```

## 🎨 Design System

- **CSS Custom Properties** for theming — all colors, spacing, and typography are tokenized
- **Dark/Light mode** via `data-theme` attribute on `<html>`, persisted to `localStorage`
- **Inter** font from Google Fonts
- **Responsive** — all screens adapt for desktop, tablet, and mobile

## ✨ Features

- **Toast notifications** — slide-in with auto-dismiss (info / success / error)
- **Skeleton loading** — shimmer placeholders while data loads on dashboard
- **Staggered animations** — stat cards animate in sequentially
- **Keyboard navigation** — table rows are keyboard-focusable with Enter to navigate
- **ARIA attributes** — roles, live regions, labels throughout
- **Search filtering** — real-time filtering of scan table
- **Tab switching** — Activity Log / Verification Loops in the console

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite** | Build tool & dev server |
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **Vanilla CSS** | Styling with CSS custom properties |
| **Inter** | Typography (Google Fonts) |

## 📱 Responsive Breakpoints

- **Desktop** (> 900px) — Full sidebar + content layout
- **Tablet** (≤ 900px) — Sidebar collapses to overlay; 2-column stat cards
- **Mobile** (≤ 480px) — Single-column layout; stacked panels

## ⚠️ Known Limitations

- **No real backend** — All data is hardcoded mock data in `src/data/mockData.js`. No API calls are made.
- **No authentication** — The login form performs client-side validation only; there is no session management, token storage, or protected routes.
- **Static scan data** — The scan progress (0%) and step tracker do not advance in real-time; they display a fixed snapshot of a scan in progress.
- **Sidebar links** — Only Dashboard and Scans are navigable. Other sidebar items (Projects, Schedule, Notifications, Settings, Support) are placeholder links.
- **Single scan detail** — All scan rows navigate to the same scan detail page (`/scan/scan-001`); there is no unique detail per scan entry.
- **No form persistence** — Login form data is not stored or validated against a user database.
- **No i18n** — The application is in English only with no internationalization support.
