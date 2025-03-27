<script setup>
import SidebarMenu from '../components/SidebarMenu.vue'
</script>

<template>
  <div class="flex">
    <SidebarMenu />
    <div class="flex-1 p-4">
      <router-view />
    </div>
  </div>
</template>
