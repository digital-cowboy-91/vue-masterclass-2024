import type { CastError, CustomError } from '@/types/Error'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | null>(null)

  const setError = ({ status = 500, error }: CastError) => {
    let instance: Partial<CustomError>

    if (typeof error === 'string') {
      instance = Error(error)
      instance.name = 'Custom Error'
    } else {
      instance = error
    }

    instance.status = status

    activeError.value = instance as CustomError
  }

  const resetError = () => (activeError.value = null)

  return {
    activeError: computed(() => activeError.value),
    setError,
    resetError,
  }
})
