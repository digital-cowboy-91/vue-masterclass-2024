<script setup lang="ts">
import { useErrorStore } from '@/stores/useErrorStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import DevError from './DevError.vue'
import ProdError from './ProdError.vue'

const errorStore = useErrorStore()
const { resetError } = errorStore
const { activeError } = storeToRefs(errorStore)

const router = useRouter()
router.afterEach(() => resetError())
</script>

<template>
  <section class="error">
    <DevError :error-data="activeError!" />
    <ProdError :error-data="activeError!" />
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive mx-auto;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
