<script setup lang="ts">
import { useErrorStore } from '@/stores/useErrorStore'
import { usePageStore } from '@/stores/usePageStore'

usePageStore().pageData.title = 'Homepage'
useErrorStore().setError({ error: Error('having troubles') })
</script>

<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<style scoped></style>
