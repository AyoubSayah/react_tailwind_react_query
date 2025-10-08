
🧩 Modular React Application

This project is a scalable modular React application built with Vite and organized for production-grade development.
It follows a clean, modular architecture, includes mocked APIs, and uses React Query with TanStack Router for efficient data handling and navigation.
The design is improved with Tailwind CSS, React Icons, and modern UX patterns.

🚀 Tech Stack
Category	Tools / Libraries
Framework	React 18+

Build Tool	Vite

Routing	TanStack Router

Data Fetching	React Query

Mock API	MSW (Mock Service Worker)

Styling	Tailwind CSS

Icons	React Icons


Component Docs	Storybook

E2E Testing	Playwright

Package Manager	pnpm

![flow](https://raw.githubusercontent.com/AyoubSayah/react_tailwind_react_query/refs/heads/develop/public/flow.png)
```

📁 Project Structure
src/
│
├─ app/                      # Application core (logic & providers)
│   ├─ api/                  # API abstraction layer
│   │   ├─ clientApi.ts
│   │   ├─ authApi.ts
│   │   └─ ...
│   ├─ mocks/                # Mock Service Worker setup
│   │   ├─ handlers/
│   │   │   ├─ clientHandlers.ts
│   │   │   └─ authHandlers.ts
│   │   ├─ browser.ts
│   │   └─ server.ts
│   ├─ providers/            # Global providers
│   │   ├─ AuthProtector.tsx
│   │   └─ RouteProvider.tsx
│   └─ index.ts              # App-level exports
│
├─ components/               # Shared UI components
│   ├─ Loader/
│   │   ├─ Loader.tsx
│   │   └─ Loader.stories.tsx
│   ├─ Card/
│   │   ├─ Card.tsx
│   │   └─ Card.stories.tsx
│   └─ ...
│
├─ layout/                   # Private application layout
│   ├─ PrivateLayout.tsx
│   ├─ Navbar.tsx
│   └─ Sidebar.tsx
│
├─ modules/                  # Feature-based pages (modular routing)
│   ├─ login/
│   │   └─ index.tsx
│   ├─ dashboard/
│   │   └─ index.tsx
│   ├─ clients/
│   │   └─ index.tsx
│   └─ ...
│
├─ router/                   # TanStack Router configuration
│   ├─ routes.tsx
│   └─ index.tsx
│
├─ tests/                    # Playwright end-to-end tests
│   ├─ login.spec.ts
│   ├─ dashboard.spec.ts
│   └─ ...
│
└─ main.tsx                  # App entry (React + Router + Providers)
```

⚙️ Installation & Setup
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/yourproject.git
cd yourproject

# 2️⃣ Install dependencies using pnpm
pnpm install

# 3️⃣ Run the development server
pnpm dev

# 4️⃣ Run Storybook
pnpm storybook

🔗 Environment Variables



🧠 Architecture Overview
🧱 Modular Page Structure

Each feature resides in /modules as an isolated unit, containing:

A main index.tsx file

Optional internal hooks or constants

Routes registered in /router

🧩 Shared Components

Reusable UI components live in /components, each with:

A .tsx file

A .stories.tsx for Storybook

⚙️ API Layer

Centralized in /app/api, keeping the UI decoupled from backend logic.
Each file handles one domain (e.g., clientApi, authApi) and can be mocked easily via MSW.

🧪 MSW Integration

Mock Service Worker runs automatically in development.
All handlers are organized by domain inside /app/mocks/handlers.

🧰 Providers

Located in /app/providers:

AuthProtector → wraps protected routes and checks authentication

RouteProvider → sets up TanStack Router and Suspense fallbacks

🧭 Layout System

The /layout folder provides:

PrivateLayout → wraps authenticated pages

Navbar and Sidebar → modular, responsive navigation

🧪 Testing (Playwright)

End-to-end tests live under /tests and validate user flows and UI rendering.
Run tests with:

pnpm exec playwright test

💫 Features

⚡ Modular routing with TanStack Router

🔁 Data fetching and caching with React Query

🧩 Mocked API with MSW for local development

🧱 Shared, Storybook-documented components

🧭 Protected routes with AuthProtector

🎨 Modern responsive design using Tailwind and React Icons

💬 Smooth Suspense loading states

🧰 Playwright-based end-to-end testing
```

📦 Scripts
Command	Description
pnpm dev	Start development server
pnpm build	Build project for production
pnpm preview	Preview the production build
pnpm storybook	Run Storybook
pnpm exec playwright test	Run Playwright end-to-end tests
pnpm lint	Run ESLint
