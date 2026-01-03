# Elegant Access | Student Management System

A premium, high-performance Admin Dashboard for managing educational institutes, students, and enquiries. Built with a focus on cinematic user experience and robust data handling.

![Project Status](https://img.shields.io/badge/Status-Active_Development-emerald)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Supabase-blue)
![UI](https://img.shields.io/badge/UI-Shadcn_|_Framer_Motion-purple)

## 🚀 Key Features

### 🎬 Cinematic Admin Experience

- **"Elegant Access" Login**: A reimagined login interface featuring:
  - **Curtain Reveal**: Dramatic entrance animation on load.
  - **Magnetic Parallax**: Login widget responds to cursor movement.
  - **Drift Zoom**: High-resolution interactive zoom on the hero artwork.
  - **Dual-State Motion**: Fluid transitions between idle floating and active tracking.
  - **Supposina Art Direction**: Unique visual identity with curated kinetic typography.

### 🎓 Student Management

- **Comprehensive Roster**: View, filter, and manage student databases efficiently.
- **Bulk Enrollment**:
  - Upload CSV files for mass student onboarding.
  - Intelligent duplicate detection (Email + Course matching).
  - Validation for missing fields and data integrity.
- **Manual Entry**: Quick-add modal for individual student registration.

### 📥 Enquiry & Lead Tracking

- **Centralized Lead Management**: Track incoming student enquiries.
- **Manual Creation**: Admin-initiated enquiry logging for walk-ins or phone calls.
- **Email Integration**: Built-in composition tool (powered by ReactQuill) to reply to enquiries directly from the dashboard.

### 📊 Analytics & Insights

- **Interactive Dashboard**: Real-time visualization of key metrics.
- **Charts**: Time-series enrollment data, course distribution pie charts.
- **Audit Logs**: Track admin actions for security and accountability.

---

## 🛠️ Technology Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Motion & 3D**: [Framer Motion](https://www.framer.com/motion/)
- **Image Interaction**: [Drift Zoom](https://github.com/imgix/drift)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PHENOIX_space-
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

### Default Credentials (Dev)

- **Admin Email**: `admin@elegant.ae`
- **Password**: `admin123`

---

## 📂 Project Structure

- `src/pages/admin`: Core admin views (Login, Dashboard, Students, Enquiries).
- `src/components/admin`: Reusable dashboard components and modals.
- `src/hooks`: Custom React Query hooks for Supabase data (`useStudents`, `useEnquiries`).
- `src/utils`: Helper functions (CSV parsing, date formatting).
- `supabase/migrations`: SQL scripts for database schema and seeding.

---

## 🎨 Design Philosophy

"Elegant Access" prioritizes **Aesthetic Usability**. We believe admin tools shouldn't be boring. By integrating "Supposina" design principles—fluid motion, high-contrast typography, and tactile interactions—we create a workspace that feels premium and engaging.

> _"Enter the sanctuary of your training empire."_
