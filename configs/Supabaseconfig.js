import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://shcuswjblrdzqmogxqhi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoY3Vzd2pibHJkenFtb2d4cWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MDkwMjQsImV4cCI6MjA0NjI4NTAyNH0.JYanWOU0dVUnh_Kvo81IyEk8BQrwHhppxGncr6ZlJD4';

 const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase