import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gupzelmymdlzjqekggnd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cHplbG15bWRsempxZWtnZ25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MjMzMzksImV4cCI6MjA0MDQ5OTMzOX0.x12Z5JZAAU6fDOa0BJhiPpFzdHE6YKT-L64-yNp1QAU'

export const supabase = createClient(supabaseUrl, supabaseKey)