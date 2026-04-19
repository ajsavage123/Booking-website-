# 🏥 MediCare Clinic — Booking System

A full-stack clinic appointment booking website built with **Next.js 14**, **Tailwind CSS**, **Supabase**, and **TypeScript**.

> 🎯 **Demo-ready SaaS template** — reusable for any small clinic or healthcare provider.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗓️ Online Booking | 4-step booking flow in under 60 seconds |
| 🔒 Double-Booking Prevention | DB-level slot checking before confirmation |
| 💬 WhatsApp Confirmation | Auto-generated WhatsApp deep link with booking details |
| 📱 Mobile-First | Fully responsive across all devices |
| 🛡️ Admin Dashboard | View, filter, and manage all bookings |
| 🔐 Auth-Protected Admin | Cookie-based session for admin routes |
| ✅ Real-time Availability | Booked slots disabled instantly |
| 🎨 Healthcare UI | Clean teal/white design system |

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14 (App Router) + React 18
- **Styling**: Tailwind CSS + custom design tokens
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase SSR + cookie sessions
- **Language**: TypeScript (strict mode)
- **Icons**: Lucide React
- **Date Picker**: react-day-picker
- **Deployment**: Vercel

---

## 📁 Project Structure

```
clinic-booking/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── book/page.tsx               # 4-step booking flow
│   ├── confirmation/page.tsx       # Booking success page
│   ├── admin/
│   │   ├── page.tsx                # Admin login
│   │   └── dashboard/page.tsx      # Bookings dashboard
│   └── api/
│       ├── bookings/route.ts       # GET (list) + POST (create)
│       ├── bookings/[id]/route.ts  # PATCH (status) + DELETE
│       ├── slots/route.ts          # GET booked time slots
│       └── admin/
│           ├── login/route.ts      # Admin login
│           └── logout/route.ts     # Admin logout
├── components/
│   └── Navbar.tsx
├── lib/
│   ├── constants.ts                # Services, time slots
│   ├── supabase-client.ts          # Browser Supabase client
│   ├── supabase-server.ts          # Server Supabase client
│   └── utils.ts                    # Helpers, WhatsApp link
├── types/index.ts                  # TypeScript types
├── middleware.ts                   # Admin route protection
├── supabase/schema.sql             # DB schema + RLS policies
└── .env.local.example              # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A free [Supabase](https://supabase.com) account

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-username/clinic-booking.git
cd clinic-booking
npm install
```

---

### Step 2 — Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g. `medicare-clinic`) and set a strong DB password
3. Once the project is created, go to **Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

### Step 3 — Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste the entire contents of `supabase/schema.sql`
4. Click **Run**

This will create:
- `services` table (pre-seeded with 6 services)
- `bookings` table with proper indexes
- Row Level Security (RLS) policies
- A `today_bookings` convenience view

---

### Step 4 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-admin-password
NEXT_PUBLIC_CLINIC_WHATSAPP=601234567890
```

> ⚠️ **Never commit `.env.local` to git.** It's already in `.gitignore`.

---

### Step 5 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| URL | Description |
|---|---|
| `http://localhost:3000` | Landing page |
| `http://localhost:3000/book` | Booking flow |
| `http://localhost:3000/confirmation` | Confirmation page |
| `http://localhost:3000/admin` | Admin login (password: `admin123`) |
| `http://localhost:3000/admin/dashboard` | Bookings dashboard |

---

## 🌐 Deploy on Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Then add environment variables:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_CLINIC_WHATSAPP
```

Deploy to production:

```bash
vercel --prod
```

---

### Option B — Vercel Dashboard (Recommended)

1. Push your code to a **GitHub** repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add all 5 variables from `.env.local`
5. Click **Deploy**

✅ Your site will be live at `https://your-project.vercel.app`

---

## 🗄️ Database Schema

### `bookings` table

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Auto-generated unique ID |
| `name` | TEXT | Patient full name |
| `phone` | TEXT | Patient phone (digits only) |
| `service` | TEXT (FK) | References `services.id` |
| `date` | DATE | Appointment date (YYYY-MM-DD) |
| `time` | TEXT | Time slot (HH:MM, 24-hr) |
| `status` | TEXT | `pending` / `confirmed` / `cancelled` |
| `notes` | TEXT | Optional patient notes |
| `created_at` | TIMESTAMPTZ | Auto timestamp |

### `services` table

| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Slug e.g. `general-checkup` |
| `name` | TEXT | Display name |
| `duration` | INTEGER | Duration in minutes |

---

## 🔒 Security

- **Admin routes** protected by `middleware.ts` — redirects to login if no valid session cookie
- **Service Role Key** only used server-side (API routes) — never sent to browser
- **RLS policies** on Supabase tables restrict direct DB access
- **Input validation** on both client and server side
- **Double-booking check** at DB query level before insert
- **Phone number sanitized** (digits only stored)

---

## ⚙️ Customization Guide

### Change Clinic Name
Edit `lib/utils.ts`:
```ts
export const CLINIC_NAME = "Your Clinic Name";
```

### Add/Remove Services
Edit `lib/constants.ts` — update the `SERVICES` array and run the SQL to sync the DB.

### Change Time Slots / Hours
Edit `ALL_TIME_SLOTS` in `lib/constants.ts`.

### Change Admin Password
Update `ADMIN_PASSWORD` in your `.env.local` (and Vercel env vars).

### Change WhatsApp Number
Update `NEXT_PUBLIC_CLINIC_WHATSAPP` in `.env.local`.

### Disable Sunday Bookings
Already configured in `app/book/page.tsx` — modify the `disabled` prop on `DayPicker`.

---

## 📱 WhatsApp Integration

When a patient completes a booking, a pre-filled WhatsApp message is generated:

```
Hello, I just booked an appointment!

📋 Booking Details
• Name: John Smith
• Service: General Checkup
• Date: Monday, April 21, 2025
• Time: 09:00 AM

Please confirm my appointment. Thank you!
```

Clicking "Confirm via WhatsApp" opens WhatsApp with this message pre-filled, directed to your clinic's number.

---

## 🧪 Running with Sample Data

Uncomment the sample INSERT statements at the bottom of `supabase/schema.sql` and re-run to populate demo bookings.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🐛 Common Issues

**"Unauthorized" on admin dashboard**
→ Log in at `/admin` first. Session expires after 8 hours.

**Slots not loading**
→ Check your `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

**"Failed to create booking"**
→ Make sure you ran `supabase/schema.sql` and the `services` table is seeded.

**Build error: Cannot find module**
→ Run `npm install` to ensure all dependencies are installed.

---

## 📄 License

MIT — free to use and adapt for client projects.

---

Built with ❤️ using Next.js 14 + Supabase
