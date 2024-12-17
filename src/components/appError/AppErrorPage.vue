<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useRouter } from 'vue-router'
import Button from '../ui/button/Button.vue'

const router = useRouter()
const errorStore = useErrorStore()
const { activeError } = errorStore

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section class="error">
    <div>
      <Icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ activeError?.code }}</h1>
      <p class="error__msg">{{ activeError?.message }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive mx-auto;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
