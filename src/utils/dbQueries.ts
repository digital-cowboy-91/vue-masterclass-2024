import type { QueryData } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

export const tasksQuery = () =>
  supabase.from('tasks').select(
    `
        *,
        projects(
            id,
            name,
            slug
        )
    `,
  )
export type Tasks = QueryData<ReturnType<typeof tasksQuery>>

export const projectsQuery = () => supabase.from('projects').select()
export type Projects = QueryData<ReturnType<typeof projectsQuery>>

export const singleProjectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
            id,
            name,
            status,
            due_date
        )
    `,
    )
    .eq('slug', slug)
    .single()

export type SingleProject = QueryData<ReturnType<typeof singleProjectQuery>>

export const singleTaskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
      *,
      projects(
        id,
        name,
        slug
      )
    `,
    )
    .eq('id', id)
    .single()
export type SingleTask = QueryData<ReturnType<typeof singleTaskQuery>>

export const profileQuery = (id: string) => supabase.from('profiles').select().eq('id', id).single()
export type Profile = QueryData<ReturnType<typeof profileQuery>>
