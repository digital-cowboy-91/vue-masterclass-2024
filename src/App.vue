<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import { onErrorCaptured } from 'vue'
import AppError from './components/AppError.vue'
import { useErrorStore } from './stores/useErrorStore'

const store = useErrorStore()

onErrorCaptured((error) => {
  store.setError({ error })

  return false
})
</script>

<template>
  <AuthLayout>
    <AppError v-if="store.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <template #fallback> Loading... </template>
        <component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
