<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { tasksQuery, type Tasks } from '@/lib/dbQueries'
import { columns } from '@/lib/tableColumns/tasksColumns'
import { usePageStore } from '@/stores/page'
import { ref } from 'vue'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<Tasks | null>(null)

const getTasks = async () => {
  const { data, error } = await tasksQuery()

  if (error) console.error(error)

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
