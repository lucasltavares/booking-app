<script setup>
import { ref } from "vue";
// Lista de agendamentos (exemplo)
const agendamentos = ref([
  { id: 1, data: "25/03/2025", cliente: "João Silva", horario: "10:00", servico: "Consulta Médica", status: "Confirmado" },
  { id: 2, data: "26/03/2025", cliente: "Ana Souza", horario: "14:30", servico: "Corte de Cabelo", status: "Pendente" },
  { id: 3, data: "27/03/2025", cliente: "Carlos Lima", horario: "09:00", servico: "Sessão de Fisioterapia", status: "Cancelado" },
]);

// Definir cor do status
const statusClass = (status) => {
  return status === "Confirmado"
    ? "badge-success"
    : status === "Pendente"
    ? "badge-warning"
    : "badge-error";
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-base-200 p-4">
      <h1 class="text-xl font-bold mb-4">Meu Dashboard</h1>
      <div class="collapse collapse-arrow">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title font-semibold">Usuários</div>
  <div class="collapse-content text-sm gap-4 flex flex-col">
    <a href="google.com">Listar usuários</a>
    <a href="google.com">Cadastrar usuários</a>
    <a href="google.com">Editar usuários</a>
  </div>

</div>
<div class="collapse collapse-arrow">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title font-semibold">Financeiro</div>
  <div class="collapse-content text-sm gap-4 flex flex-col">
    <a href="google.com">Listar financeiro</a>
    <a href="google.com">Cadastrar financeiro</a>
    <a href="google.com">Editar financeiro</a>
  </div>
</div>
<div class="collapse collapse-arrow">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title font-semibold">Agendamentos</div>
  <div class="collapse-content text-sm gap-4 flex flex-col">
    <a href="google.com">Listar agendamentos</a>
    <a href="google.com">Cadastrar agendamentos</a>
    <a href="google.com">Editar agendamentos</a>
  </div>
</div>
    </aside>

    <!-- Conteúdo -->
    <main class="flex-1 p-6">
      <!-- Breadcrumb -->
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Dashboard</a></li>
          <li class="text-gray-500">Visão Geral</li>
        </ul>
      </div>

      <h2 class="text-2xl font-semibold mt-4">Bem-vindo ao Dashboard</h2>
      <p class="mt-2">Aqui está um resumo dos dados.</p>

      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="card bg-primary text-primary-content shadow-lg p-4">
          <div class="card-body">
            <h2 class="card-title">Usuários</h2>
            <p class="text-3xl font-bold">1,234</p>
          </div>
        </div>

        <div class="card bg-secondary text-primary-content shadow-lg p-4">
          <div class="card-body">
            <h2 class="card-title">Vendas</h2>
            <p class="text-3xl font-bold">R$ 45,678</p>
          </div>
        </div>

        <div class="card bg-accent text-primary-content shadow-lg p-4">
          <div class="card-body">
            <h2 class="card-title">Pedidos</h2>
            <p class="text-3xl font-bold">789</p>
          </div>
        </div>
      </div>

  <!-- proximos agendamentos-->
  <div class="mt-6 p-6 bg-base-100 shadow-lg rounded-lg">
    <div class="flex justify-between mb-6">
    <h3 class="text-xl font-semibold">📅 Próximos Agendamentos</h3>
      <div class="flex justify-end">
      <button class="btn btn-primary" @click="verTodosAgendamentos">Ver Todos</button>
    </div>
    </div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>📌 Data</th>
            <th>👤 Cliente</th>
            <th>🕒 Horário</th>
            <th>💼 Serviço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agendamento in agendamentos" :key="agendamento.id">
            <td>{{ agendamento.data }}</td>
            <td>{{ agendamento.cliente }}</td>
            <td>{{ agendamento.horario }}</td>
            <td>{{ agendamento.servico }}</td>
            <td>
              <span :class="statusClass(agendamento.status)" class="badge text-white">
                {{ agendamento.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- atalhos -->
   <div class="mt-6 p-6 bg-base-100 shadow-lg rounded-lg">
    <h3 class="text-xl font-semibold mb-6">🚀 Ações Rápidas</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Card Criar Serviço -->
      <div class="card w-full bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <i class="fa fa-plus-circle text-4xl text-primary mb-4"></i>
          <h4 class="text-lg font-semibold">Criar Serviço</h4>
          <p class="text-sm mb-4">Adicione novos serviços ao seu sistema de agendamento para expandir suas opções.</p>
          <button class="btn btn-primary w-full" @click="criarServico">Criar Serviço</button>
        </div>
      </div>

      <!-- Card Adicionar Profissional -->
      <div class="card w-full bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <i class="fa fa-user-plus text-4xl text-secondary mb-4"></i>
          <h4 class="text-lg font-semibold">Adicionar Profissional</h4>
          <p class="text-sm mb-4">Inclua novos profissionais para seu sistema e comece a alocar agendamentos para eles.</p>
          <button class="btn btn-primary w-full" @click="adicionarProfissional">Adicionar Profissional</button>
        </div>
      </div>

      <!-- Card Configurar Lista de Espera -->
      <div class="card w-full bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <i class="fa fa-list text-4xl text-accent mb-4"></i>
          <h4 class="text-lg font-semibold">Configurar Lista de Espera</h4>
          <p class="text-sm mb-4">Configure a lista de espera para agendamentos e gerencie os clientes aguardando vaga.</p>
          <button class="btn btn-primary w-full" @click="configurarListaEspera">Configurar Lista</button>
        </div>
      </div>

      <!-- Card Ver Relatórios -->
      <div class="card w-full bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <i class="fa fa-chart-bar text-4xl text-info mb-4"></i>
          <h4 class="text-lg font-semibold">Ver Relatórios</h4>
          <p class="text-sm mb-4">Acesse os relatórios detalhados sobre o desempenho dos seus agendamentos.</p>
          <button class="btn btn-primary w-full" @click="verRelatorios">Ver Relatórios</button>
        </div>
      </div>
    </div>
  </div>
    </main>
  </div>
</template>

<style scoped></style>