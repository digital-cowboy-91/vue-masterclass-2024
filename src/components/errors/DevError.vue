<script setup lang="ts">
import type { CustomError } from '@/types/Error'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { toRefs } from 'vue'
import Button from '../ui/button/Button.vue'

const props = defineProps<{ errorData: CustomError }>()
const { errorData } = toRefs(props)

const $: any = errorData
</script>

<template>
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
</template>

<style scoped></style>
