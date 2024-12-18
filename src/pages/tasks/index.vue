<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { useErrorStore } from '@/stores/useErrorStore'
import { usePageStore } from '@/stores/usePageStore'
import { tasksQuery, type Tasks } from '@/utils/dbQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import { ref } from 'vue'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<Tasks | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksQuery()

  if (error) useErrorStore().setError({ status, error })

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
