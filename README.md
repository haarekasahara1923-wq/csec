# CSEC Gwalior - Education Consultancy Portal

A premium, production-ready Education Consultancy website built with Next.js 14, Prisma, Neon PostgreSQL, and NextAuth.

## 🚀 Key Features

- **Public Site**: Fully responsive pages for Home, About, Courses, Universities, etc.
- **Lead Generation**: Advanced admission form with Zod validation and Server Actions.
- **Admin Dashboard**: Secure management of leads, courses, universities, and settings.
- **Modern UI**: Tailwind CSS, Framer Motion, Premium Design.
- **SEO Ready**: Dynamic sitemap, robots.txt, Schema.org, Meta Pixel.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, NextAuth.js v5
- **Database**: Neon PostgreSQL with Prisma ORM
- **Tracker**: Meta Pixel (Facebook)

## 📦 Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Database Setup (Neon.tech)
Since Vercel Postgres has limits, we use **Neon.tech**:
1. Create a project on [Neon.tech](https://neon.tech).
2. Get your **Database Connection String**.
3. Add it to your `.env` or Vercel Environment Variables.

### 3. Environment Setup
Create a `.env` file:
```env
DATABASE_URL="postgres://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@csecgwl.in"
ADMIN_PASSWORD="secure-password"
NEXT_PUBLIC_META_PIXEL_ID="your-pixel-id"
```

### 4. Database Migration & Seed
```bash
npx prisma db push
npm run prisma:seed
```

### 5. Run Development Server
```bash
npm run dev
```

## 🏰 Deployment Architecture (Vercel Optimized)

This project has been optimized to solve common Vercel "Diagnosis" and "Build Error" issues:
- **Root Directory Structure**: `app/` and `components/` are in the project root for maximum compatibility.
- **Neon Serverless**: Integrated using `@prisma/adapter-neon` for high performance on Vercel.
- **Auto-Sync Build**: The build script automatically runs `prisma generate`.

### 🌐 Vercel Deployment Steps
1. Connect GitHub repo to Vercel.
2. Ensure **Root Directory** is `./`.
3. Add all **Environment Variables**.
4. Deploy!

---
Developed by **Principal DevOps & UI/UX Architect**
