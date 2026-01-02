# 🚨 URGENT: Fix Admin Login - Run This SQL

## ❌ **Current Error (Still Happening)**
```
GET https://nwkunxztysbmswrzqyha.supabase.co/rest/v1/admin_users?select=id%2Cname%2Cemail%2Crole&email=eq.admin%40elegant.ae 406 (Not Acceptable)
```

## ✅ **SOLUTION: Create Admin User Record**

**You must run this SQL in your Supabase dashboard RIGHT NOW:**

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard
2. Select project: `nwkunxztysbmswrzqyha`
3. Click **SQL Editor** (left sidebar)

### Step 2: Run This SQL Command
Copy and paste this EXACT SQL:

```sql
INSERT INTO admin_users (id, name, email, role, password_hash, created_at, updated_at) 
VALUES (
  '3d74b3e8-75dc-42ab-804e-0c960aba2b9c',
  'Admin User',
  'admin@elegant.ae',
  'admin',
  'demo_password_hash',
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();
```

### Step 3: Click "Run"
- Press **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows)
- You should see: `INSERT 1` or `UPDATE 1`

### Step 4: Verify It Worked
After running the SQL, test your admin login again:
- Go to: `http://localhost:5000/admin/login`
- Email: `admin@elegant.ae`
- Password: `admin123`

## 🎯 **What This Does**

This creates the missing admin user record that connects:
- ✅ **Supabase Auth user:** `admin@elegant.ae` (already exists)
- ✅ **Admin user record:** Links to the same email with admin role
- ✅ **Fixes 406 error:** Admin login will work immediately

## ⚡ **Alternative: Full Migration**

If you want everything at once, run the complete migration:

1. **SQL Editor** → **New Query**
2. Copy ALL content from: `supabase/migrations/001_init_schema.sql`
3. **Run** (creates all tables + sample data + admin users)

## 🚀 **Expected Result**

After running the SQL:
- ✅ No more 406 errors
- ✅ Admin login works
- ✅ Dashboard loads successfully
- ✅ Full admin functionality

**RUN THE SQL NOW TO FIX THE LOGIN!**