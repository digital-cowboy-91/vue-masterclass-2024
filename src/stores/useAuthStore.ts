import { profileQuery } from '@/utils/dbQueries'
import { handleHMR } from '@/utils/handleHMR'
import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import type { Tables } from 'supabase/types'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setProfile = async (userId: string) => {
    const { data, error } = await profileQuery(userId)

    profile.value = error ? null : data
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null

      return
    }

    user.value = userSession.user

    await setProfile(userSession.user.id)
  }

  return {
    user: computed(() => user.value),
    profile: computed(() => profile.value),
    setAuth,
  }
})

handleHMR(useAuthStore)
