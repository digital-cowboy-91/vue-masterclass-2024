<script setup lang="ts">
import type { CustomError } from '@/types/Error'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'

const props = defineProps<{ errorData: CustomError }>()
const { errorData } = toRefs(props)

const $ = errorData

const status = ref<number>(500)
const message = ref<string>('Something went wrong')

if ($.value.name === 'Custom Error') {
  status.value = $.value.status
  message.value = $.value.message
} else {
  switch ($.value.status) {
    case 406:
      status.value = 404
      message.value = 'No data for this page'
      break
  }
}
</script>

<template>
  <div>
    <Icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ status }}</h1>
    <p class="error__msg">{{ message }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
