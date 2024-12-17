import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  })

  return {
    pageData,
  }
})

import.meta.hot?.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
