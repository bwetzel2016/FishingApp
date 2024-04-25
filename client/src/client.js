import { createClient } from '@supabase/supabase-js'
const URL = 'https://ncuoizmzlpcqpvmjoigj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdW9pem16bHBjcXB2bWpvaWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDcxNzcsImV4cCI6MjAyODUyMzE3N30.nr3PFUS2hdJhpEOIHHYUqMXiCDIXkpemWy2HGoSs2sk';

export const supabase = createClient(URL, API_KEY);
