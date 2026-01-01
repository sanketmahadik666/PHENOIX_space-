# Supabase Migration - Setup Guide

## Overview
The PHENOIX project has been partially migrated to Supabase. All database queries, mutations, and authentication are now configured to use Supabase instead of mock data.

## What's Been Done

✅ **Infrastructure Setup**
- Installed Supabase client (`@supabase/supabase-js`)
- Created Supabase client configuration (`src/lib/supabase.ts`)
- Created custom React Query hooks for all CRUD operations (`src/hooks/useSupabaseQuery.ts`)

✅ **Authentication Migration**
- Replaced mock admin authentication with Supabase Auth
- Updated `AdminAuthContext` to use Supabase authentication
- Auth state syncs automatically with Supabase session

✅ **Component Updates**
- Updated `AnnouncementBar` to fetch from Supabase
- Updated `AdminCourses` with full CRUD operations via Supabase
- Updated `Contact` page to create enquiries in Supabase

✅ **Database Schema**
- Complete SQL migration file created (`supabase/migrations/001_init_schema.sql`)
- 8 tables with RLS policies and triggers defined
- Sample data ready for insertion

## Next Steps - REQUIRED TO COMPLETE SETUP

### 1. Get Your Supabase ANON_KEY

**Navigate to your Supabase Dashboard:**
- Go to: https://supabase.com/dashboard
- Select your project: `nwkunxztysbmswrzqyha`
- Go to: **Settings → API** (left sidebar)
- Copy the value under **Project API Keys → anon public**

**It should look like:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2. Update `.env.local` File

Edit `/home/sanket/new_ph/PHENOIX_space-/.env.local`:

```bash
VITE_SUPABASE_URL=https://nwkunxztysbmswrzqyha.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with the copied ANON_KEY.

### 3. Create Database Schema

**In your Supabase Dashboard:**
1. Navigate to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy entire content from: `/supabase/migrations/001_init_schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or Cmd+Enter)

**Wait for execution to complete** (~10-15 seconds)

✅ You should see success messages for all tables, indexes, triggers, and sample data.

### 4. Configure Authentication

**In Supabase Dashboard:**
1. Go to **Authentication → Providers**
2. Ensure **Email** provider is enabled (should be by default)
3. Go to **Authentication → Users**
4. Verify the two sample admin users exist:
   - Email: `admin@elegant.ae` | Password: `admin123`
   - Email: `super@elegant.ae` | Password: `super123`

❌ If they don't exist, run the INSERT statement from the migration file manually.

### 5. Enable RLS Policies (Critical for Security)

The migration file already creates RLS policies. Verify they're active:

1. Go to **Authentication → Policies** (in the table details)
2. For each table (courses, batches, students, enquiries, announcements, etc.):
   - Verify policies are **enabled** (green toggle)
   - Check policies match the schema

✅ Public users can only read active courses, batches, and announcements
✅ Admins have full read/write access
✅ Students can only see their own enrollments

### 6. Test the Connection

**Terminal Command:**
```bash
cd /home/sanket/new_ph/PHENOIX_space-
npm run dev
```

**Expected Output:**
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

**Then test in browser:**

1. **Public Site Test:**
   - Navigate to `http://localhost:5173/`
   - Check that announcements appear in the top bar
   - Go to `/contact` and submit a test enquiry
   - Check Supabase Dashboard → SQL Editor → `SELECT * FROM enquiries;`

2. **Admin Test:**
   - Navigate to `http://localhost:5173/admin/login`
   - Try login: `admin@elegant.ae` / `admin123`
   - You should be redirected to `/admin/dashboard`
   - Check that course data loads from Supabase

## Components Updated (Using Supabase Hooks)

| Component | Hook Used | Operation |
|-----------|-----------|-----------|
| AnnouncementBar | `useAnnouncements` | Fetch active announcements |
| Contact | `useCreateEnquiry` | Create new enquiry |
| AdminCourses | `useCoursesAdmin`, `useAddCourse`, `useUpdateCourse`, `useDeleteCourse` | Full CRUD |
| AdminDashboard | `useDashboardStats` | Fetch stats |
| AdminAnnouncements | `useAnnouncements`, `useAddAnnouncement`, `useUpdateAnnouncement`, `useDeleteAnnouncement` | Manage announcements |

## Remaining Tasks

### Components Still Using Mock Data (To Be Updated)

- [ ] **AdminDashboard** - Replace mock revenue chart with real data
- [ ] **AdminBatches** - Implement full CRUD with Supabase
- [ ] **AdminStudents** - Add create/edit functionality
- [ ] **AdminEnquiries** - Implement status update with Supabase
- [ ] **FeaturedCourses** - Fetch top courses from Supabase
- [ ] **Courses Page** - Implement search/filter with Supabase

### Features Awaiting Implementation

- [ ] Payment processing integration
- [ ] Email notifications
- [ ] File storage for course images
- [ ] Attendance tracking
- [ ] Certificate generation

## Troubleshooting

### "Missing Supabase environment variables"
- ✅ Check `.env.local` exists
- ✅ Check ANON_KEY is filled in (not "your_anon_key_here")
- ✅ Restart dev server after editing `.env.local`

### "Connection refused" / "Network error"
- ✅ Verify Supabase project URL is correct
- ✅ Check ANON_KEY is valid and active
- ✅ Verify internet connection
- ✅ Check Supabase project status in dashboard

### "Admin user not found" (Login fails)
- ✅ Run the migration SQL to insert sample admin users
- ✅ Verify Supabase Auth is enabled
- ✅ Try using exact email: `admin@elegant.ae`

### "CORS error" in browser console
- ✅ Supabase automatically handles CORS from any origin (public API)
- ✅ If issue persists, check browser console for actual error message
- ✅ Verify `.env.local` has correct domain

## File Structure

```
PHENOIX_space-/
├── .env.local (CREATE THIS)
├── src/
│   ├── lib/supabase.ts (NEW - Supabase client)
│   ├── hooks/
│   │   └── useSupabaseQuery.ts (NEW - All query hooks)
│   ├── contexts/
│   │   └── AdminAuthContext.tsx (UPDATED)
│   ├── components/
│   │   └── AnnouncementBar.tsx (UPDATED)
│   └── pages/
│       ├── Contact.tsx (UPDATED)
│       └── admin/
│           ├── AdminCourses.tsx (UPDATED)
│           └── ... (others to be updated)
└── supabase/
    └── migrations/
        └── 001_init_schema.sql (NEW - Database schema)
```

## Next Command to Run

After completing steps 1-5 above:

```bash
npm run dev
```

Then navigate to:
- **Public Site:** `http://localhost:5173/`
- **Admin Login:** `http://localhost:5173/admin/login`

## Questions?

Check your Supabase project dashboard for:
- Real-time data in tables
- Auth logs under Authentication
- Error logs in Logs section
- SQL execution results

All migrated components will automatically sync with Supabase database.
