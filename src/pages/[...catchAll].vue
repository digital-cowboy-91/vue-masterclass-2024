<script setup lang="ts">
import { useErrorStore } from '@/stores/useErrorStore'

useErrorStore().setError({
  status: 404,
  error: 'Page not found',
})
</script>
