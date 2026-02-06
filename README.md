# CSEC Gwalior - Education Consultancy Portal

A premium, production-ready Education Consultancy website built with Next.js 14, Prisma, PostgreSQL, and NextAuth.

## 🚀 Key Features

- **Public Site**: Fully responsive, SEO-optimized pages for Home, About, Courses, Universities, Services, etc.
- **Lead Generation**: Advanced admission form with Zod validation and Server Actions.
- **Admin Dashboard**: Secure management of leads, courses, universities, and site settings.
- **Modern UI**: Built with Tailwind CSS, Framer Motion, and Premium Design principles.
- **SEO Ready**: Dynamic sitemap, robots.txt, Schema.org, and OpenGraph metadata.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js Server Actions, NextAuth.js v5
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React

## 📦 Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file based on `env.example`:
```env
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@csecgwl.in"
ADMIN_PASSWORD="secure-password"
```

### 3. Database Migration & Seed
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```

## 🏰 Deployment Architecture (Vercel Optimized)

To ensure Vercel correctly identifies and deploys the Public Site, Admin Portal, and Backend API from a single repo, this project uses **Next.js Route Groups**.

### Why this structure?
- **Shared Logic**: Your Admin and Public pages share the same database (Prisma) and components, making updates 10x faster.
- **Security**: Admin routes are isolated via `src/middleware.ts` and NextAuth.
- **Performance**: Vercel optimizes this as a single "Super-App", ensuring zero-latency communication between frontend and backend.

### Solving "Vercel Diagnosis" Issues
If you previously had trouble with Vercel not recognizing parts of your app:
1. **Root Directory**: Ensure the **Root Directory** in Vercel settings is set to `./`.
2. **Framework Preset**: Always choose **Next.js** as the framework preset.
3. **Monolith with Isolation**: Do NOT try to create 3 separate Vercel projects from this repo. This single project handles everything flawlessly.

### 🌐 Subdomain Support (Optional)
If you want your Admin on `admin.csecgwl.in` and public site on `www.csecgwl.in`:
- Deploy the project ONCE to Vercel.
- Add both domains in the Vercel Dashboard.
- Use Next.js **Middleware rewrites** (optional) or simply use the route paths.

## 📊 Meta Pixel Integration

This site supports **Meta (Facebook) Pixel** for ad tracking and analytics.
- **Code Side**: Integrated via `src/components/MetaPixel.tsx`.
- **Setup**: Add `NEXT_PUBLIC_META_PIXEL_ID` to your Vercel Environment Variables.
- **Admin Control**: You can also view/manage the ID in `Admin Portal > Settings`.

---
Developed by **Principal DevOps & UI/UX Architect**
