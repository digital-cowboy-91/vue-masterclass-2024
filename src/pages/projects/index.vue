<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import type { Tables } from '../../../supabase/types'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[] | null>(null)

const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.error(error)

  projects.value = data
}

await getProjects()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: '' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/projects/${row.original.slug}`, class: 'font-medium hover:bg-muted block w-full' },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: '' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: '' }, 'Collaborators'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
