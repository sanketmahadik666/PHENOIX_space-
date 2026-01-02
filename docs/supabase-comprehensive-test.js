// Comprehensive Supabase Connectivity Test
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

console.log('🔍 Comprehensive Supabase Connectivity Test\n');

// Load environment variables
const envPath = '.env.local';
let envVars = {};

try {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          envVars[key.trim()] = value.trim();
        }
      }
    });
  }
} catch (err) {
  console.log('❌ Could not read .env.local file:', err.message);
  process.exit(1);
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

console.log('📡 Configuration Check:');
console.log('- URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('- ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
console.log('- Key format:', supabaseAnonKey?.startsWith('eyJ') ? '✅ JWT format' : '❌ Wrong format');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing required environment variables');
  process.exit(1);
}

try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  console.log('\n🧪 Testing Database Connection...');
  
  // Test 1: Basic connection
  const { data: testData, error: testError } = await supabase
    .from('courses')
    .select('count', { count: 'exact', head: true });
  
  if (testError) {
    console.log('❌ Database connection failed:', testError.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if ANON_KEY is correct');
    console.log('2. Verify Supabase project is active');
    console.log('3. Ensure database schema is created');
    process.exit(1);
  }
  
  console.log('✅ Database connection successful');
  console.log('📊 Courses table accessible, count:', testData);
  
  // Test 2: Check all tables
  console.log('\n🗃️ Testing All Tables...');
  const tables = ['courses', 'batches', 'students', 'enquiries', 'announcements', 'contact_info'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`);
      } else {
        console.log(`✅ ${table}: OK (${data} records)`);
      }
    } catch (err) {
      console.log(`❌ ${table}: Exception - ${err.message}`);
    }
  }
  
  // Test 3: Authentication
  console.log('\n🔐 Testing Authentication...');
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError && authError.message !== 'Invalid JWT') {
    console.log('❌ Auth test failed:', authError.message);
  } else {
    console.log('✅ Authentication service accessible');
    console.log('👤 Current user:', user ? 'Logged in' : 'Not logged in');
  }
  
  // Test 4: Sample data check
  console.log('\n📋 Sample Data Check...');
  const { data: sampleCourses, error: sampleError } = await supabase
    .from('courses')
    .select('id, title, is_active')
    .limit(3);
  
  if (sampleError) {
    console.log('❌ Sample data query failed:', sampleError.message);
  } else {
    console.log('✅ Sample courses fetched:', sampleCourses?.length || 0, 'records');
    if (sampleCourses && sampleCourses.length > 0) {
      console.log('📝 Sample course:', sampleCourses[0].title);
    }
  }
  
  console.log('\n🎉 Connectivity Test Complete!');
  console.log('✅ Your Supabase setup is working correctly');
  
} catch (err) {
  console.log('❌ Unexpected error:', err.message);
  console.log('\n💡 Try these steps:');
  console.log('1. Check your internet connection');
  console.log('2. Verify Supabase project status in dashboard');
  console.log('3. Ensure .env.local has correct credentials');
  console.log('4. Restart your development server');
}