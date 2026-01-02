-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'super_admin')),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Courses Table (Core Entity)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  batches_count INTEGER DEFAULT 0,
  created_by_admin_id UUID REFERENCES admin_users(id) ON DELETE
  SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Batches Table
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  course_name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  max_seats INTEGER NOT NULL CHECK (max_seats > 0),
  enrolled_seats INTEGER DEFAULT 0 CHECK (enrolled_seats >= 0),
  status VARCHAR(50) NOT NULL CHECK (status IN ('upcoming', 'active', 'completed')),
  created_by_admin_id UUID REFERENCES admin_users(id) ON DELETE
  SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  join_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enrollments Table (Student-Batch Junction)
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completion_status VARCHAR(50) DEFAULT 'registered' CHECK (
    completion_status IN (
      'registered',
      'in_progress',
      'completed',
      'dropped'
    )
  ),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'partial', 'complete', 'refunded')
  ),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, batch_id)
);
-- Enquiries Table (Lead/Sales Funnel)
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  interested_course VARCHAR(255) NOT NULL,
  message TEXT,
  enquiry_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'contacted', 'converted', 'closed')
  ),
  converted_student_id UUID REFERENCES students(id) ON DELETE
  SET NULL,
    assigned_admin_id UUID REFERENCES admin_users(id) ON DELETE
  SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text VARCHAR(255) NOT NULL,
  link_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_by_admin_id UUID REFERENCES admin_users(id) ON DELETE
  SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  changes JSONB,
  admin_id UUID REFERENCES admin_users(id) ON DELETE
  SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_batches_course_id ON batches(course_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_batch_id ON enrollments(batch_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON announcements(is_active);
-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
-- RLS Policies for Public Access (Read-only)
DROP POLICY IF EXISTS "Allow public read courses" ON courses;
CREATE POLICY "Allow public read courses" ON courses FOR
SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Allow public read batches" ON batches;
CREATE POLICY "Allow public read batches" ON batches FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read announcements" ON announcements;
CREATE POLICY "Allow public read announcements" ON announcements FOR
SELECT USING (is_active = true);
-- RLS Policies for Admin (Authenticated)
DROP POLICY IF EXISTS "Allow authenticated read admin_users" ON admin_users;
CREATE POLICY "Allow authenticated read admin_users" ON admin_users FOR
SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin full access courses" ON courses;
CREATE POLICY "Allow admin full access courses" ON courses FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin full access batches" ON batches;
CREATE POLICY "Allow admin full access batches" ON batches FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin full access enquiries" ON enquiries;
CREATE POLICY "Allow admin full access enquiries" ON enquiries FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin full access students" ON students;
CREATE POLICY "Allow admin full access students" ON students FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin full access announcements" ON announcements;
CREATE POLICY "Allow admin full access announcements" ON announcements FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin full access enrollments" ON enrollments;
CREATE POLICY "Allow admin full access enrollments" ON enrollments FOR ALL USING (true);
-- Trigger to update batch enrolled_seats count
CREATE OR REPLACE FUNCTION update_batch_enrolled_seats() RETURNS TRIGGER AS $$ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE batches
SET enrolled_seats = enrolled_seats + 1
WHERE id = NEW.batch_id;
ELSIF TG_OP = 'DELETE' THEN
UPDATE batches
SET enrolled_seats = enrolled_seats - 1
WHERE id = OLD.batch_id;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_update_batch_seats ON enrollments;
CREATE TRIGGER trigger_update_batch_seats
AFTER
INSERT
  OR DELETE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_batch_enrolled_seats();
-- Trigger to update course batches count
CREATE OR REPLACE FUNCTION update_course_batches_count() RETURNS TRIGGER AS $$ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE courses
SET batches_count = batches_count + 1
WHERE id = NEW.course_id;
ELSIF TG_OP = 'DELETE' THEN
UPDATE courses
SET batches_count = batches_count - 1
WHERE id = OLD.course_id;
END IF;
RETURN NULL;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_update_course_batches_count ON batches;
CREATE TRIGGER trigger_update_course_batches_count
AFTER
INSERT
  OR DELETE ON batches FOR EACH ROW EXECUTE FUNCTION update_course_batches_count();
-- Insert sample data
INSERT INTO admin_users (name, email, role, password_hash)
VALUES (
    'Admin User',
    'admin@elegant.ae',
    'admin',
    crypt('admin123', gen_salt('bf'))
  ),
  (
    'Super Admin',
    'super@elegant.ae',
    'super_admin',
    crypt('super123', gen_salt('bf'))
  ) ON CONFLICT (email) DO NOTHING;
INSERT INTO courses (
    name,
    category,
    description,
    price,
    duration,
    is_active
  )
VALUES (
    'Revit MEP',
    'BIM & CAD',
    'Master Revit MEP for mechanical, electrical, and plumbing design',
    2500,
    '40 hours',
    TRUE
  ),
  (
    'CMA Part 1',
    'Finance',
    'Certified Management Accountant preparation course',
    4500,
    '60 hours',
    TRUE
  ),
  (
    'Microsoft Power BI',
    'Data Analytics',
    'Business intelligence and data visualization',
    999,
    '20 hours',
    TRUE
  ),
  (
    'Adobe Photoshop',
    'Design',
    'Professional photo editing and design',
    1200,
    '25 hours',
    TRUE
  ),
  (
    'Advanced Excel',
    'Office Applications',
    'Advanced formulas, macros, and data analysis',
    750,
    '15 hours',
    TRUE
  ),
  (
    'AutoCAD 2D & 3D',
    'BIM & CAD',
    'Complete AutoCAD training for professionals',
    2000,
    '35 hours',
    TRUE
  ),
  (
    'Python Programming',
    'IT & Programming',
    'Learn Python from basics to advanced',
    1800,
    '30 hours',
    TRUE
  ),
  (
    'CISI UAE Regulations',
    'Finance',
    'UAE Financial Rules and Regulations certification',
    1260,
    '20 hours',
    TRUE
  ) ON CONFLICT DO NOTHING;
INSERT INTO announcements (text, link_url, is_active, display_order)
VALUES (
    'CISI-UAE Financial Rules and Regulations - 1260 AED for new batch',
    '#',
    TRUE,
    1
  ),
  (
    'CMA Course - 50% Discount on running batch',
    '#',
    TRUE,
    2
  ),
  (
    'Microsoft Power BI - Only 999 AED for Next week batch',
    '#',
    TRUE,
    3
  ),
  (
    'Advanced MS Office - 750 AED only - Special offer',
    '#',
    TRUE,
    4
  ) ON CONFLICT DO NOTHING;
INSERT INTO students (name, email, phone, join_date)
VALUES (
    'Abdullah Khan',
    'abdullah@email.com',
    '+971-50-111-2222',
    '2023-09-15'
  ),
  (
    'Priya Sharma',
    'priya@email.com',
    '+971-55-222-3333',
    '2023-10-20'
  ),
  (
    'Omar Youssef',
    'omar@email.com',
    '+971-50-333-4444',
    '2023-11-05'
  ) ON CONFLICT (email) DO NOTHING;
INSERT INTO enquiries (
    name,
    email,
    phone,
    interested_course,
    message,
    status
  )
VALUES (
    'John Doe',
    'john@email.com',
    '+971-50-123-4567',
    'AutoCAD',
    'Interested in weekend batch',
    'pending'
  ),
  (
    'Sarah Khan',
    'sarah@email.com',
    '+971-55-234-5678',
    'Python',
    'Need corporate training for team',
    'contacted'
  ),
  (
    'Ahmed Ali',
    'ahmed@email.com',
    '+971-50-345-6789',
    'BIM Fundamentals',
    'When is the next batch?',
    'pending'
  ),
  (
    'Lisa Wong',
    'lisa@email.com',
    '+971-55-456-7890',
    'Power BI',
    'Can I get course syllabus?',
    'converted'
  ),
  (
    'Mohammed Hassan',
    'moh@email.com',
    '+971-50-567-8901',
    'CMA',
    'Looking for online classes',
    'pending'
  ),
  (
    'Emma Wilson',
    'emma@email.com',
    '+971-55-678-9012',
    'Photoshop',
    'Any discounts available?',
    'contacted'
  ),
  (
    'Ali Raza',
    'ali@email.com',
    '+971-50-789-0123',
    'Revit MEP',
    'Need placement assistance',
    'pending'
  ),
  (
    'Fatima Zahra',
    'fatima@email.com',
    '+971-55-890-1234',
    'Excel Advanced',
    'Corporate enquiry for 10 people',
    'converted'
  ),
  (
    'James Brown',
    'james@email.com',
    '+971-50-901-2345',
    'Python',
    'Beginner friendly?',
    'closed'
  ),
  (
    'Noor Ahmed',
    'noor@email.com',
    '+971-55-012-3456',
    'CISI',
    'Need exam preparation tips',
    'pending'
  ) ON CONFLICT DO NOTHING;