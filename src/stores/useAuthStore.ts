import { getSession } from '@/utils/dbAuth'
import { profileQuery } from '@/utils/dbQueries'
import { supabase } from '@/utils/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import type { Tables } from 'supabase/types'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTracking = ref(false)

  const setProfile = async (userId: string) => {
    const { data, error } = await profileQuery('id', userId)

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

  const currentSession = async () => {
    const session = await getSession()
    await setAuth(session ? session : null)
  }

  const subscribeToAuth = async () => {
    if (isTracking.value) return

    supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })

    isTracking.value = true
  }

  return {
    user: computed(() => user.value),
    profile: computed(() => profile.value),
    setAuth,
    currentSession,
    subscribeToAuth,
  }
})
