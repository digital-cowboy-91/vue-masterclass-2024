import type { QueryData } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

export const tasksQuery = supabase.from('tasks').select('*, projects(id, name, slug)')
export type TasksQuery = QueryData<typeof tasksQuery>

export const projectsQuery = supabase.from('projects').select()
export type ProjectsQuery = QueryData<typeof projectsQuery>
