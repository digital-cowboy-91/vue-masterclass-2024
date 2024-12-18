<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import { storeToRefs } from 'pinia'
import { onErrorCaptured } from 'vue'
import AppError from './components/AppError.vue'
import { useErrorStore } from './stores/useErrorStore'

const store = useErrorStore()
const { activeError } = storeToRefs(store)

onErrorCaptured((error) => {
  console.log({ DEBUG: 'Triggered: onErrorCaptured' })

  store.setError({ error })

  return false
})
</script>

<template>
  <AuthLayout>
    <AppError v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <template #fallback> Loading... </template>
        <component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
