<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import Button from '@/components/ui/button/Button.vue'
import Table from '@/components/ui/table/Table.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import { singleTaskQuery, type SingleTask } from '@/lib/dbQueries'
import { usePageStore } from '@/stores/page'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute('/tasks/[id]')
const singleTask = ref<SingleTask | null>(null)

watch(
  () => singleTask.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${singleTask.value?.name || ''}`
  },
  { immediate: true },
)

const getTasks = async () => {
  const { data, error } = await singleTaskQuery(route.params.id)

  if (error) console.error(error)

  singleTask.value = data
}

await getTasks()
</script>

<template>
  <Table v-if="singleTask">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ singleTask.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ singleTask.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell></TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell> {{ singleTask.projects?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ singleTask.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in singleTask.collaborators"
            :key="collaborator"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4"> Comments </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          >
          </textarea>
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button variant="ghost" @click.prevent>
                <Icon icon="lucide:paperclip"></Icon>
                <span class="sr-only">Attach file</span>
              </button>
              <button variant="ghost" @click.prevent>
                <Icon icon="lucide:image-up"></Icon>

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>
