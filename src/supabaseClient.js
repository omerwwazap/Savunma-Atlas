import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    timeout: 30000,
    params: {
      eventsPerSecond: 2
    }
  },
  headers: {
    'X-Client-Info': 'military-projects-hub'
  },
  global: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
})

// Implement rate limiting
let requestCount = 0
const requestLimit = 100
const timeWindow = 60000 // 1 minute

setInterval(() => {
  requestCount = 0
}, timeWindow)

export const rateLimit = () => {
  if (requestCount >= requestLimit) {
    throw new Error('Too many requests. Please try again later.')
  }
  requestCount++
}