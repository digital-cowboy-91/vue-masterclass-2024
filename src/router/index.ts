import { useAuthStore } from '@/stores/useAuthStore'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const store = useAuthStore()
  await store.currentSession()

  const isAuthOnAuthPage = ['/login', '/register'].includes(to.path)

  if (!store.user && !isAuthOnAuthPage) {
    return {
      name: '/login',
    }
  }

  if (store.user && isAuthOnAuthPage) {
    return {
      name: '/',
    }
  }
})

export default router
