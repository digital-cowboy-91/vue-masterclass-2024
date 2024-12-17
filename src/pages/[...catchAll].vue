<script setup lang="ts">
import { useErrorStore } from '@/stores/error'

useErrorStore().setError({
  code: 404,
  msg: 'Page not found',
})
</script>
