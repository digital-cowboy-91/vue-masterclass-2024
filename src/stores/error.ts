import type { CustomError } from '@/types/Error'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | null>(null)

  const setError = ({ code, msg }: { code: number; msg: string }) => {
    activeError.value = Error(msg)
    activeError.value.code = code
  }

  return {
    activeError,
    setError,
  }
})
