import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/../supabase/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) throw new Error('Supabase URL and/or KEY undefined')

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)