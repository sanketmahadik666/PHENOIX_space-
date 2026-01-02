# Phoenix Training

## Overview

Phoenix Training is a professional training academy management platform built for a Dubai-based training center. It provides a dual-interface system: a public-facing course marketplace for students to discover and enquire about courses, and a comprehensive admin dashboard for managing courses, batches, students, enquiries, and announcements.

The platform is designed to handle:
- Course catalog and discovery
- Training calendar and batch scheduling
- Lead generation through contact forms
- Corporate training inquiries
- Admin management of all content and data

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool for fast development and optimized production builds
- **React Router DOM** for client-side routing between public pages and admin sections
- **Tailwind CSS** with shadcn/ui component library for consistent, accessible UI components
- **Framer Motion** for smooth animations and transitions

### State Management
- **React Context API** for admin authentication state (AdminAuthContext)
- **TanStack React Query** for server state management, caching, and data fetching
- Custom hooks in `src/hooks/useSupabaseQuery.ts` wrap all database operations

### Database Layer
- **Supabase** as the backend-as-a-service providing:
  - PostgreSQL database for data storage
  - Authentication for admin users
  - Row Level Security policies for data protection
- **Drizzle ORM** schema definitions in `shared/schema.ts` (available for future use)

### Route Structure
- Public routes: `/`, `/courses`, `/about`, `/contact`, `/corporate`, `/calendar`
- Admin routes: `/admin/login`, `/admin/dashboard`, `/admin/courses`, `/admin/batches`, `/admin/enquiries`, `/admin/students`, `/admin/announcements`, `/admin/settings`

### Key Design Patterns
- Component-based architecture with reusable UI components in `src/components/ui/`
- Custom hooks pattern for data fetching (`useCourses`, `useAnnouncements`, `useCreateEnquiry`, etc.)
- Layout components for consistent page structure (`AdminLayout`)
- Form handling with React Hook Form and Zod validation

## External Dependencies

### Backend Services
- **Supabase** (required): Provides database, authentication, and API
  - Project URL: configured via `VITE_SUPABASE_URL` environment variable
  - Anonymous key: configured via `VITE_SUPABASE_ANON_KEY` environment variable
  - Database tables: admin_users, courses, batches, students, enquiries, announcements, enrollments, contact_settings

### Database Schema
The database includes these core tables:
- `admin_users`: Admin authentication and profiles
- `courses`: Course catalog with pricing and metadata
- `batches`: Scheduled training sessions linked to courses
- `students`: Enrolled student records
- `enquiries`: Contact form submissions and lead tracking
- `announcements`: Promotional banner content
- `contact_settings`: Configurable contact information

### Environment Variables Required
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Key NPM Packages
- `@supabase/supabase-js`: Supabase client for database and auth
- `@tanstack/react-query`: Data fetching and caching
- `react-router-dom`: Client-side routing
- `framer-motion`: Animations
- `react-hook-form` + `zod`: Form handling and validation
- `date-fns`: Date formatting utilities