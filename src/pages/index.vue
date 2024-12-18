<script setup lang="ts">
import { usePageStore } from '@/stores/usePageStore'

usePageStore().pageData.title = 'Homepage'
good
</script>

<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<style scoped></style>
