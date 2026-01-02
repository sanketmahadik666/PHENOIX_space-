// Supabase Connectivity Test Script
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwkunxztysbmswrzqyha.supabase.co';
const supabaseAnonKey = 'postgresql://postgres:Ela@nolen01072005@db.nwkunxztysbmswrzqyha.supabase.co:5432/postgres';

console.log('🔍 Testing Supabase connectivity...\n');

try {
  console.log('📡 URL:', supabaseUrl);
  console.log('🔑 Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Test basic connection
  console.log('\n🧪 Testing basic connection...');
  
  // Try to fetch courses
  const { data, error } = await supabase
    .from('courses')
    .select('count', { count: 'exact', head: true });
  
  if (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('\n💡 Common issues:');
    console.log('1. ANON_KEY is incorrect (you have a PostgreSQL connection string)');
    console.log('2. The ANON_KEY should be a JWT token starting with "eyJ"');
    console.log('3. Check your Supabase project is active');
  } else {
    console.log('✅ Connection successful!');
    console.log('📊 Total courses in database:', data);
  }
  
} catch (err) {
  console.log('❌ Error:', err.message);
}