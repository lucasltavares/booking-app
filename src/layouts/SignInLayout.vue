<script setup>
import SidebarMenu from '../components/SidebarMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <SidebarMenu />
    <div class="lg:pl-64">
      <div class="navbar bg-base-100 shadow-lg">
        <div class="flex-1">
          <div class="text-sm breadcrumbs">
            <ul>
              <li><a href="/dashboard">Home</a></li>
              <li class="text-gray-500">Dashboard</li>
            </ul>
          </div>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <main class="p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
