import { handleHMR } from '@/utils/handleHMR'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  })

  return {
    pageData,
  }
})

handleHMR(usePageStore)
