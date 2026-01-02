# 🔥 EXACT SQL TO CREATE ADMIN USERS

## **Copy and Run This SQL in Supabase Dashboard**

Go to: https://supabase.com/dashboard → Project `nwkunxztysbmswrzqyha` → SQL Editor

Then copy and run this EXACT SQL:

```sql
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
```

## **What This Does**

✅ **Creates Admin User:**
- Name: Admin User
- Email: admin@elegant.ae  
- Role: admin
- Password: admin123 (encrypted)

✅ **Creates Super Admin:**
- Name: Super Admin
- Email: super@elegant.ae
- Role: super_admin  
- Password: super123 (encrypted)

## **Expected Result**

After running this SQL:
- ✅ No more 406 errors
- ✅ Admin login works: `admin@elegant.ae` / `admin123`
- ✅ Dashboard loads successfully
- ✅ Full admin functionality available

## **Alternative: Run Full Migration**

If you want all tables and data at once:

1. **SQL Editor** → **New Query**
2. Copy ALL content from: `supabase/migrations/001_init_schema.sql`
3. **Run** (creates everything)

**Run the admin insert SQL NOW to fix your login!**