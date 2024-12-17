<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import type { Tables } from '../../../supabase/types'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<Tables<'tasks'>[] | null>(null)

const getTasks = async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.error(error)

  tasks.value = data
}

await getTasks()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { to: `/tasks/${row.original.id}`, class: 'font-medium' }, () =>
        row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
