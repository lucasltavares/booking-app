<script setup>
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  events: [
    { title: 'Agendamento 1', date: '2025-04-10' },
    { title: 'Agendamento 2', date: '2025-04-15' },
  ],
}

// Estado para controlar o loading
const isLoading = ref(true)

// Simular um delay de carregamento
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold">📅 Agenda</h1>
        <p class="text-gray-500">Gerencie seus agendamentos e horários</p>
      </div>
    </div>

    <!-- Schedules Content -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
        <div v-else>
          <!-- Conteúdo da agenda será adicionado aqui -->
          <FullCalendar :options="calendarOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
