import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://glgcdroqzklykixbyryw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZ2Nkcm9xemtseWtpeGJ5cnl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzcyODA3MCwiZXhwIjoyMDUzMzA0MDcwfQ.gpcq-vLC_gRUcQubF9YLlfG6d_wPnj5kXrK0MxGAs5Q'

export const supabase = createClient(supabaseUrl, supabaseKey)