<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import { storeToRefs } from 'pinia'
import AppErrorPage from './components/appError/AppErrorPage.vue'
import { useErrorStore } from './stores/error'

const { activeError } = storeToRefs(useErrorStore())
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <template #fallback> Loading... </template>
        <component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
