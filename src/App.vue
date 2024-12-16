<script setup lang="ts">
import Avatar from './components/ui/avatar/Avatar.vue'
import AvatarFallback from './components/ui/avatar/AvatarFallback.vue'
import DropdownMenu from './components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuContent from './components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from './components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuLabel from './components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from './components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuTrigger from './components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import Input from './components/ui/input/Input.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex justify-between items-center px-6">
    <form class="w-full h-fit max-w-96 relative">
      <Icon
        icon="lucide:search"
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-mute-foreground"
      />
      <Input class="pl-8" type="text" placeholder="Search..." />
    </form>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <!-- <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" /> -->
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
