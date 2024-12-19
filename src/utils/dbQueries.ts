import type { QueryData } from '@supabase/supabase-js'
import type { Tables } from 'supabase/types'
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

type ProfileKey = keyof Tables<'profiles'>
type ProfileArgs<T extends ProfileKey> = [key: T, val: NonNullable<Tables<'profiles'>[T]>]

export const profileQuery = <T extends ProfileKey>(...[key, val]: ProfileArgs<T>) =>
  supabase.from('profiles').select().eq(key, val).single()

export type Profile = QueryData<ReturnType<typeof profileQuery>>

export const collaboratorsQuery = async (userIds: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type Collaborators = QueryData<ReturnType<typeof collaboratorsQuery>>
