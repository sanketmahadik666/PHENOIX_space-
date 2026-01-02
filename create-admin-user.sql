-- Create admin user record to match Supabase Auth user
INSERT INTO admin_users (id, name, email, role, password_hash, created_at, updated_at) 
VALUES (
  '3d74b3e8-75dc-42ab-804e-0c960aba2b9c',  -- Match Supabase Auth user ID
  'Admin User',
  'admin@elegant.ae',
  'admin',
  'demo_password_hash',  -- Note: Password is handled by Supabase Auth
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();