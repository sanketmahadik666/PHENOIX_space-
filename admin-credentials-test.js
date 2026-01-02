// Admin Credentials and Authentication Test
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwkunxztysbmswrzqyha.supabase.co';
const supabaseAnonKey = 'sb_publishable_dEhCiP8LN_K2nVHAPufaDw_9V0ckqKm';

console.log('🔐 Admin Authentication Test\n');

async function testAdminAuth() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Check if admin_users table exists and has data
    console.log('📊 Checking admin_users table...');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('email, name, role');
    
    if (adminError) {
      console.log('❌ Admin users table error:', adminError.message);
      console.log('💡 This means the database schema hasn\'t been created yet.');
      console.log('📋 You need to run the migration SQL in Supabase dashboard first.');
      return;
    }
    
    console.log('✅ Admin users found:', adminUsers?.length || 0);
    if (adminUsers && adminUsers.length > 0) {
      console.log('👤 Available admin accounts:');
      adminUsers.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.email} (${user.role}) - ${user.name}`);
      });
    }
    
    // Test authentication with sample credentials
    console.log('\n🧪 Testing authentication...');
    const testCredentials = [
      { email: 'admin@elegant.ae', password: 'admin123' },
      { email: 'super@elegant.ae', password: 'super123' }
    ];
    
    for (const cred of testCredentials) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cred.email,
          password: cred.password,
        });
        
        if (authError) {
          console.log(`❌ ${cred.email}: ${authError.message}`);
        } else {
          console.log(`✅ ${cred.email}: Authentication successful`);
          
          // Check if admin record exists
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('id, name, role')
            .eq('email', cred.email)
            .single();
          
          if (adminData) {
            console.log(`   👤 Admin record: ${adminData.name} (${adminData.role})`);
          }
          
          // Sign out immediately
          await supabase.auth.signOut();
        }
      } catch (err) {
        console.log(`❌ ${cred.email}: Exception - ${err.message}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testAdminAuth();