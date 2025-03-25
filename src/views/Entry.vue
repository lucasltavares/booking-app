<script setup></script>

<template>
  <div class="wrapper">
    <div class="hero bg-base-200 min-h-[80vh]">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <img src="/images/logo.png" alt="Logo" />
          <p class="py-4">
            Sistema de agendamento fácil, rápido e eficiente para o
            <b class="text-primary">seu negócio.</b>
          </p>
          <div class="flex w-full flex-col mt-10">
            <RouterLink to="/login">
              <div
                class="card bg-primary text-white bg-base-300 rounded-box grid h-15 place-items-center"
              >
                Login
              </div>
            </RouterLink>
            <div class="divider">Ou</div>
            <RouterLink to="/register">
              <div class="card bg-base-300 rounded-box grid h-15 place-items-center">Cadastrar</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
