<script setup lang="ts">
import { Icon } from '@iconify/vue'

type Link = {
  title: string
  icon: string
} & (
  | {
      to: string
    }
  | {
      onClick: () => void
    }
)

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <template v-for="{ title, icon, to, onClick } in links as any[]" :key="title">
    <RouterLink v-if="to" :to="to" class="nav_link" exact-active-class="text-primary bg-muted">
      <Icon :icon="icon"></Icon>
      <span class="hidden lg:block text-nowrap">{{ title }}</span>
    </RouterLink>
    <div v-else class="nav_link cursor-pointer" @click="onClick">
      <Icon :icon="icon"></Icon>
      <span class="hidden lg:block text-nowrap">{{ title }}</span>
    </div>
  </template>
</template>

<style scoped>
.nav_link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
