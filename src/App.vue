<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header>
    <div class="wrapper">
      <div
        v-if="
          !router.currentRoute.value.path.includes('login') &&
          !router.currentRoute.value.path.includes('register')
        "
        class="hero bg-base-200 min-h-screen"
      >
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Booking app</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <div class="flex w-full flex-col mt-10">
              <RouterLink to="/login">
                <div class="card bg-base-300 rounded-box grid h-15 place-items-center">Login</div>
              </RouterLink>
              <div class="divider">Ou</div>
              <RouterLink to="/register">
                <div class="card bg-base-300 rounded-box grid h-15 place-items-center">
                  Cadastrar
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
