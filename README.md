# EduDiscover — College Discovery Platform

A production-grade College Discovery Platform built with Next.js 15, inspired by Careers360 and Collegedunia. Browse 50+ real Indian colleges, compare side-by-side, save favorites, and make better academic decisions.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)

## Features

- **College Listing + Search** — Browse 50+ colleges with filters by name, location, and state
- **College Detail Pages** — Dynamic pages with overview, courses, fees, placement stats, and recruiters
- **Compare Colleges** — Side-by-side comparison of up to 3 colleges with search-to-add
- **Auth (Login/Register)** — JWT-based authentication with bcrypt password hashing
- **Saved Colleges** — Logged-in users can save/unsave colleges (protected route)
- **Loading Skeletons** — Smooth loading states on all pages
- **Error Handling** — Global error boundary + custom 404 page
- **Responsive** — Mobile-first design that works on all screen sizes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Lucide Icons |
| Backend | Next.js API Routes, Server Actions |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v5 (Auth.js) |
| Deployment | Vercel + Neon PostgreSQL |

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) free tier)

### Setup

```bash
# Clone the repository
git clone https://github.com/Aftabmansoori3/college-discovery.git
cd college-discovery

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET

# Push schema to database
npx prisma db push

# Seed with 50+ colleges
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random secret for NextAuth sessions |
| `NEXTAUTH_URL` | Your app URL (http://localhost:3000 for dev) |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with Navbar/Footer
│   ├── loading.tsx              # Global loading state
│   ├── error.tsx                # Global error boundary
│   ├── not-found.tsx            # Custom 404
│   ├── colleges/
│   │   ├── page.tsx             # College listing + search
│   │   ├── loading.tsx          # Skeleton loader
│   │   └── [slug]/page.tsx      # College detail page
│   ├── compare/page.tsx         # Compare colleges
│   ├── saved/page.tsx           # Saved colleges (protected)
│   ├── login/page.tsx           # Login
│   ├── register/page.tsx        # Register
│   └── api/
│       ├── auth/[...nextauth]/  # Auth API
│       └── colleges/            # Colleges API
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Navbar, Footer
│   └── college/                 # CollegeCard
├── lib/
│   ├── prisma.ts                # Prisma client singleton
│   ├── actions.ts               # Server actions
│   └── utils.ts                 # Utility functions
├── auth.ts                      # NextAuth config
└── middleware.ts                # Route protection
prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # Seed 50+ colleges
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Prisma generates automatically via `postinstall`

### Database (Neon)

1. Create a free database at [neon.tech](https://neon.tech)
2. Copy the connection string to `DATABASE_URL`
3. Run `npx prisma db push` and `npm run seed`

## License

MIT
