import { useAuthStore } from '@/stores/useAuthStore'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import { supabase } from './supabaseClient'

const store = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.log(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName + ' ' + formData.lastName,
    })

    if (error) return console.log('Profiles', error)
  }

  await store.setAuth(data.session)

  return true
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.log(error)

  await store.setAuth(data.session)

  return true
}
