<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { useCollaborators } from '@/composables/useCollaborators'
import { useErrorStore } from '@/stores/useErrorStore'
import { usePageStore } from '@/stores/usePageStore'
import { type Projects, projectsQuery } from '@/utils/dbQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { ref } from 'vue'

usePageStore().pageData.title = 'Projects'

// Project data
const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery()

  if (error) useErrorStore().setError({ status, error })

  projects.value = data
}

await getProjects()

// Collab data
const { getProfiles } = useCollaborators()
const test = await getProfiles(projects.value[0].collaborators)

console.log(test)
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
