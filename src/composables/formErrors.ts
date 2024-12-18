import type { AuthError } from '@supabase/supabase-js'
import { ref } from 'vue'

export const useFormErrors = () => {
  const serverError = ref<AuthError | null>(null)

  const handleServerError = (error: AuthError) => {
    serverError.value = error
  }

  return {
    serverError,
    handleServerError,
  }
}
