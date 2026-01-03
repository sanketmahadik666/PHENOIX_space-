-- Insert default active batches for standard courses
-- AutoCAD 2D & 3D
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE + INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '35 days',
    'Eng. Ahmed',
    20,
    0,
    'upcoming'
FROM courses
WHERE name = 'AutoCAD 2D & 3D' ON CONFLICT DO NOTHING;
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE - INTERVAL '10 days',
    CURRENT_DATE + INTERVAL '20 days',
    'Eng. John',
    20,
    5,
    'active'
FROM courses
WHERE name = 'AutoCAD 2D & 3D' ON CONFLICT DO NOTHING;
-- Revit MEP
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE + INTERVAL '2 days',
    CURRENT_DATE + INTERVAL '42 days',
    'Eng. Sarah',
    15,
    0,
    'upcoming'
FROM courses
WHERE name = 'Revit MEP' ON CONFLICT DO NOTHING;
-- Microsoft Power BI
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '15 days',
    'Mr. Data',
    25,
    12,
    'active'
FROM courses
WHERE name = 'Microsoft Power BI' ON CONFLICT DO NOTHING;
-- Adobe Photoshop
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE - INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '20 days',
    'Ms. Design',
    10,
    8,
    'active'
FROM courses
WHERE name = 'Adobe Photoshop' ON CONFLICT DO NOTHING;
-- Advanced Excel
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE + INTERVAL '10 days',
    CURRENT_DATE + INTERVAL '25 days',
    'Mr. Excel',
    30,
    0,
    'upcoming'
FROM courses
WHERE name = 'Advanced Excel' ON CONFLICT DO NOTHING;
-- Python Programming
INSERT INTO batches (
        course_id,
        course_name,
        start_date,
        end_date,
        instructor,
        max_seats,
        enrolled_seats,
        status
    )
SELECT id,
    name,
    CURRENT_DATE + INTERVAL '7 days',
    CURRENT_DATE + INTERVAL '37 days',
    'Mr. Coder',
    20,
    0,
    'upcoming'
FROM courses
WHERE name = 'Python Programming' ON CONFLICT DO NOTHING;