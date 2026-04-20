# The Wild Oasis — Hotel Management Dashboard

A full-stack hotel management web application built with React, TypeScript, and Supabase. Designed for hotel staff to manage bookings, cabins, guests, and settings from a single dashboard.

##  Live Demo
[https://wild-oasis-dnc1.vercel.app]

##  Features

- **Authentication** — Login, signup, protected routes, session management via Supabase Auth
- **Dashboard** — Real-time stats (bookings, sales, check-ins, occupancy rate), today's activity, sales chart, stay duration chart
- **Bookings** — Full bookings table with filtering by status, sorting, pagination, check-in/check-out/delete actions
- **Check-in Flow** — Dedicated check-in page with payment confirmation
- **Cabins** — View and manage hotel cabins with images
- **Settings** — Update hotel-wide settings (min/max nights, breakfast price, max guests)
- **Account Management** — Update profile, avatar upload to Supabase Storage, password change

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Data Fetching:** TanStack React Query (useQuery, useMutation)
- **Forms:** React Hook Form + Zod validation
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage)
- **Routing:** React Router v6
- **Charts:** Recharts
- **Notifications:** Sonner
- **Deployment:** Vercel



##  Running Locally

```bash
git clone https://github.com/YOURUSERNAME/wild-oasis.git
cd wild-oasis
npm install
```

Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

## What I Learned

- Building full-stack apps with React and Supabase
- Managing server state with React Query
- Form validation with React Hook Form and Zod
- Authentication flows and protected routes
- Data visualization with Recharts
- Component architecture and separation of concerns
