<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { useErrorStore } from '@/stores/useErrorStore'
import { usePageStore } from '@/stores/usePageStore'
import { type Projects, projectsQuery } from '@/utils/dbQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { ref } from 'vue'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery()

  if (error) useErrorStore().setError({ status, error })

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
