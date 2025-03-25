<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const isNavbarClosed = ref(false)

const toggleNavbar = () => {
  isNavbarClosed.value = !isNavbarClosed.value
}
</script>

<template>
  <header>
    <div v-show="!isNavbarClosed" class="navbar bg-base-100 bg-primary text-white">
      <div class="flex-1">
        <p class="text-center text-sm">
          🎉 <b>Aproveite o teste grátis para os primeiros 30 dias!</b> 🎉
          <a href="#" @click="toggleNavbar" class="ml-2 bold">x</a>
        </p>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
