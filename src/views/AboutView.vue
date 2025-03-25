<script setup>
import { ref, reactive } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = () => {
  console.log(form.value)
}
</script>
<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col">
      <div class="text-center">
        <h1 class="text-5xl font-bold">Cadastre-se</h1>
        <p class="py-6">Crie uma conta e comece a reservar seus espaços favoritos.</p>
      </div>
      <div class="flex w-full flex-col gap-4">
        <label class="input w-full">
          <input v-model="form.name" type="text" class="grow" placeholder="Nome" required />
        </label>
        <label class="input w-full">
          <input v-model="form.email" type="email" class="grow" placeholder="Email" required />
        </label>
        <label class="input w-full">
          <input
            v-model="form.password"
            type="password"
            class="grow"
            placeholder="Senha"
            required
          />
        </label>
        <label class="input w-full">
          <input
            v-model="form.repeatPassword"
            type="password"
            class="grow"
            placeholder="Repita a senha"
            required
          />
        </label>
        <button class="btn w-full bg-primary text-white">Cadastrar</button>
        <button @click="$router.go(-1)" class="btn btn-ghost w-full">Voltar</button>
      </div>
    </div>
  </div>
</template>

<style></style>
