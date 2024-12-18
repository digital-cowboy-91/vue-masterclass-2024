import type { PostgrestError } from '@supabase/supabase-js'

type ErrorInstance = Error | PostgrestError

export type CastError = {
  status?: number
  error: string | ErrorInstance
}

export type CustomError = {
  status: number
  message: string
} & ErrorInstance
