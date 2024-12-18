<script setup lang="ts">
import { useErrorStore } from '@/stores/useErrorStore'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Button from './ui/button/Button.vue'

const errorStore = useErrorStore()
const { resetError } = errorStore
const { activeError } = storeToRefs(errorStore)
const $: any = activeError ?? {}

const router = useRouter()
router.afterEach(() => resetError())
</script>

<template>
  <section v-if="$" class="error">
    <div>
      <Icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ $.code ? `${$.status} / ${$.code}` : $.status }}</h1>
      <p class="error__msg">{{ $.message }}</p>
      <p v-if="$.hint">{{ $.hint }}</p>
      <p v-if="$.details">{{ $.details }}</p>
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
