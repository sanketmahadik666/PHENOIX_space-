# 🔧 Supabase 406 Error - Database Schema Missing

## ❌ **Error Analysis**

You're getting this error:
```
GET https://nwkunxztysbmswrzqyha.supabase.co/rest/v1/admin_users?select=id%2Cname%2Cemail%2Crole&email=eq.admin%40elegant.ae 406 (Not Acceptable)
```

**Root Cause:** The `admin_users` table doesn't exist in your Supabase database yet.

## ✅ **Solution: Create Database Schema**

### Step 1: Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select project: `nwkunxztysbmswrzqyha`
3. Click **SQL Editor** in left sidebar

### Step 2: Execute Migration SQL
1. Click **New Query**
2. Copy the entire content from: `supabase/migrations/001_init_schema.sql`
3. Paste into the SQL editor
4. Click **Run** (or press Cmd+Enter)

### Step 3: Wait for Success
You should see success messages like:
- ✅ Table `admin_users` created
- ✅ Table `courses` created
- ✅ Table `batches` created
- ✅ Row Level Security enabled
- ✅ Sample data inserted

## 🎯 **What This Fixes**

After running the migration, your admin login will work because:

1. **Creates Tables:**
   - `admin_users` - Admin user records
   - `courses` - Course management
   - `batches` - Batch scheduling
   - `students` - Student records
   - `enquiries` - Contact form submissions
   - `announcements` - Promotional content

2. **Inserts Sample Data:**
   - Admin users (admin@elegant.ae / admin123)
   - 8 sample courses
   - 4 announcements
   - Sample enquiries and students

3. **Sets Up Security:**
   - Row Level Security (RLS)
   - Public read access for courses/announcements
   - Admin write access for all operations

## 🧪 **Test After Migration**

1. **Refresh your browser** (or restart dev server)
2. **Try admin login again:**
   - Email: `admin@elegant.ae`
   - Password: `admin123`
3. **Should redirect to:** `/admin/dashboard`

## 📋 **Alternative: Quick Test**

While you're in Supabase dashboard, you can also:

1. Go to **Table Editor**
2. Check if `admin_users` table exists
3. Look for the sample admin user records

## 🚀 **Next Steps After Migration**

Once the schema is created:
- ✅ Admin login will work completely
- ✅ Dashboard will show real data
- ✅ Course management will be functional
- ✅ Contact forms will save to database
- ✅ Announcements will display from database

**The 406 error is completely expected and will be resolved by creating the database schema.**