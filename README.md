# User Micro — UI

Frontend for the User Management Admin Panel, built with React 19, TypeScript, Vite, Ant Design, and Tailwind CSS.

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later (or pnpm / yarn)

---

## Installation

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/Gopinathgopi13/user-management-ui.git
cd user-micro/ui

# 2. Install dependencies
npm install
```

---

## Running the App

### Development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default (Vite's default port).

### Demo login credentials

Before using these credentials, make sure `user-service` seed data has been inserted.

- Email: `admin@example.com`
- Password: `@admin@example.com`



### Production build

```bash
npm run build
```

Compiled output is written to the `dist/` directory.


---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build tool | Vite 8 |
| UI components | Ant Design 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Forms | Formik + Yup |
| HTTP client | Axios |
| Realtime | Socket.IO client |
| Icons | Ant Design Icons, Lucide React |

---

## Project Structure

```
src/
├── components/   # Reusable UI components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── layouts/      # Page layout wrappers
├── pages/        # Route-level page components
├── routes/       # Route definitions
├── services/     # API service layer (Axios)
├── types/        # TypeScript type definitions
└── utilities/    # Helper functions
```

