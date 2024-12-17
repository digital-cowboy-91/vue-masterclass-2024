import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProjectsQuery } from '../dbQueries'

export const columns: ColumnDef<ProjectsQuery[0]>[] = [
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
