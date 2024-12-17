<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { type ProjectsQuery, projectsQuery } from '@/lib/dbQueries'
import { columns } from '@/lib/tableColumns/tasksColumns'
import { usePageStore } from '@/stores/page'
import { ref } from 'vue'

usePageStore().pageData.title = 'Projects'

const projects = ref<ProjectsQuery | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.error(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
