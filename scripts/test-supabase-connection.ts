import { createClient } from '@supabase/supabase-js'

const url = 'https://otuybbxfzjeuxppfihvv.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY'

async function test() {
  console.log('Testing Supabase connection...')
  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
        // Si la table n'existe pas ou RLS bloque, on aura une erreur mais la connexion aura réussi (404 ou 401/403)
        // Failed to fetch (connexion impossible) est différent d'une erreur SQL/Auth
      console.log('Connection established but query error:', error.message)
    } else {
      console.log('Connection successful!')
    }
  } catch (e) {
    console.error('Connection failed:', e)
  }
}

test()

