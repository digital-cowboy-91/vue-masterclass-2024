<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import { onErrorCaptured, onMounted } from 'vue'
import AppError from './components/errors/AppError.vue'
import { useAuthStore } from './stores/useAuthStore'
import { useErrorStore } from './stores/useErrorStore'

const errorStore = useErrorStore()
const { subscribeToAuth } = useAuthStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })

  return false
})

onMounted(() => subscribeToAuth())
</script>

<template>
  <AuthLayout>
    <AppError v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <template #fallback> Loading... </template>
        <component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
