<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import AppError from './components/AppError.vue'
</script>

<template>
  <AuthLayout>
    <AppError />
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <template #fallback> Loading... </template>
        <component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
