# 🛡️ SafeGuard — Women Safety Web App

A comprehensive, modern web application designed for women's safety. SafeGuard provides emergency SOS alerts, real-time location sharing, trusted contacts management, incident reporting, fake call simulation, community boards, and curated safety resources — all in a beautiful, responsive interface.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Educational-green)

---

## ✨ Features

### 🚨 Core Safety
| Feature | Description |
|---|---|
| **SOS / Emergency Button** | One-tap emergency alert with countdown timer; sends alerts to all trusted contacts with your live location |
| **Quick Alerts** | Predefined emergency messages for instant sending without typing |
| **Trusted Contacts** | Add, edit, remove, and prioritize emergency contacts |
| **Live Location Sharing** | Share real-time location with selected contacts |
| **Safety Map** | Interactive Leaflet map showing safe zones, unsafe zones, and nearby safe places |
| **Incident Reporting** | Report and track safety incidents with severity levels |
| **Fake Call** | Simulate an incoming phone call to escape uncomfortable situations |
| **Safety Resources** | Self-defense tips, helpline numbers, and legal rights information |
| **Community Board** | Safety notices and community-sourced updates |
| **Activity Timeline** | Track all app activities, alerts, and events |

### 🎨 UI / UX
- **Modern Design** — Vibrant colors, glassmorphism, and smooth Framer Motion animations
- **Dark Mode** — Full dark mode with one-click theme toggle
- **Responsive** — Mobile-first layout that adapts to all screen sizes
- **Accessible** — Keyboard navigation, ARIA labels, and high-contrast support
- **Multi-Language** — Supports English, Hindi, and Spanish (extensible)
- **Onboarding Flow** — Beautiful multi-step onboarding for first-time users

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 (SWC plugin) |
| **Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM v7 |
| **Maps** | React Leaflet + Leaflet (OpenStreetMap) |
| **Icons** | Lucide React |
| **Linting** | ESLint 9 + TypeScript ESLint |

---

## 📁 Project Structure

```
Women Safety/
├── public/                    # Static assets (favicon, images)
│   ├── fake_call_bg.jpg       # Background image for fake call screen
│   └── vite.svg               # Vite favicon
├── src/
│   ├── assets/                # App-level assets
│   ├── components/            # Reusable UI components
│   │   ├── ActivityTimeline.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ContactCard.tsx
│   │   ├── Header.tsx
│   │   ├── MapView.tsx
│   │   ├── Modal.tsx
│   │   ├── Navigation.tsx
│   │   ├── QuickAlerts.tsx
│   │   ├── SafePlaceCard.tsx
│   │   └── SosButton.tsx
│   ├── contexts/              # React Context providers
│   │   ├── AppContext.tsx      # Global app state (user, contacts, incidents)
│   │   ├── LanguageContext.tsx # Multi-language i18n support
│   │   └── ThemeContext.tsx    # Dark / light mode toggle
│   ├── data/
│   │   └── mockData.ts        # Sample data for development / demo
│   ├── pages/                 # Route-level page components
│   │   ├── CommunityPage.tsx
│   │   ├── ContactsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── IncidentsPage.tsx
│   │   ├── IncomingCallPage.tsx
│   │   ├── LocationPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   ├── OngoingCallPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── ResourcesPage.tsx
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── helpers.ts         # Utility / helper functions
│   │   └── mockApi.ts         # Mock API layer (replace with real backend)
│   ├── App.tsx                # Root component with routing
│   ├── App.css                # App-level styles
│   ├── index.css              # Global / Tailwind base styles
│   └── main.tsx               # Application entry point
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies & scripts
└── package-lock.json          # Lockfile
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** — v18 or higher ([download](https://nodejs.org/))
- **npm** — v9 or higher (comes with Node.js)

### Installation

```bash
# 1. Clone the repository (or download the ZIP)
git clone <your-repo-url>
cd "Women Safety"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at **http://localhost:5173** by default.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot-reload |
| `npm run build` | Type-check with `tsc` and create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the entire project |

---

## 📱 App Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | — | Redirects to `/dashboard` |
| `/dashboard` | Dashboard | Main hub with SOS button, quick alerts, activity timeline |
| `/contacts` | Contacts | Manage trusted emergency contacts |
| `/location` | Location | Interactive safety map with live location sharing |
| `/incidents` | Incidents | Report, view, and track safety incidents |
| `/resources` | Resources | Self-defense tips, helplines, legal rights |
| `/community` | Community | Safety notices and community board |
| `/profile` | Profile | User settings, theme toggle, language selector |
| `/fake-call-incoming` | Fake Call (Incoming) | Simulated incoming call screen |
| `/fake-call-ongoing` | Fake Call (Ongoing) | Simulated ongoing call screen |

> **Note:** On first visit, users are shown a multi-step onboarding flow before accessing the dashboard.

---

## 🔌 Backend Integration Guide

This app is currently **frontend-only** using mock data. All backend integration points are marked with `TODO` comments in the code.

| Area | File(s) | Notes |
|---|---|---|
| Authentication | `src/utils/mockApi.ts` | Replace mock login/signup with real auth |
| Emergency Alerts | `src/contexts/AppContext.tsx` | Connect to SMS / push notification service |
| Location Sharing | `src/pages/LocationPage.tsx` | Needs WebSocket or Server-Sent Events |
| Contacts & Incidents | Various pages | Replace local state with REST API calls |
| Maps & Places | `src/components/MapView.tsx` | Integrate Google Places API or similar |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for **educational and personal use**.

---

<p align="center"><b>Built with ❤️ for women's safety</b></p>
