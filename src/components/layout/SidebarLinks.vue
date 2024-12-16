<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Link {
  title: string
  to: string
  icon: string
}

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <RouterLink
    v-for="{ title, to, icon } in links"
    :key="title"
    :to="to"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    exact-active-class="text-primary bg-muted"
  >
    <Icon :icon="icon"></Icon>
    <span class="hidden lg:block text-nowrap">{{ title }}</span>
  </RouterLink>
</template>
