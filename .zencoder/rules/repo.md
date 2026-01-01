---
description: Repository Information Overview
alwaysApply: true
---

# PHENOIX Space - Comprehensive Project Analysis

## Executive Summary
**PHENOIX** is an elegant training academy management platform built with **React + TypeScript + Vite**. It provides a dual-interface system: a public-facing course marketplace and a comprehensive admin dashboard for managing courses, batches, students, enquiries, and announcements. Currently uses local state and mock data; requires migration to Supabase for persistent dynamic storage.

---

## Architecture Overview

### High-Level Component Structure
```
PHENOIX (React-Router)
├── Public Pages (Marketing & Course Discovery)
│   ├── Index (Hero, Featured Courses, Stats)
│   ├── Courses (Course Catalog)
│   ├── About (Company Info)
│   ├── Contact (Lead Generation)
│   ├── Corporate (B2B Training)
│   └── TrainingCalendar (Batch Schedule)
│
├── Admin Dashboard (Authenticated Portal)
│   ├── AdminDashboard (Overview & Analytics)
│   ├── AdminCourses (CRUD Operations)
│   ├── AdminBatches (Schedule Management)
│   ├── AdminStudents (Student Management)
│   ├── AdminEnquiries (Lead Management)
│   ├── AdminAnnouncements (Promo Bar)
│   ├── AdminSettings (Configuration)
│   └── AdminLogin (Authentication)
│
└── Shared Components
    ├── UI Library (40+ shadcn components)
    ├── Contexts (AdminAuthContext)
    └── Hooks (useToast, useMobile)
```

### Technology Stack
- **Frontend Framework**: React 18.3.1 + TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **Router**: React Router DOM 6.30.1
- **UI Components**: shadcn/ui + Tailwind CSS 3.4.17
- **State Management**: React Context API (Admin Auth)
- **Data Fetching**: TanStack React Query 5.83.0
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **Animations**: Framer Motion 12.23.26
- **Charts**: Recharts 2.15.4
- **Notifications**: Sonner 1.7.4

---

## Core Data Model - Entity Relationships

### Database Entities (For Supabase)

#### 1. **ADMIN_USERS**
- Purpose: System administrators with role-based access
- Current Storage: Mock data in AdminAuthContext
- **Fields**:
  - `id` (UUID, PK)
  - `name` (string, 50-255 chars)
  - `email` (string, unique)
  - `role` (enum: 'admin', 'super_admin')
  - `password_hash` (string, encrypted)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

#### 2. **COURSES** (Core Entity)
- Purpose: Training course catalog
- Current Storage: mockCourses array (8 base courses)
- **Fields**:
  - `id` (UUID, PK)
  - `name` (string, 100-255 chars)
  - `category` (string enum: 'BIM & CAD', 'Finance', 'Data Analytics', 'Design', 'Office Applications', 'IT & Programming')
  - `description` (text, 200-1000 chars)
  - `price` (decimal: 999-50000 AED)
  - `duration` (string: '15 hours', '40 hours', etc.)
  - `image_url` (string, nullable)
  - `is_active` (boolean)
  - `registrations_count` (integer, auto-computed)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  - `created_by_admin_id` (UUID, FK → ADMIN_USERS)

**Relationships**:
- One Course → Many Batches (1:N)
- One Course → Many Enquiries (1:N)

#### 3. **BATCHES** (Course Instance)
- Purpose: Specific course offerings with schedules and seat management
- Current Storage: mockBatches array (5 batches)
- **Fields**:
  - `id` (UUID, PK)
  - `course_id` (UUID, FK → COURSES)
  - `course_name` (string, denormalized for convenience)
  - `start_date` (date)
  - `end_date` (date)
  - `instructor` (string, 50-255 chars)
  - `max_seats` (integer, 1-500)
  - `enrolled_seats` (integer, auto-computed from ENROLLMENTS)
  - `status` (enum: 'upcoming', 'active', 'completed')
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  - `created_by_admin_id` (UUID, FK → ADMIN_USERS)

**Relationships**:
- One Batch → One Course (N:1)
- One Batch → Many Enrollments (1:N)

#### 4. **STUDENTS** (Learner Profile)
- Purpose: Student/learner account tracking
- Current Storage: mockStudents array (3 students)
- **Fields**:
  - `id` (UUID, PK)
  - `name` (string, 50-255 chars)
  - `email` (string, unique)
  - `phone` (string, 10-20 chars)
  - `join_date` (date)
  - `is_active` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

**Relationships**:
- One Student → Many Enrollments (1:N)
- One Student → Many Enquiries (1:N, if enquiry converts to student)

#### 5. **ENROLLMENTS** (Student-Batch Junction)
- Purpose: Track student registration in specific batch instances
- Current Storage: Not explicitly tracked, embedded in Student.enrolledCourses
- **Fields**:
  - `id` (UUID, PK)
  - `student_id` (UUID, FK → STUDENTS)
  - `batch_id` (UUID, FK → BATCHES)
  - `enrollment_date` (timestamp)
  - `completion_status` (enum: 'registered', 'in_progress', 'completed', 'dropped')
  - `payment_status` (enum: 'pending', 'partial', 'complete', 'refunded')
  - `notes` (text, nullable)
  - `created_at` (timestamp)

**Relationships**:
- Many Enrollments → One Student (N:1)
- Many Enrollments → One Batch (N:1)

#### 6. **ENQUIRIES** (Lead/Sales Funnel)
- Purpose: Customer inquiry management and sales pipeline
- Current Storage: mockEnquiries array (10 enquiries)
- **Fields**:
  - `id` (UUID, PK)
  - `name` (string, 50-255 chars)
  - `email` (string)
  - `phone` (string, 10-20 chars)
  - `interested_course` (string, 100-255 chars)
  - `message` (text)
  - `inquiry_date` (timestamp)
  - `status` (enum: 'pending', 'contacted', 'converted', 'closed')
  - `converted_student_id` (UUID, FK → STUDENTS, nullable)
  - `assigned_admin_id` (UUID, FK → ADMIN_USERS, nullable)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

**Relationships**:
- Many Enquiries → One Student (N:1, after conversion)

#### 7. **ANNOUNCEMENTS** (Promo Bar)
- Purpose: Dynamic scrolling announcements on public site
- Current Storage: mockAnnouncements array (4 announcements)
- **Fields**:
  - `id` (UUID, PK)
  - `text` (string, 100-255 chars)
  - `link_url` (string, nullable)
  - `is_active` (boolean)
  - `display_order` (integer, for sequencing)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  - `created_by_admin_id` (UUID, FK → ADMIN_USERS)

---

## Component-Level Architecture

### Public Site Components (Marketing Layer)
```
Header (Navigation)
├── NavLinks (/, /courses, /about, /contact, /corporate, /calendar)
└── Login Link (/admin/login)

Index Page
├── AnnouncementBar (fetches ANNOUNCEMENTS, active only)
├── HeroSection (CTA to /courses or contact)
├── ClientLogos (Static)
├── TrainingModes (Static)
├── CourseCategories (Maps COURSES by category)
├── FeaturedCourses (Top registrations from COURSES)
├── StatsSection (Aggregated dashboardStats)
├── TestimonialsSection (Static)
├── CTASection (Call to Action)
└── Footer (Links)

Courses Page
├── Search/Filter by Category
├── Course Grid (from COURSES table)
└── Course Detail Modal

Contact Page
├── Contact Form (creates ENQUIRY)
├── Contact Info (Static)
└── Map Embed

TrainingCalendar Page
└── Batch List (from BATCHES, grouped by status)
```

### Admin Dashboard Components (Authenticated Layer)
```
AdminLayout (Protected Route, Auth Context)
├── Header (Admin name, Settings, Logout)
├── Sidebar (Navigation)
└── Main Content

AdminDashboard
├── Stats Cards (6 metrics from aggregation)
├── Recent Enquiries (Last 7 from ENQUIRIES)
├── Top Performing Courses (Sorted by registrations)
├── Revenue Chart (mockRevenueData - NEEDS REAL DATA)
└── Upcoming Batches (List of BATCHES)

AdminCourses
├── Search/Filter
├── Add Course Dialog
├── Edit Course Dialog
├── Delete Course Function
└── Course Grid (CRUD)

AdminBatches
├── Search/Filter by Course or Instructor
├── Add Batch Dialog
├── Edit Batch Dialog
├── Delete Batch Function
└── Batch Table

AdminStudents
├── Search/Filter
└── Student Grid (Read-only for now)

AdminEnquiries
├── Search by Name/Email/Course
├── Status Filter (4 statuses)
├── Update Status Dropdown
└── Enquiry Cards

AdminAnnouncements
├── Add Announcement Dialog
├── Live Preview Carousel
├── Active Count Stat
└── Announcement List (CRUD)

AdminSettings
└── [Configuration options - not fully detailed]
```

---

## Data Flow Architecture

### Flow 1: Student Discovery → Enquiry
```
User visits Index
  ↓
Views FeaturedCourses (from COURSES)
  ↓
Clicks course or "Register Now"
  ↓
Navigates to Contact page
  ↓
Submits form → CREATE ENQUIRY record
  ↓
Confirmation toast
```

### Flow 2: Admin Manages Courses
```
Admin logs in (/admin/login)
  ↓
AdminAuthContext validates credentials (MOCK → SUPABASE)
  ↓
Admin → /admin/courses
  ↓
Load COURSES from mock/Supabase
  ↓
CRUD Operations:
  • Create: Add new course with form
  • Read: Display in grid/cards
  • Update: Edit course details
  • Delete: Remove course (soft delete recommended)
  ↓
Update reflected in:
  • AdminDashboard stats
  • Public Courses page
  • FeaturedCourses (top 5)
```

### Flow 3: Batch Enrollment → Revenue
```
Admin creates Batch (course_id, dates, instructor)
  ↓
Displayed on TrainingCalendar (public)
  ↓
Student enrolls → CREATE ENROLLMENT
  ↓
Auto-increment batch.enrolled_seats
  ↓
Payment status tracked in ENROLLMENTS
  ↓
Revenue aggregated in dashboard
```

### Flow 4: Enquiry to Student Conversion
```
ENQUIRY created with status='pending'
  ↓
Admin reviews in AdminEnquiries
  ↓
Admin marks status → 'contacted'
  ↓
Admin marks status → 'converted'
  ↓
Trigger: CREATE STUDENT if new, link via converted_student_id
  ↓
Manual ENROLLMENT creation in AdminStudents
  ↓
Email confirmation (external service - not implemented)
```

---

## Entity Relationships Diagram

```
ADMIN_USERS (1)
  ├─ creates (N)── COURSES
  ├─ creates (N)── ANNOUNCEMENTS
  ├─ assigns to (N)── ENQUIRIES
  └─ creates (N)── BATCHES

COURSES (1)
  ├─ has (N)── BATCHES
  └─ receives (N)── ENQUIRIES

BATCHES (1)
  └─ enrolls (N)── ENROLLMENTS

STUDENTS (1)
  ├─ has (N)── ENROLLMENTS
  ├─ can create (N)── ENQUIRIES
  └─ may convert from── ENQUIRIES

ENQUIRIES (1)
  └─ may convert to (1)── STUDENTS

ENROLLMENTS (N:N Junction)
  ├─ belongs to (N)── STUDENTS
  └─ belongs to (N)── BATCHES
```

---

## Key Gaps & Implementation Points

### Gap 1: Payment Processing
**Status**: Not Implemented
- **Required**: Payment gateway integration (Stripe, PayPal, local UAE methods)
- **Fields needed**: `payment_method`, `transaction_id`, `amount_paid`, `currency`
- **Action**: Add PAYMENTS table, link to ENROLLMENTS

### Gap 2: Email/SMS Notifications
**Status**: Forms only, no backend integration
- **Required**: Notification service (SendGrid, Twilio)
- **Fields**: `notification_type`, `recipient_id`, `status`, `sent_at`
- **Action**: Create NOTIFICATIONS table + trigger functions

### Gap 3: Student Progress Tracking
**Status**: Not tracked
- **Required**: Attendance, assignments, certifications
- **Fields**: `attendance_date`, `marks`, `completion_percentage`, `certificate_url`
- **Action**: Add ATTENDANCE, ASSIGNMENTS tables

### Gap 4: Analytics & Reporting
**Status**: Mock data only (mockRevenueData)
- **Required**: Real revenue queries, conversion rates, course performance
- **Action**: Add VIEW-based reporting tables or integrate BI tool

### Gap 5: Authentication & Authorization
**Status**: Mock admin users in context
- **Required**: Real authentication (Supabase Auth)
- **Action**: Replace MOCK_ADMINS with Supabase Auth + RLS policies

### Gap 6: File Management (Course Images)
**Status**: Using placeholder.svg
- **Required**: Image storage (Supabase Storage)
- **Fields**: `image_bucket_path`, `image_url_public`
- **Action**: Integrate Supabase Storage for course/announcement images

### Gap 7: Soft Deletes
**Status**: Hard deletes only
- **Required**: `deleted_at` timestamp for audit trails
- **Action**: Add `deleted_at` (nullable) to all tables

### Gap 8: Audit Logging
**Status**: Not present
- **Required**: Track who changed what and when
- **Action**: Create AUDIT_LOGS table with `table_name`, `record_id`, `action`, `changes`, `admin_id`, `timestamp`

### Gap 9: Bulk Operations
**Status**: Not supported
- **Required**: Bulk CSV import (courses, students, batch enrollments)
- **Action**: Create import-export utilities + IMPORT_JOBS table

### Gap 10: Course Prerequisites/Dependencies
**Status**: Not modeled
- **Required**: Some courses may require prerequisites
- **Action**: Add COURSE_PREREQUISITES junction table

---

## Supabase Schema Implementation Checklist

### Tables to Create (Priority Order)

**Phase 1 (Critical)**
1. `admin_users` - Auth backbone
2. `courses` - Core catalog
3. `batches` - Schedule management
4. `students` - Learner profiles
5. `enquiries` - Lead pipeline
6. `announcements` - Public messaging

**Phase 2 (Essential)**
7. `enrollments` - Student-Batch junction
8. `payments` - Revenue tracking
9. `audit_logs` - Compliance

**Phase 3 (Enhancement)**
10. `attendance` - Course tracking
11. `certificates` - Credentials
12. `course_prerequisites` - Dependencies
13. `notifications` - Communication

### RLS Policies (Row Level Security)
- Admin users: Full access to all tables
- Public users: Read COURSES, BATCHES, ANNOUNCEMENTS only
- Students: Read own ENROLLMENTS, PAYMENTS only

### Triggers Required
- `update_batch_enrolled_seats` - Auto-sync from ENROLLMENTS
- `update_course_registration_count` - From ENROLLMENTS
- `auto_create_audit_log` - For all INSERT/UPDATE/DELETE
- `prevent_batch_past_dates` - Validation

---

## Migration Strategy (API Integration Points)

### Current State
```javascript
// Authentication
const MOCK_ADMINS = [...] // In AdminAuthContext
const [admin, setAdmin] = useState(null)

// Data
const mockCourses = [...] // mockAdminData.ts
const mockBatches = [...]
const [courses, setCourses] = useState<Course[]>(mockCourses)
```

### Target State (Supabase)
```javascript
// Authentication - Replace with Supabase Auth
const { user } = useAuth() // from @supabase/auth-helpers-react

// Data - Replace with Supabase queries
const { data: courses } = useQuery(['courses'], () =>
  supabase.from('courses').select('*').eq('is_active', true)
)

// Mutations - Add/update/delete via Supabase
const { mutate: addCourse } = useMutation(
  (newCourse) => supabase.from('courses').insert([newCourse])
)
```

### Component Integration Points
- `AdminAuthContext` → Supabase Auth
- `mockAdminData.ts` → Supabase RLS + React Query
- Dialog/Form submissions → useQuery/useMutation hooks
- Charts data → Real aggregation queries

---

## Performance Considerations

### Current Issues
- Mock data loads entire dataset into state
- No pagination on enquiries/students lists
- Revenue chart uses hardcoded 6 months

### Optimizations
- Implement pagination: `LIMIT 10 OFFSET 0`
- Use infinite scroll for enquiries/students
- Add database-side filtering (category, status)
- Implement materialized views for dashboar stats
- Cache admin stats with 5-minute TTL

---

## Summary Statistics

| Metric | Count | Notes |
|--------|-------|-------|
| Pages | 7 | 4 public + 4 admin |
| Components | 50+ | 40+ UI, 10 feature |
| Data Tables | 7 required | Courses, Batches, Students, Enquiries, Announcements, AdminUsers, Enrollments |
| Relationships | 8 | 1:N, N:N, M:1 |
| CRUD Screens | 6 | Courses, Batches, Students, Enquiries, Announcements, Settings |
| Authenticated Routes | 8 | Admin section |
| Search/Filter Needs | 5 | Course name/category, Batch course/instructor, Enquiry name/email/course, Student name/email, Announcement text |

---

## Recommended Next Steps

1. **Create Supabase Project** → Get API credentials
2. **Define RLS Policies** → Secure data access
3. **Create Tables** → Via SQL editor with sample data
4. **Implement Auth** → Replace mock login with Supabase Auth
5. **Hook Data Fetching** → Use React Query + Supabase client
6. **Test CRUD Operations** → Component-level tests
7. **Setup Real Storage** → For course images
8. **Implement Audit Trail** → For compliance

This analysis provides the complete foundation for migrating PHENOIX to Supabase with proper schema design, relationship modeling, and gap identification for full feature implementation.
