<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { type Projects, projectsQuery } from '@/lib/dbQueries'
import { columns } from '@/lib/tableColumns/projectsColumns'
import { usePageStore } from '@/stores/page'
import { ref } from 'vue'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery()

  if (error) console.error(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
