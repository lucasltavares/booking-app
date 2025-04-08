<template>
  <div class="p-6">
    <div class="breadcrumbs text-sm mb-4">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Administração</a></li>
        <li class="font-bold">Serviços</li>
      </ul>
    </div>

    <h1 class="text-3xl font-bold mb-6 text-left">Gestão de Serviços</h1>

    <div class="flex justify-between items-center mb-6">
      <p class="text-gray-600">Gerencie os serviços oferecidos no seu estabelecimento.</p>
      <button class="btn btn-primary" @click="isModalOpen = true">+ Adicionar Serviço</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(service, index) in paginatedServices"
        :key="index"
        class="card bg-base-100 shadow-xl"
      >
        <figure class="relative w-full h-48">
          <div class="skeleton w-full h-full absolute"></div>
          <img
            :src="service.image"
            alt="Imagem do serviço"
            class="w-full h-full object-cover"
            @load="loading = false"
            @error="loading = false"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ service.name }}</h2>
          <p>{{ service.description }}</p>
          <p class="text-gray-500">
            Duração: <span class="font-semibold">{{ service.duration }} min</span>
          </p>
          <p class="text-gray-500">
            Preço: <span class="font-semibold">R$ {{ service.price.toFixed(2) }}</span>
          </p>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-warning btn-sm" @click="editService(service)">Editar</button>
            <button class="btn btn-error btn-sm ml-2" @click="deleteService(index)">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div class="flex justify-center mt-6">
      <button class="btn btn-sm" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span class="mx-4">Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="btn btn-sm" @click="nextPage" :disabled="currentPage === totalPages">
        Próxima
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-opacity-50"
    >
      <div class="modal modal-open">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-4">Adicionar Novo Serviço</h3>
          <div class="form-control mb-3">
            <label class="label">Nome do Serviço</label>
            <input
              v-model="newService.name"
              type="text"
              class="input input-bordered w-1/2 ml-2"
              placeholder="Ex: Corte de Cabelo"
            />
          </div>
          <div class="form-control mb-3">
            <label class="label">Duração (minutos)</label>
            <input
              v-model.number="newService.duration"
              type="number"
              class="input input-bordered w-1/2 ml-2"
            />
          </div>
          <div class="form-control mb-4">
            <label class="label">Preço (R$)</label>
            <input
              v-model.number="newService.price"
              type="number"
              class="input input-bordered w-1/2 ml-2"
            />
          </div>
          <div class="modal-action">
            <button class="btn btn-success" @click="addService">Adicionar</button>
            <button class="btn" @click="isModalOpen = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const services = ref([
  { name: 'Corte de Cabelo', description: 'Corte de cabelo moderno', duration: 30, price: 50.0 },
  {
    name: 'Sessão de Psicologia',
    description: 'Sessão de psicologia para adultos',
    duration: 60,
    price: 150.0,
  },
  { name: 'Manicure', description: 'Manicure profissional', duration: 45, price: 40.0 },
  {
    name: 'Alongamento de Cílios',
    description: 'Alongamento de cílios naturais',
    duration: 90,
    price: 120.0,
  },
  {
    name: 'Massagem Relaxante',
    description: 'Massagem relaxante para relaxar o corpo e mente',
    duration: 60,
    price: 80.0,
  },
  {
    name: 'Design de Sobrancelhas',
    description: 'Design de sobrancelhas personalizado',
    duration: 30,
    price: 60.0,
  },
  {
    name: 'Depilação a Laser',
    description: 'Depilação a laser para remoção de pelos',
    duration: 45,
    price: 200.0,
  },
  {
    name: 'Limpeza de Pele',
    description: 'Limpeza profissional da pele',
    duration: 60,
    price: 100.0,
  },
  {
    name: 'Pedicure',
    description: 'Pedicure profissional para unhas naturais',
    duration: 50,
    price: 45.0,
  },
])

const isModalOpen = ref(false)
const newService = ref({ name: '', duration: null, price: null })

const itemsPerPage = 6
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(services.value.length / itemsPerPage))
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return services.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const addService = () => {
  if (newService.value.name && newService.value.duration && newService.value.price) {
    services.value.push({ ...newService.value })
    newService.value = { name: '', duration: null, price: null }
    isModalOpen.value = false
  }
}

const editService = (service) => {
  console.log('Editar serviço:', service)
}

const deleteService = (index) => {
  services.value.splice(index, 1)
}
</script>
