
-- Create admin and student users in the database

-- Create auth_users table if not exists
CREATE TABLE IF NOT EXISTS public.auth_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  user_type TEXT NOT NULL,
  identifier TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert admin user
INSERT INTO public.auth_users (email, password, user_type, identifier)
VALUES ('admin@masari.edu', '123456', 'admin', '0011')
ON CONFLICT (identifier) DO NOTHING;

-- Insert student user
INSERT INTO public.auth_users (email, password, user_type, identifier)
VALUES ('student@masari.edu', '123456', 'student', '2136836')
ON CONFLICT (identifier) DO NOTHING;

-- Create the admin account if not exists
INSERT INTO public.instructors (id, name, department)
SELECT gen_random_uuid(), 'Ahmed', 'Administration'
WHERE NOT EXISTS (
  SELECT 1 FROM public.instructors WHERE name = 'Ahmed'
);

-- Create the student account if not exists
INSERT INTO public.students (id, name, level, student_id, major)
SELECT gen_random_uuid(), 'Osama Hamed', 1, '2136836', 'Computer Science'
WHERE NOT EXISTS (
  SELECT 1 FROM public.students WHERE student_id = '2136836'
);

-- Update the instructors table to link to auth_users
UPDATE public.instructors
SET user_id = (SELECT id FROM public.auth_users WHERE identifier = '0011')
WHERE name = 'Ahmed' AND (user_id IS NULL OR user_id = (SELECT id FROM public.auth_users WHERE identifier = '0011'));

-- Update the students table to link to auth_users
UPDATE public.students
SET user_id = (SELECT id FROM public.auth_users WHERE identifier = '2136836')
WHERE student_id = '2136836' AND (user_id IS NULL OR user_id = (SELECT id FROM public.auth_users WHERE identifier = '2136836'));
